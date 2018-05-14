/*
* @Author: lazy1993
* @Date:   2017-12-26 15:42:37
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-04-20 13:39:18
*/

import axios from 'axios';
import { Message } from 'element-ui';
// import store from '@/store';
import router from '@/router';
// import { serialize } from '@/utils/serizlize';

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 30000, // 请求超时时间
  // withCredentials: true
});

// request拦截器
// service.interceptors.request.use(config => {
//   // Do something before request is sent
//   // 如果有data,则根据后端同学的要求进行一些处理
//   // const data = config.data;
//   // if (data) {
//   //   config.data = serialize(data);
//   // }

//   return config
// }, error => {
//   // Do something with request error
//   console.log(error) // for debug
//   Promise.reject(error)
// });

// respone拦截器
service.interceptors.response.use(

  response => {
    const res = response.data;

    // 如果返回的code为0，则直接放过
    if (res.code === 0) {
      return response;
    } else if (res.code === 105) {
      Message({
        message: '您的登录状态已过期，请重新登录',
        type: 'error',
        duration: 3000
      });

      router.push({ path: '/login' });

      return response;
    } else {
      Message({
        message: response.data.msg,
        type: 'error',
        duration: 3000
      });

      return response;
    }
  },
  /**
  * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
  * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
  */
  //  const res = response.data;
  //     if (res.code !== 20000) {
  //       Message({
  //         message: res.message,
  //         type: 'error',
  //         duration: 5 * 1000
  //       });
  //       // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
  //       if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
  //         MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
  //           confirmButtonText: '重新登录',
  //           cancelButtonText: '取消',
  //           type: 'warning'
  //         }).then(() => {
  //           store.dispatch('FedLogOut').then(() => {
  //             location.reload();// 为了重新实例化vue-router对象 避免bug
  //           });
  //         })
  //       }
  //       return Promise.reject('error');
  //     } else {
  //       return response.data;
  //     }
  error => {
    // console.log(error + '');// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5000
    });
    return Promise.reject(error);
  }
);

export default service;
