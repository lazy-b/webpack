/* 会员管理
 * @Author: LuoJW
 * @Date: 2018-03-26 14:19:42
 * @Last Modified by: LuoJW
 * @Last Modified time: 2018-04-09 20:19:49
 */
import {
  VIP_MEMBER_LIST,
  VIP_MEMBER_EXPORT,
  VIP_MEMBER_ADDRESS_LIST,
  VIP_MEMBER_TOTAL,
  VIP_MEMBER_SCAN_LIST,
  VIP_MEMBER_LEVEL_LIST,
  VIP_MEMBER_UPDATE,
  VIP_MEMBER_YESTERDAY,
  VIP_MEMBER_DETAIL,
  VIP_MEMBER_EXPORT_LIST,
  VIP_MEMBER_YEAR,
  VIP_SCAN_LIST
} from '../url/url';
import fetch from '../fetch';

/**
 * 会员列表
 * @return {Promise}      返回请求的Promise
 */
function getMemberList(data) {
  return fetch({
    url: VIP_MEMBER_LIST,
    method: 'post',
    data: data
  });
}

/**
 * 会员列表导出
 * @return {Promise}      返回请求的Promise
 */
function getMemberExport(data) {
  return fetch({
    url: VIP_MEMBER_EXPORT,
    method: 'post',
    data: data
  });
}

/**
 * 会员地址列表
 * @return {Promise}      返回请求的Promise
 */
function getMemberAdressList(data) {
  return fetch({
    url: VIP_MEMBER_ADDRESS_LIST + data,
    method: 'get'
  });
}

/**
 * 会员总数
 * @return {Promise}      返回请求的Promise
 */
function getMemberTotal() {
  return fetch({
    url: VIP_MEMBER_TOTAL,
    method: 'get'
  });
}

/**
 * 会员扫码记录
 * @return {Promise}      返回请求的Promise
 */
function getMemberScanList(data) {
  return fetch({
    url: VIP_MEMBER_SCAN_LIST,
    method: 'post',
    data: data
  });
}

/**
 * 会员等级列表
 * @return {Promise}      返回请求的Promise
 */
function getMemberLevelList() {
  let data = sessionStorage.getItem(VIP_MEMBER_LEVEL_LIST);
  if (data) return Promise.resolve(JSON.parse(data));
  return fetch({
    url: VIP_MEMBER_LEVEL_LIST,
    method: 'get'
  }).then((res) => {
    if (res.data.code === 0) {
      window.sessionStorage.setItem(VIP_MEMBER_LEVEL_LIST, JSON.stringify(res));
      return res;
    }
  });
}

/**
 * 修改会员信息
 * @return {Promise}      返回请求的Promise
 */
function UpdateMember(data) {
  return fetch({
    url: VIP_MEMBER_UPDATE,
    method: 'post',
    data: data
  });
}

/**
 * 昨日新增会员
 * @return {Promise}      返回请求的Promise
 */
function getMemberYesterday() {
  return fetch({
    url: VIP_MEMBER_YESTERDAY,
    method: 'get'
  });
}

/**
 * 索引会员
 * @return {Promise}      返回请求的Promise
 */
function getMemberDetail(data) {
  return fetch({
    url: VIP_MEMBER_DETAIL + data,
    method: 'get'
  });
}

/**
 * 获取会员信息导出状态列表
 * @return {Promise}      返回请求的Promise
 */
function getMemberExportList() {
  return fetch({
    url: VIP_MEMBER_EXPORT_LIST,
    method: 'get'
  });
}

/**
 * 近12个月会员增值趋势
 * @return {Promise}      返回请求的Promise
 */
function getMemberYear() {
  return fetch({
    url: VIP_MEMBER_YEAR,
    method: 'get'
  });
}

/**
 * 扫码明细列表
 * @return {Promise}      返回请求的Promise
 */
function getScanList(data) {
  return fetch({
    url: VIP_SCAN_LIST,
    method: 'post',
    data: data
  });
}

const member = {
  getMemberList,
  getMemberExport,
  getMemberAdressList,
  getMemberTotal,
  getMemberScanList,
  getMemberLevelList,
  UpdateMember,
  getMemberYesterday,
  getMemberDetail,
  getMemberExportList,
  getMemberYear,
  getScanList
};

export { member };
