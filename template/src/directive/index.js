/*
* @Author: lazy1993
* @Date:   2018-01-16 16:42:06
 * @Last Modified by: LuoJW
 * @Last Modified time: 2018-04-20 02:29:56
*/
import Vue from 'vue';
import Clipboard from './clipboard/index';

// document监听enter事件
import AutoEnter from './autoEnter/index';

const install = function(Vue) {
  Vue.directive('Clipboard', Clipboard);
  Vue.directive('yxyEnter', AutoEnter);
};

if (window.Vue) {
  window.clipboard = Clipboard;
  Vue.use(install); // eslint-disable-line
}

Clipboard.install = install;
export default Clipboard;
