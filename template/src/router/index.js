/*
* @Author: yang
* @Date:   2018-01-06 17:26:56
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-04-27 14:35:26
*/

import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './routes';

// 使用路由组件
Vue.use(VueRouter);

// 创建路由
const router = new VueRouter({
  // mode: 'history',    // 路由的模式
  // base: __dirname,
  scrollBehavior: (to) => {
    if (to.hash) {
      return {
        selector: to.hash,
      };
    } else {
      return { x: 0, y: 0 };
    }
  },
  routes: routes
});

export default router;
