/*
* @Author: lazy1993
* @Date:   2017-12-26 15:40:49
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-04-20 13:40:29
*/
import fetch from '../fetch';

import {
  USER_LIST,
  USER_SAVE,
  USER_UPDATE,
  USER_GET_ROLES,
  USER_EDIT_ROLE,
  USER_REMOVE,
  USER_UPDATE_PASSWORD,
  USER_LOGIN,
  USER_LOGOUT,
  USER_GET_INFO_BY_ID,
  USER_GET_USER_INFO,
  USER_GET_MENU,
  USER_GET_USER_PERMISSION_DEPT,
  USER_SET_USER_PERMISSION_DEPT,
} from '../url/url';

/**
 * 用户登录
 * @param  {Object} data  登录表单
 * @return {Promise}      返回请求的Promise
 */
function login(data) {
  return fetch({
    url: USER_LOGIN,
    method: 'post',
    data: data
  });
}

/**
 * 用户注销
 * @return {Promise}      返回请求的Promise
 */
function logout(data) {
  return fetch({
    url: USER_LOGOUT,
    method: 'get',
    params: data
  });
}

/**
 * 查询用户列表
 * @param  {Object} params 请求参数对象{pageIndex, pageSize, ...}
 * @return {Promise}       返回请求的Promise
 */
function getList(form) {
  return fetch({
    url: USER_LIST,
    method: 'get',
    params: form
  });
}

/**
 * 新增
 * @param  {Object} form   表单
 * @return {Promise}       返回请求的Promise
 */
function save(form) {
  return fetch({
    url: USER_SAVE,
    method: 'post',
    data: form
  });
}

/**
 * 更新
 * @param  {Object} form   表单
 * @return {Promise}       返回请求的Promise
 */
function update(form) {
  return fetch({
    url: USER_UPDATE,
    method: 'post',
    data: form
  });
}

/**
 * 查询用户已分配的角色
 * @param  {Object} params 用户id
 * @return {Promise}       返回请求的Promise
 */
function getUserRoles(params) {
  return fetch({
    url: USER_GET_ROLES + '/' + params.userId,
    method: 'get'
  });
}

/**
 * 设置用户角色信息
 * @param  {Object} data   post数据
 * @return {Promise}       返回请求的Promise
 */
function setRoles(data) {
  return fetch({
    url: USER_EDIT_ROLE,
    method: 'post',
    data: data
  });
}

/**
 * 删除
 * @param  {String} userId id
 * @return {Promise}       返回请求的Promise
 */
function remove(userId) {
  return fetch({
    url: USER_REMOVE + '/' + userId,
    method: 'delete'
  });
}

/**
 * 修改用户密码
 * @param  {Object } data  修改密码的表单
 * @return {Promise}       返回请求的Promise
 */
function updatePassword(data) {
  return fetch({
    url: USER_UPDATE_PASSWORD,
    method: 'post',
    data: data
  });
}

/**
 * 根据用户id获取用户信息
 * @param  { number } params  用户id
 * @return {Promise}        返回请求的Promise
 */
function getUserById(params) {
  return fetch({
    url: USER_GET_INFO_BY_ID + '/' + params.userId,
    method: 'get'
  });
}

/**
 * 获取用户信息（登录用）
 * @param  {null } null     不需要参数，后端自己验证登录token，判断是否可以返回数据
 * @return {Promise}        返回请求的Promise
 */
function getUserInfo() {
  return fetch({
    url: USER_GET_USER_INFO,
    method: 'get'
  });
}

/**
 * 获取用户菜单
 * @param  {Object } data  请求菜单的参数
 * @return {Promise}       返回请求的Promise
 */
function getMenu() {
  /* const url = USER_GET_MENU + '/' + params.userId +
              '/' + params.setOfBooksId;
*/
  const url = USER_GET_MENU;
  return fetch({
    url: url,
    method: 'get'
  });
}

/**
 * 查询用户已分配的部门数据权限
 * @return {Promise}       返回请求的Promise
 */
function getPermissionDept(params) {
  const url = USER_GET_USER_PERMISSION_DEPT + '/' + params.userId;

  return fetch({
    url: url,
    method: 'get'
  });
}

/**
 * 设置用户部门数据权限
 * @data data 用户部门列表和用户id
 * @returns {*}
 */
function setPermissionDept(data) {
  return fetch({
    url: USER_SET_USER_PERMISSION_DEPT,
    method: 'post',
    data: data
  });
}

const users = {
  getList,
  save,
  update,
  getUserRoles,
  setRoles,
  remove,
  updatePassword,
  login,
  logout,
  getUserById,
  getUserInfo,
  getMenu,
  getPermissionDept,
  setPermissionDept
};

export { users };
