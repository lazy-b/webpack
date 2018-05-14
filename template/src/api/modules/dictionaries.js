/*
* @Author: lazy1993
* @Date:   2017-12-26 19:46:26
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-04-20 15:05:18
*/

import fetch from '../fetch';
import { DICTIONARY_KEY_LIST, DICTIONARY_KEY_UPDATE, DICTIONARY_VALUE_LIST, DICTIONARY_VALUE_UPDATE } from '../url/url';

/**
 * 查询列表
 * @param  {Object} data 请求参数对象{pageIndex, pageSize, ...}
 * @return {Promise}       返回请求的Promise
 */
function getKeyList(data) {
  return fetch({
    url: DICTIONARY_KEY_LIST,
    method: 'get',
    params: data
  });
}

/**
 * 更新key
 * @param  {Object} data 请求参数对象{pageIndex, pageSize, ...}
 * @return {Promise}       返回请求的Promise
 */
function updateKey(data) {
  return fetch({
    url: DICTIONARY_KEY_UPDATE,
    method: 'post',
    data: data
  });
}

/**
 * 查询列表
 * @param  {Object} data 请求参数对象{pageIndex, pageSize, ...}
 * @return {Promise}       返回请求的Promise
 */
function getValueList(item, data) {
  return fetch({
    url: DICTIONARY_VALUE_LIST + item,
    method: 'get',
    params: data
  });
}

/**
 * 更新value
 * @param  {Object} data 请求参数对象{pageIndex, pageSize, ...}
 * @return {Promise}       返回请求的Promise
 */
function updateValue(data) {
  return fetch({
    url: DICTIONARY_VALUE_UPDATE,
    method: 'post',
    data: data
  });
}

const dictionaries = {
  getKeyList: getKeyList,
  updateKey: updateKey,
  getValueList: getValueList,
  updateValue: updateValue
};

export { dictionaries };
