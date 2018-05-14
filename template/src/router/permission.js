/*
* @Author: yang
* @Date:   2018-01-06 22:33:31
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-05-06 18:43:55
*/

// import router from './index';
// import store from '../store';
// import NProgress from 'nprogress'; // Progress 进度条
// import 'nprogress/nprogress.css';// Progress 进度条样式
// import { Message } from 'element-ui';

// const whiteList = ['/login'];// 不重定向白名单

// router.beforeEach((to, from, next) => {
//   NProgress.start(); // 开启Progress

//   // 如果用户去往白名单，则直接放过
//   if (whiteList.indexOf(to.path) !== -1) {
//     next();
//     NProgress.done();
//     return;
//   }

//   // 获取用户权限需要用户id和帐套id，所以用这两个字段来做判断条件
//   // 如果没有用户信息则证明没有获取用户信息
//   const userInfo = store.getters['user/userInfo'];

//   // 如果没有用户信息，则请求用户数据
//   // 请求成功查看是否有默认帐套，如果没有默认帐套再设置帐套
//   // 请求失败说明没有登录，跳转到登录页面
//   // 如果设置了id，则查看是否有默认帐套（针对用户记住密码的情况）
//   // 如果没有默认帐套再设置帐套
//   if (!userInfo) {
//     store.dispatch('user/setUserInfo').then(res => {
//       // 账套不要暂时注释掉
//       /*const book = store.getters['user/book'];

//       if (!book) {
//         store.dispatch('user/openBookDialog');
//         NProgress.done();
//         return;
//       }*/

//       next();
//       NProgress.done();
//     }, err => {
//       next({ path: '/login' });
//       NProgress.done();
//     });
//   } else {
//     // 账套不要暂时注释掉
//    /* const book = store.getters['user/book'];

//     if (!book) {
//       store.dispatch('user/openBookDialog');
//       NProgress.done();
//       return;
//     }*/

//     next();
//     NProgress.done();
//   }
// })

// router.afterEach(() => {
//   NProgress.done() // 结束Progress
// })
