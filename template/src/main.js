{{#if_eq build "standalone"}}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
{{/if_eq}}
import Vue from 'vue'
import 'normalize.css';// A modern alternative to CSS resets
import Element from 'element-ui';
import '@/styles/index.scss'; // global css
import '@/assets/iconfont/iconfont.css'; // iconfont字体图标


import App from './App'
{{#router}}
import router from './router'
{{/router}}
{{#vuex}}
import store from './store'
{{/vuex}}
import './directive'; // 全局自定义指令
import './components'; // 全局自定义组件
import * as filters from './filters'; // global filter

// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  {{#router}}
  router,
  {{/router}}
  {{#vuex}}
  store,
  {{/vuex}}
  {{#if_eq build "runtime"}}
  render: h => h(App)
  {{/if_eq}}
  {{#if_eq build "standalone"}}
  components: { App },
  template: '<App/>'
  {{/if_eq}}
})
