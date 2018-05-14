/*
 * File: user.js
 * Project: <<projectname>>
 * File Created: 2018-05-14 2:50:48 pm
 * Author: xiongyang (yang.xiong@meicloud.com)
 * -----
 * Last Modified: 2018-05-14 7:34:48 pm
 * Modified By: xiongyang (yang.xiong@meicloud.com>) (<<git>>)
 * -----
 * Copyright © 2018 - MeiCloud, MeiCloud
 */

import { getSession, setSession } from '@/utils';
import {
  USER_SET_USER_INFO,
  USER_SET_MENU,
} from '../mutation-types';

// 状态
const state = {
  // 用户信息
  user: null,
  // 用户菜单
  menuArr: []
};

// 操作
const mutations = {
  // 存储用户信息
  [USER_SET_USER_INFO](state, obj) {
    state.user = obj;
    setSession('userInfo', obj);
  },
  // 设置用户菜单
  [USER_SET_MENU](state, array) {
    state.menuArr = array;
    setSession('menuArr', array);
  }
};

// 方法
const actions = {
  // 设置用户信息
  // 如果设置失败，则跳转到登录页面
  setUserInfo({ commit }, userInfo) {
    commit('USER_SET_USER_INFO', userInfo);
  },
  // 设置用户菜单
  setMenu({ commit }, menuArr) {
    commit('USER_SET_MENU', menuArr);
  }
};

const getters = {
  // 用户id
  userInfo: state => state.user || getSession('userInfo'),
  // 用户菜单
  menuArr: state => {
    if (state.menuArr.length > 0) {
      return state.menuArr;
    } else {
      return getSession('menuArr');
    }
  }
};

export default {
  // 开启命名空间
  namespaced: true,
  getters,
  state,
  mutations,
  actions
};
