/*
 * File: memberServices.js
 * Project: scrm
 * File Created: 2018-04-27 7:16:52 pm
 * Author: lazy1993 (2280042554@qq.com)
 * -----
 * Last Modified: 2018-04-28 2:40:18 pm
 * Modified By: lazy1993 (2280042554@qq.com>) (<<git>>)
 * -----
 * Copyright  2018 - MeiCloud, MeiCloud
 */

import {
  /** 基础数据 */
  // 获取渠道列表
  MEMBER_BASIC_CHANNEL_LIST,
  // 获取成长值规则类型列表
  MEMBER_BASIC_GROW_RULE_LIST,
  // 获取积分规则类型列表
  MEMBER_BASIC_POINT_RULE_LIST,

  /** 会员等级 */
  // 会员等级列表
  MEMBER_LEVEL_LIST,
  // 根据渠道获取会员等级列表
  MEMBER_LEVEL_LIST_BY_CHANNEL,
  // 新建会员等级信息
  MEMBER_NEW_LEVEL,
  // 编辑会员等级信息
  MEMBER_UPDATE_LEVEL,
  // 会员矩阵列表 - 各渠道会员等级列表
  MEMBER_MATRIX_LEVEL_LIST,
  // 会员等级矩阵信息
  MEMBER_LEVEL_MATRIX_INFO,

  /** 成长值规则 */
  // 成长值规则列表
  MEMBER_GROW_RULE_LIST,
  // 索引成长值规则
  MEMBER_GROW_RULE_BY_ID,
  // 新增成长值规则
  MEMBER_NEW_GROW_RULE,
  // 编辑成长值规则
  MEMBER_UPDATE_GROW_RULE,
  // 删除成长值规则
  MEMBER_DELETE_GROW_RULE,
  // 启用/停用成长值规则
  MEMBER_TOGGLE_GROW_RULE,

  /** 会员积分 */
  // 会员积分规则列表
  MEMBER_POINT_RULE_LIST,
  // 新增会员积分规则
  MEMBER_NEW_POINT_RULE,
  // 编辑会员积分规则
  MEMBER_UPDATE_POINT_RULE,
  // 删除积分值规则
  MEMBER_DELETE_POINT_RULE,
  // 索引会员积分规则
  MEMBER_POINT_RULE_BY_TYPE,
  // 启用/停用积分值规则
  MEMBER_TOGGLE_POINT_RULE,
  // 积分兑换列表
  MEMBER_POINT_EXCHANGE_RULE_LIST,
  // 索引积分兑换规则
  MEMBER_POINT_EXCHANGE_RULE_BY_ID,
  // 新增积分兑换规则
  MEMBER_NEW_POINT_EXCHANGE_RULE,
  // 修改积分兑换规则
  MEMBER_UPDATE_POINT_EXCHANGE_RULE,
  // 删除积分兑换规则
  MEMBER_DELETE_POINT_EXCHANGE_RULE,
  // 启用/禁用积分兑换规则
  MEMBER_TOGGLE_POINT_EXCHANGE_RULE,
  // 积分矩阵列表
  MEMBER_POINT_MATRIX_LIST,
  // 索引积分矩阵信息
  MEMBER_POINT_MATRIX_LIST_BY_ID,
  // 新建积分矩阵信息
  MEMBER_NEW_POINT_MATRIX_LIST,
  // 编辑积分矩阵信息
  MEMBER_UPDATE_POINT_MATRIX_LIST,
  // 启用/禁用积分矩阵信息
  MEMBER_TOGGLE_POINT_MATRIX_LIST,
  // 获取积分有效期信息
  MEMBER_POINT_EXPIRE_BY_ID,
  // 修改积分有效期信息
  MEMBER_UPDATE_POINT_EXPIRE,
} from '../url';
import fetch from '../fetch';

/** ------------ 基础数据 --------------- */
/**
 * 获取渠道列表
 * @return {Promise}      返回请求的Promise
 */
function getBasicChannelList() {
  return fetch({
    url: MEMBER_BASIC_CHANNEL_LIST,
    method: 'get',
  });
}

/**
 * 获取成长值规则类型列表
 * @return {Promise}      返回请求的Promise
 */
function getBasicGrowRuleTypeList() {
  return fetch({
    url: MEMBER_BASIC_GROW_RULE_LIST,
    method: 'get',
  });
}

/**
 * 获取积分规则类型列表
 * @return {Promise}      返回请求的Promise
 */
function getBasicPointRuleTypeList() {
  return fetch({
    url: MEMBER_BASIC_POINT_RULE_LIST,
    method: 'get',
  });
}

/** ------------ 会员等级 --------------- */
/**
 * 会员等级列表
 * @return {Promise}      返回请求的Promise
 */
function getMemberLevelList() {
  return fetch({
    url: MEMBER_LEVEL_LIST,
    method: 'get',
  });
}
/**
 * 根据渠道获取会员等级列表
 * @return {Promise}      返回请求的Promise
 */
function getMemberLevelListByChannelId(params) {
  return fetch({
    url: MEMBER_LEVEL_LIST_BY_CHANNEL,
    method: 'get',
    params: params,
  });
}
/**
 * 新建会员等级信息
 * @return {Promise}      返回请求的Promise
 */
function putNewMemberLevel(data) {
  return fetch({
    url: MEMBER_NEW_LEVEL + '/' + data.channelId,
    method: 'put',
    data: data,
  });
}
/**
 * 编辑会员等级信息
 * @return {Promise}      返回请求的Promise
 */
function updateMemberLevel(data) {
  return fetch({
    url: MEMBER_UPDATE_LEVEL + '/' + data.channelId,
    method: 'post',
    data: data,
  });
}
/**
 * 会员矩阵列表 - 各渠道会员等级列表
 * @return {Promise}      返回请求的Promise
 */
function getMatrixLevelList() {
  return fetch({
    url: MEMBER_MATRIX_LEVEL_LIST,
    method: 'get',
  });
}
/**
 * 会员等级矩阵信息
 * @return {Promise}      返回请求的Promise
 */
function getLevelMatrixInfo() {
  return fetch({
    url: MEMBER_LEVEL_MATRIX_INFO,
    method: 'get',
  });
}

/** ------------ 成长值规则 --------------- */
/**
 * 成长值规则列表
 * @return {Promise}      返回请求的Promise
 */
function getMemberRuleList(params) {
  return fetch({
    url: MEMBER_GROW_RULE_LIST,
    method: 'get',
    params: params,
  });
}
/**
 * 索引成长值规则
 * @return {Promise}      返回请求的Promise
 */
function getMemberGrowRuleById(params) {
  return fetch({
    url: MEMBER_GROW_RULE_BY_ID,
    method: 'get',
    params: params,
  });
}
/**
 * 新增成长值规则
 * @return {Promise}      返回请求的Promise
 */
function putNewMemberGrowRule(data) {
  return fetch({
    url: MEMBER_NEW_GROW_RULE,
    method: 'put',
    data: data,
  });
}
/**
 * 编辑成长值规则
 * @return {Promise}      返回请求的Promise
 */
function updateMemberGrowRule(data) {
  return fetch({
    url: MEMBER_UPDATE_GROW_RULE,
    method: 'post',
    data: data,
  });
}
/**
 * 删除成长值规则
 * @return {Promise}      返回请求的Promise
 */
function deleteMemberGrowRule(data) {
  return fetch({
    url: MEMBER_DELETE_GROW_RULE,
    method: 'delete',
    data: data,
  });
}
/**
 * 启用/停用成长值规则
 * @return {Promise}      返回请求的Promise
 */
function toggleMemberGrowRule(data) {
  return fetch({
    url: MEMBER_TOGGLE_GROW_RULE,
    method: 'post',
    data: data,
  });
}

/** ------------ 会员积分 --------------- */
/**
 * 会员积分规则列表
 * @return {Promise}      返回请求的Promise
 */
function getPointRuleList(params) {
  return fetch({
    url: MEMBER_POINT_RULE_LIST,
    method: 'get',
    params: params,
  });
}
/**
 * 新增会员积分规则
 * @return {Promise}      返回请求的Promise
 */
function putNewPointRule(data) {
  return fetch({
    url: MEMBER_NEW_POINT_RULE,
    method: 'put',
    data: data,
  });
}
/**
 * 编辑会员积分规则
 * @return {Promise}      返回请求的Promise
 */
function updatePointRule(data) {
  return fetch({
    url: MEMBER_UPDATE_POINT_RULE,
    method: 'post',
    data: data,
  });
}
/**
 * 删除积分值规则
 * @return {Promise}      返回请求的Promise
 */
function deletePointRule(data) {
  return fetch({
    url: MEMBER_DELETE_POINT_RULE,
    method: 'delete',
    data: data,
  });
}
/**
 * 索引会员积分规则
 * @return {Promise}      返回请求的Promise
 */
function getPointRuleById(params) {
  return fetch({
    url: MEMBER_POINT_RULE_BY_TYPE,
    method: 'get',
    params: params,
  });
}
/**
 * 启用/停用积分值规则
 * @return {Promise}      返回请求的Promise
 */
function togglePointRule(data) {
  return fetch({
    url: MEMBER_TOGGLE_POINT_RULE,
    method: 'post',
    data: data,
  });
}
/**
 * 积分兑换列表
 * @return {Promise}      返回请求的Promise
 */
function getPointExchangeRuleList(params) {
  return fetch({
    url: MEMBER_POINT_EXCHANGE_RULE_LIST,
    method: 'get',
    params: params,
  });
}
/**
 * 索引积分兑换规则
 * @return {Promise}      返回请求的Promise
 */
function getPointExchangeRuleById(params) {
  return fetch({
    url: MEMBER_POINT_EXCHANGE_RULE_BY_ID + '/' + params.pointExchangeRuleId,
    method: 'get',
    params: params,
  });
}
/**
 * 新增积分兑换规则
 * @return {Promise}      返回请求的Promise
 */
function putNewPointExchangeRule(data) {
  return fetch({
    url: MEMBER_NEW_POINT_EXCHANGE_RULE,
    method: 'put',
    data: data,
  });
}
/**
 * 修改积分兑换规则
 * @return {Promise}      返回请求的Promise
 */
function updatePointExchangeRule(data) {
  return fetch({
    url: MEMBER_UPDATE_POINT_EXCHANGE_RULE,
    method: 'post',
    data: data,
  });
}
/**
 * 删除积分兑换规则
 * @return {Promise}      返回请求的Promise
 */
function deletePointExchangeRule(data) {
  return fetch({
    url: MEMBER_DELETE_POINT_EXCHANGE_RULE + '/' + data.pointExchangeRuleId,
    method: 'delete',
    data: data,
  });
}
/**
 * 启用/禁用积分兑换规则
 * @return {Promise}      返回请求的Promise
 */
function togglePointExchangeRule(data) {
  return fetch({
    url: MEMBER_TOGGLE_POINT_EXCHANGE_RULE,
    method: 'post',
    data: data,
  });
}
/**
 * 积分矩阵列表
 * @return {Promise}      返回请求的Promise
 */
function getPointMarixList(params) {
  return fetch({
    url: MEMBER_POINT_MATRIX_LIST,
    method: 'get',
    params: params,
  });
}
/**
 * 索引积分矩阵信息
 * @return {Promise}      返回请求的Promise
 */
function getPointMarixById(params) {
  return fetch({
    url: MEMBER_POINT_MATRIX_LIST_BY_ID + '/' + params.pointMatrixId,
    method: 'get',
    params: params,
  });
}
/**
 * 新建积分矩阵信息
 * @return {Promise}      返回请求的Promise
 */
function putNewPointMatrix(data) {
  return fetch({
    url: MEMBER_NEW_POINT_MATRIX_LIST,
    method: 'put',
    data: data,
  });
}
/**
 * 编辑积分矩阵信息
 * @return {Promise}      返回请求的Promise
 */
function updatePointMatrix(data) {
  return fetch({
    url: MEMBER_UPDATE_POINT_MATRIX_LIST,
    method: 'post',
    data: data,
  });
}
/**
 * 启用/禁用积分矩阵信息
 * @return {Promise}      返回请求的Promise
 */
function togglePointMatrix(data) {
  return fetch({
    url: MEMBER_TOGGLE_POINT_MATRIX_LIST,
    method: 'post',
    data: data,
  });
}
/**
 * 获取积分有效期信息
 * @return {Promise}      返回请求的Promise
 */
function getPointExpireById(params) {
  return fetch({
    url: MEMBER_POINT_EXPIRE_BY_ID + '/' + params.channelId,
    method: 'get',
    params: params,
  });
}
/**
 * 修改积分有效期信息
 * @return {Promise}      返回请求的Promise
 */
function updatePointExpire(data) {
  return fetch({
    url: MEMBER_UPDATE_POINT_EXPIRE,
    method: 'post',
    data: data,
  });
}

const memberServices = {
  getBasicChannelList,
  getBasicGrowRuleTypeList,
  getBasicPointRuleTypeList,
  getMemberLevelList,
  getMemberLevelListByChannelId,
  putNewMemberLevel,
  updateMemberLevel,
  getMatrixLevelList,
  getLevelMatrixInfo,
  getMemberRuleList,
  getMemberGrowRuleById,
  putNewMemberGrowRule,
  updateMemberGrowRule,
  deleteMemberGrowRule,
  toggleMemberGrowRule,
  getPointRuleList,
  putNewPointRule,
  updatePointRule,
  deletePointRule,
  getPointRuleById,
  togglePointRule,
  getPointExchangeRuleList,
  getPointExchangeRuleById,
  putNewPointExchangeRule,
  updatePointExchangeRule,
  deletePointExchangeRule,
  togglePointExchangeRule,
  getPointMarixList,
  getPointMarixById,
  putNewPointMatrix,
  updatePointMatrix,
  togglePointMatrix,
  getPointExpireById,
  updatePointExpire,
};

export { memberServices };
