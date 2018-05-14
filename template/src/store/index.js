import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';

Vue.use(Vuex);

const store = new Vuex.Store({
  // 构建工具根据环境开启严格模式
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    user
  }
});

export default store;
