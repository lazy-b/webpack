/* 基础管理
 * @Author: LuoJW
 * @Date: 2018-03-26 14:19:42
 * @Last Modified by: LuoJW
 * @Last Modified time: 2018-04-20 02:34:20
 */
import {
  BASIC_HOME
} from '../url/url';
import fetch from '../fetch';

/**
 * 首页展示
 * @return {Promise}      返回请求的Promise
 */
function getHomeData() {
  return fetch({
    url: BASIC_HOME,
    method: 'get'
  });
}

const basic = {
  getHomeData
};

export { basic };
