/* 公共接口
 * @Author: LuoJW
 * @Date: 2018-03-26 14:19:42
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-04-20 13:39:45
 */
import {
  CHANNEL_LIST,
  AGENT_LIST,
  REGION_LIST,
  PROVINCE_LIST,
  CITY_LIST,
  COUNTY_LIST,
  AREA_LIST,
  AREA_DETAIL_LIST
} from '../url/url';
import fetch from '../fetch';

/**
 * 渠道列表
 * @return {Promise}      返回请求的Promise
 */
function getChannelTypeList() {
  let data = sessionStorage.getItem(CHANNEL_LIST);
  if (data) return Promise.resolve(JSON.parse(data));
  return fetch({
    url: CHANNEL_LIST,
    method: 'get'
  }).then((res) => {
    if (res.data.code === 0) {
      window.sessionStorage.setItem(CHANNEL_LIST, JSON.stringify(res));
    }
    return res;
  });
}

/**
 * 代理商列表
 * @return {Promise}      返回请求的Promise
 */
function getAgentList(params) {
  let id = params ? params.parentId : 0;
  let data = sessionStorage.getItem(AGENT_LIST + '/' + id);
  if (data) return Promise.resolve(JSON.parse(data));
  return fetch({
    url: AGENT_LIST,
    method: 'get',
    params: params
  }).then((res) => {
    if (res.data.code === 0) {
      window.sessionStorage.setItem(AGENT_LIST + '/' + id, JSON.stringify(res));
      return res;
    }
  });
}

/**
 * 大区列表
 * @return {Promise}      返回请求的Promise
 */
function getRegionList() {
  let data = sessionStorage.getItem(REGION_LIST);
  if (data) return Promise.resolve(JSON.parse(data));
  return fetch({
    url: REGION_LIST,
    method: 'get'
  }).then((res) => {
    if (res.data.code === 0) {
      window.sessionStorage.setItem(REGION_LIST, JSON.stringify(res));
      return res;
    }
  });
}

/**
 * 省列表
 * @return {Promise}      返回请求的Promise
 */
function getProvinceList() {
  let data = sessionStorage.getItem(PROVINCE_LIST);
  if (data) return Promise.resolve(JSON.parse(data));
  return fetch({
    url: PROVINCE_LIST,
    method: 'get'
  }).then((res) => {
    if (res.data.code === 0) {
      window.sessionStorage.setItem(PROVINCE_LIST, JSON.stringify(res));
      return res;
    }
  });
}

/**
 * 市列表
 * @return {Promise}      返回请求的Promise
 */
function getCityList(data) {
  let sessionData = sessionStorage.getItem(CITY_LIST + data);
  if (sessionData) return Promise.resolve(JSON.parse(sessionData));
  return fetch({
    url: CITY_LIST + data,
    method: 'get'
  }).then((res) => {
    if (res.data.code === 0) {
      window.sessionStorage.setItem(CITY_LIST + data, JSON.stringify(res));
      return res;
    }
  });
}

/**
 * 区列表
 * @return {Promise}      返回请求的Promise
 */
function getCountyList(data) {
  let sessionData = sessionStorage.getItem(COUNTY_LIST + data);
  if (sessionData) return Promise.resolve(JSON.parse(sessionData));
  return fetch({
    url: COUNTY_LIST + data,
    method: 'get'
  }).then((res) => {
    if (res.data.code === 0) {
      window.sessionStorage.setItem(COUNTY_LIST + data, JSON.stringify(res));
      return res;
    }
  });
}

/**
 * 获取根据类型地区列表
 * @return {Promise}      返回请求的Promise
 */
function getAreaList(data) {
  let sessionData = sessionStorage.getItem(AREA_LIST + '?areaType=' + data);
  if (sessionData) return Promise.resolve(JSON.parse(sessionData));
  return fetch({
    url: AREA_LIST + '?areaType=' + data,
    method: 'get'
  })
    .then((res) => {
      if (res.data.code === 0) {
        window.sessionStorage.setItem(AREA_LIST + '?areaType=' + data, JSON.stringify(res));
        return res;
      }
    });
}

/**
 * 获取子级地区列表
 * @return {Promise}      返回请求的Promise
 */
function getAreaDetailList(data) {
  let sessionData = sessionStorage.getItem(AREA_DETAIL_LIST + data);
  if (sessionData) return Promise.resolve(JSON.parse(sessionData));
  return fetch({
    url: AREA_DETAIL_LIST + data,
    method: 'get'
  }).then((res) => {
    if (res.data.code === 0) {
      window.sessionStorage.setItem(AREA_DETAIL_LIST + data, JSON.stringify(res));
      return res;
    }
  });
}

const common = {
  getChannelTypeList,
  getAgentList,
  getRegionList,
  getProvinceList,
  getCityList,
  getCountyList,
  getAreaList,
  getAreaDetailList
};

export { common };
