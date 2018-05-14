/**
 * File: index.js
 * Project: yxy-admin
 * File Created: 2018-02-28 8:22:18 am
 * Author: lazy1993 (2280042554@qq.com)
 * -----
 * Last Modified: 2018-02-28 10:18:00 pm
 * Modified By: lazy1993 (2280042554@qq.com>) (<<git>>)
 * -----
 * Copyright © 2017 - MeiCloud, MeiCloud
 */

import { getDictList } from '@/utils';

function pluralize(time, label) {
  if (time === 1) {
    return time + label;
  }
  return time + label + 's';
}

export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time);
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute');
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour');
  } else {
    return pluralize(~~(between / 86400), ' day');
  }
}

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null;
  }

  if ((time + '').length === 10) {
    time = +time * 1000;
  }

  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
  let date;
  if (typeof time === 'object') {
    date = time;
  } else {
    date = new Date(parseInt(time));
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  };
  const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];
    if (key === 'a') { return ['一', '二', '三', '四', '五', '六', '日'][value - 1] };
    if (result.length > 0 && value < 10) {
      value = '0' + value;
    }
    return value || 0;
  });
  return timeStr;
}

export function formatTime(val, fmt = 'yyyy-MM-dd hh:mm:ss') {
  if (!val) return;
  val = new Date(val);
  var o = {
    'M+': val.getMonth() + 1, // 月份
    'd+': val.getDate(), // 日
    'h+': val.getHours(), // 小时
    'm+': val.getMinutes(), // 分
    's+': val.getSeconds(), // 秒
    'q+': Math.floor((val.getMonth() + 3) / 3), // 季度
    S: val.getMilliseconds() // 毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (val.getFullYear() + '').substr(4 - RegExp.$1.length)
    );
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      );
    }
  }
  return fmt;
}

/* 数字 格式化 */
export function nFormatter(num, digits) {
  const si = [
    { value: 1e18, symbol: 'E' },
    { value: 1e15, symbol: 'P' },
    { value: 1e12, symbol: 'T' },
    { value: 1e9, symbol: 'G' },
    { value: 1e6, symbol: 'M' },
    { value: 1e3, symbol: 'k' }
  ];
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (
        (num / si[i].value + 0.1)
          .toFixed(digits)
          .replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
      );
    }
  }
  return num.toString();
}

export function html2Text(val) {
  const div = document.createElement('div');
  div.innerHTML = val;
  return div.textContent || div.innerText;
}

export function toThousandslsFilter(num) {
  return (+num || 0)
    .toString()
    .replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','));
}

/** ======================== 立白项目定义 ======================== */
// 数据字典
export function dict(val, type) {
  const list = getDictList(type);
  let result = '';

  for (let i = 0; i < list.length; i++) {
    if (list[i].value === val) {
      result = list[i].label;
      break;
    }
  }

  return result;
}

// 统一格式化日期
export function date(dateObj) {
  if (!dateObj) {
    return '';
  }

  const separator = '/';
  if (typeof dateObj === 'string') {
    dateObj = new Date(dateObj);
  }

  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const date = dateObj.getDate();
  const getString = function getString(num) {
    return num < 10 ? '0' + num : '' + num;
  };

  return (
    getString(year) + separator + getString(month) + separator + getString(date)
  );
}

export function Time(date, type) {
  if (!date) {
    return '';
  }
  if (typeof date === 'number') {
    date = new Date(date);
  } else {
    return date;
  }
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  let d = date.getDate();
  if (type !== 'DATE') {
    return (
      y +
      '-' +
      (m < 10 ? '0' + m : m) +
      '-' +
      (d < 10 ? '0' + d : d) +
      ' ' +
      date.toTimeString().substr(0, 5)
    );
  } else {
    return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d);
  }
}

// 统一格式化布尔值
export function boolean(boolean) {
  return boolean ? '是' : '否';
}

// 统一格式化手机号
export function mobile(string) {
  if (typeof string !== 'string') {
    return;
  }
  const reg = /(\d{3})(\d{4})(\d{4})/;
  const result = string.match(reg);

  return `${result[1]} ${result[2]} ${result[3]}`;
}

/** ------------- 立白项目业务规则 --------------- */
/* 根据数据字典和value值来获取key
 *  @param {string} value 数据字典对应的值
 *  @param {array} list 数据字典数组
 *  @param {string} emptyKey 没有对应值时传递的默认key
*/
export const dictValToKey = (value, list, emptyKey = '') => {
  for (let item of list) {
    if (item.value === value) {
      return item.name;
    }
  }
  return emptyKey;
};
