/**
 * File: validate.js
 * Project: yxy-admin
 * File Created: 2018-01-22 9:55:19 am
 * Author: lazy1993 (2280042554@qq.com)
 * -----
 * Last Modified: 2018-02-28 1:58:20 pm
 * Modified By: lazy1993 (2280042554@qq.com>) (<<git>>)
 * -----
 * Copyright © 2017 - MeiCloud, MeiCloud
 */
// 引入示范
// import { xxx } from "@/utils/validate";

/* ---------------- 统一验证规则,使用柯里化函数实现传参数 ------------------ */
// 非导购用户在APP&PC端密码为6位数字和字母的组合
export const checkPassword = (options) => (rule, value, callback) => {
  const message = options && options.message ? options.message : '密码必须为总长度为6到20的数字或字母的组合!';
  const urlregex = /^[a-zA-Z0-9]{6,20}$/;
  if (!urlregex.test(value)) {
    callback(new Error(message));
  } else {
    callback();
  }
};

// 登录用户名只能包含数字/字母/下划线/横杠
export const checkUsername = (options) => (rule, value, callback) => {
  const message = options && options.message ? options.message : '用户名为长度为6到20的数字或字母的组合!';
  const urlregex = /^[a-zA-Z0-9]{6,20}$/;

  if (!urlregex.test(value)) {
    callback(new Error(message));
  } else {
    callback();
  }
};

// 电话号码(11位数字)
export const checkMobile = (options) => (rule, value, callback) => {
  const message = options && options.message ? options.message : '请输入正确的电话号码!';
  const urlregex = /(^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(17([0-9]))|(18[0,5-9]))\d{8}$)/;

  if (!urlregex.test(value)) {
    callback(new Error(message));
  } else {
    callback();
  }
};

// 公民身份证号
export const checkPID = (options) => (rule, value, callback) => {
  const message = options && options.message ? options.message : '请输入正确的身份证号码!';
  const urlregex = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;

  if (!urlregex.test(value)) {
    callback(new Error(message));
  } else {
    callback();
  }
};

/* ------------------------ 下面的暂时没用 --------------------------- */
// export function isvalidUsername(str) {
//   const valid_map = ['admin', 'editor']
//   return valid_map.indexOf(str.trim()) >= 0
// }
/* check 门店名称 */
export function storeName(rule, value, callback) {
  if (!value) {
    return callback(new Error('名称不能为空'));
  } else {
    callback();
  }
}

// /* 合法uri*/
// export function validateURL(textval) {
//   const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
//   return urlregex.test(textval)
// }

// /* 小写字母*/
// export function validateLowerCase(str) {
//   const reg = /^[a-z]+$/
//   return reg.test(str)
// }

// /* 大写字母*/
// export function validateUpperCase(str) {
//   const reg = /^[A-Z]+$/
//   return reg.test(str)
// }

// /* 大小写字母*/
// export function validatAlphabets(str) {
//   const reg = /^[A-Za-z]+$/
//   return reg.test(str)
// }

// /**
//  * validate email
//  * @param email
//  * @returns {boolean}
//  */
// export function validateEmail(email) {
//   const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//   return re.test(email)
// }
