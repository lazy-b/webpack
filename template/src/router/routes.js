/*
* @Author: yang
* @Date:   2018-01-06 17:26:56
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-05-14 19:35:26
*/

import * as COM from './components';

/**
 * redirect: path                 重定位
 * name:'router-name'             路由名，必须
 * meta : {                       路由元信息，该字段必须存在
 *  hidden: true,                 是否在菜单栏中显示
    roles: ['admin','editor'],    页面对应权限
    label: 'string',              菜单显示的文本
    icon: 'class-name',           菜单图标类名
  }
 **/
export const routes = [
  /** ------------------------------ 一级页面 ------------------------------ */
  { path: '/login', component: COM.Login, meta: { hidden: true } },
  /** ------------------------------ 首页 ------------------------------ */
  {
    path: '/',
    component: COM.HomeLayout,
    redirect: '/home',
    name: 'homeLayout',
    meta: { hidden: true },
    /** ------------------------------ 二级页面 ------------------------------ */
    children: [
      {
        path: 'home',
        components: {
          bodyView: COM.Home,
          appHeader: COM.NavHeader,
        },
        name: 'home',
        meta: { label: '首页' },
        children: [],
      },
    ]
  },
  /** ------------------------------ 会员服务 ------------------------------ */
  // {
  //   path: '/memberServices',
  //   component: COM.Layout,
  //   redirect: '/memberServices/memberLevelList',
  //   name: 'memberServices',
  //   meta: { hidden: true },
  //   /** ------------------------------ 二级页面 ------------------------------ */
  //   children: [
  //     // 会员等级列表
  //     {
  //       path: 'memberLevelList',
  //       components: {
  //         bodyView: COM.MemberLevelList,
  //         appHeader: COM.NavHeader,
  //         bodyHeader: COM.BodyHeader,
  //         secondMenu: COM.SecondMenu,
  //       },
  //       name: 'memberLevelList',
  //       meta: { label: '会员等级列表' },
  //       children: [],
  //     },
  //     // 会员等级管理
  //     {
  //       path: 'memberLevelMgr/:channelId?',
  //       components: {
  //         bodyView: COM.MemberLevelMgr,
  //         appHeader: COM.NavHeader,
  //         bodyHeader: COM.BodyHeader,
  //         secondMenu: COM.SecondMenu,
  //       },
  //       name: 'memberLevelMgr',
  //       meta: { label: '会员等级管理' }
  //     },
  //     // 成长值规则列表
  //     {
  //       path: 'memberRuleList',
  //       components: {
  //         bodyView: COM.MemberRuleList,
  //         appHeader: COM.NavHeader,
  //         bodyHeader: COM.BodyHeader,
  //         secondMenu: COM.SecondMenu,
  //       },
  //       name: 'memberRuleList',
  //       meta: { label: '成长值规则列表' }
  //     },
  //     // 成长值规则管理
  //     {
  //       path: 'memberRuleMgr/:channelId?/:growRuleTypeId?',
  //       components: {
  //         bodyView: COM.MemberRuleMgr,
  //         appHeader: COM.NavHeader,
  //         bodyHeader: COM.BodyHeader,
  //         secondMenu: COM.SecondMenu,
  //       },
  //       name: 'memberRuleMgr',
  //       meta: { label: '成长值规则管理' }
  //     },
  //     // 积分规则列表
  //     {
  //       path: 'pointRuleList',
  //       components: {
  //         bodyView: COM.PointRuleList,
  //         appHeader: COM.NavHeader,
  //         bodyHeader: COM.BodyHeader,
  //         secondMenu: COM.SecondMenu,
  //       },
  //       name: 'pointRuleList',
  //       meta: { label: '积分规则列表' }
  //     },
  //     // 积分获取规则管理
  //     {
  //       path: 'getPointRuleMgr/:channelId?/:pointRuleTypeId?',
  //       components: {
  //         bodyView: COM.GetPointRuleMgr,
  //         appHeader: COM.NavHeader,
  //         bodyHeader: COM.BodyHeader,
  //         secondMenu: COM.SecondMenu,
  //       },
  //       name: 'getPointRuleMgr',
  //       meta: { label: '积分获取规则管理' }
  //     },
  //     // 积分兑换列表
  //     {
  //       path: 'pointExchangeList',
  //       components: {
  //         bodyView: COM.PointExchangeList,
  //         appHeader: COM.NavHeader,
  //         bodyHeader: COM.BodyHeader,
  //         secondMenu: COM.SecondMenu,
  //       },
  //       name: 'pointExchangeList',
  //       meta: { label: '积分兑换列表' }
  //     },
  //     // 积分兑换规则管理
  //     {
  //       path: 'pointExchangeRuleMgr/:pointExchangeRuleId?',
  //       components: {
  //         bodyView: COM.PointExchangeRuleMgr,
  //         appHeader: COM.NavHeader,
  //         bodyHeader: COM.BodyHeader,
  //         secondMenu: COM.SecondMenu,
  //       },
  //       name: 'pointExchangeRuleMgr',
  //       meta: { label: '积分兑换规则管理' }
  //     },
  //     // 积分消耗规则管理
  //     {
  //       path: 'expirePointRuleMgr',
  //       components: {
  //         bodyView: COM.ExpirePointRuleMgr,
  //         appHeader: COM.NavHeader,
  //         bodyHeader: COM.BodyHeader,
  //         secondMenu: COM.SecondMenu,
  //       },
  //       name: 'expirePointRuleMgr',
  //       meta: { label: '积分消耗规则管理' }
  //     },
  //   ]
  // },
  { path: '*', redirect: '/', meta: { hidden: true } }
];
export default routes;
