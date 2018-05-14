/*
* @Author: lazy1993
* @Date:   2018-01-16 16:42:06
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-05-14 18:16:01
*/
import Vue from 'vue';

// document监听enter事件
import AutoEnter from './autoEnter/index';

const install = function(Vue) {
  Vue.directive('yxyEnter', AutoEnter);
};

Vue.use(install); // eslint-disable-line
