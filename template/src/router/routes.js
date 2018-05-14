/*
* @Author: yang
* @Date:   2018-01-06 17:26:56
 * @Last Modified by: xuxl
 * @Last Modified time: 2018-05-14 11:23:53
*/

import * as COM from './components';
import { sms } from './marketingCenter/index';
import { icon } from '@/icons';

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
  { path: '/404', component: COM.ErrorPage2, meta: { hidden: true } },
  { path: '/401', component: COM.ErrorPage1, meta: { hidden: true } },
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
        meta: { label: '首页', icon: icon('document') },
        children: [],
      },
    ]
  },
  /** ------------------------------ 会员服务 ------------------------------ */
  {
    path: '/memberServices',
    component: COM.Layout,
    redirect: '/memberServices/memberLevelList',
    name: 'memberServices',
    meta: { hidden: true },
    /** ------------------------------ 二级页面 ------------------------------ */
    children: [
      // 会员等级列表
      {
        path: 'memberLevelList',
        components: {
          bodyView: COM.MemberLevelList,
          appHeader: COM.NavHeader,
          bodyHeader: COM.BodyHeader,
          secondMenu: COM.SecondMenu,
        },
        name: 'memberLevelList',
        meta: { label: '会员等级列表', icon: icon('document') },
        children: [],
      },
      // 会员等级管理
      {
        path: 'memberLevelMgr/:channelId?',
        components: {
          bodyView: COM.MemberLevelMgr,
          appHeader: COM.NavHeader,
          bodyHeader: COM.BodyHeader,
          secondMenu: COM.SecondMenu,
        },
        name: 'memberLevelMgr',
        meta: { label: '会员等级管理', icon: icon('document') }
      },
      // 成长值规则列表
      {
        path: 'memberRuleList',
        components: {
          bodyView: COM.MemberRuleList,
          appHeader: COM.NavHeader,
          bodyHeader: COM.BodyHeader,
          secondMenu: COM.SecondMenu,
        },
        name: 'memberRuleList',
        meta: { label: '成长值规则列表', icon: icon('document') }
      },
      // 成长值规则管理
      {
        path: 'memberRuleMgr/:channelId?/:growRuleTypeId?',
        components: {
          bodyView: COM.MemberRuleMgr,
          appHeader: COM.NavHeader,
          bodyHeader: COM.BodyHeader,
          secondMenu: COM.SecondMenu,
        },
        name: 'memberRuleMgr',
        meta: { label: '成长值规则管理', icon: icon('document') }
      },
      // 积分规则列表
      {
        path: 'pointRuleList',
        components: {
          bodyView: COM.PointRuleList,
          appHeader: COM.NavHeader,
          bodyHeader: COM.BodyHeader,
          secondMenu: COM.SecondMenu,
        },
        name: 'pointRuleList',
        meta: { label: '积分规则列表', icon: icon('document') }
      },
      // 积分获取规则管理
      {
        path: 'getPointRuleMgr/:channelId?/:pointRuleTypeId?',
        components: {
          bodyView: COM.GetPointRuleMgr,
          appHeader: COM.NavHeader,
          bodyHeader: COM.BodyHeader,
          secondMenu: COM.SecondMenu,
        },
        name: 'getPointRuleMgr',
        meta: { label: '积分获取规则管理', icon: icon('document') }
      },
      // 积分兑换列表
      {
        path: 'pointExchangeList',
        components: {
          bodyView: COM.PointExchangeList,
          appHeader: COM.NavHeader,
          bodyHeader: COM.BodyHeader,
          secondMenu: COM.SecondMenu,
        },
        name: 'pointExchangeList',
        meta: { label: '积分兑换列表', icon: icon('document') }
      },
      // 积分兑换规则管理
      {
        path: 'pointExchangeRuleMgr/:pointExchangeRuleId?',
        components: {
          bodyView: COM.PointExchangeRuleMgr,
          appHeader: COM.NavHeader,
          bodyHeader: COM.BodyHeader,
          secondMenu: COM.SecondMenu,
        },
        name: 'pointExchangeRuleMgr',
        meta: { label: '积分兑换规则管理', icon: icon('document') }
      },
      // 积分消耗规则管理
      {
        path: 'expirePointRuleMgr',
        components: {
          bodyView: COM.ExpirePointRuleMgr,
          appHeader: COM.NavHeader,
          bodyHeader: COM.BodyHeader,
          secondMenu: COM.SecondMenu,
        },
        name: 'expirePointRuleMgr',
        meta: { label: '积分消耗规则管理', icon: icon('document') }
      },
    ]
  },
  /** ------------------------------ 会员管理 ------------------------------ */
  {
    path: '/members',
    component: COM.Layout,
    redirect: '/members/userList',
    name: 'members',
    meta: { hidden: true },
    /** ------------------------------ 二级页面 ------------------------------ */
    children: [
      // 会员列表
      {
        path: 'userList',
        components: {
          bodyView: COM.userList,
          appHeader: COM.NavHeader,
          bodyHeader: COM.BodyHeader,
          secondMenu: COM.SecondMenu,
        },
        name: 'userList',
        meta: { label: '会员列表', icon: icon('document') }
      },
      // 会员分组
      {
        path: 'userGroup',
        components: {
          bodyView: COM.userGroup,
          appHeader: COM.NavHeader,
          bodyHeader: COM.BodyHeader,
          secondMenu: COM.SecondMenu,
        },
        name: 'userGroup',
        meta: { label: '会员分组', icon: icon('document') }
      },
      // 会员详情
      {
        path: 'userDetail',
        components: {
          bodyView: COM.userDetail,
          appHeader: COM.NavHeader,
          bodyHeader: COM.BodyHeader,
          secondMenu: COM.SecondMenu,
        },
        name: 'userDetail',
        meta: { label: '会员详情', icon: icon('document') }
      },
      // 会员标签
      {
        path: 'labelMgr',
        components: {
          bodyView: COM.labelMgr,
          appHeader: COM.NavHeader,
          bodyHeader: COM.BodyHeader,
          secondMenu: COM.SecondMenu,
        },
        name: 'labelMgr',
        meta: { label: '会员标签', icon: icon('document') }
      },
      // 新建标签
      {
        path: 'newLabel',
        components: {
          bodyView: COM.newLabel,
          appHeader: COM.NavHeader,
          bodyHeader: COM.BodyHeader,
          secondMenu: COM.SecondMenu,
        },
        name: 'newLabel',
        meta: { label: '新建标签', icon: icon('document') }
      }
    ]
  },
  /** ------------------------------ 营销中心 ------------------------------ */
  {
    path: '/marketingCenter',
    component: COM.Layout,
    redirect: '/marketingCenter/smsMgr',
    name: 'marketingCenter',
    meta: { hidden: true },
    /** ------------------------------ 二级页面 ------------------------------ */
    children: [
      /** 营销工具 */
      // 短信
      {
        path: 'smsMgr',
        components: {
          bodyView: COM.smsMgr,
          appHeader: COM.NavHeader,
          bodyHeader: COM.BodyHeader,
          secondMenu: COM.SecondMenu,
        },
        name: 'smsMgr',
        meta: { label: '短信', icon: icon('document') }
      },
      // 短信-新建标签
      {
        path: 'editSmsBatch',
        components: {
          bodyView: COM.editSmsBatch,
          appHeader: COM.NavHeader,
          bodyHeader: COM.BodyHeader,
          secondMenu: COM.SecondMenu,
        },
        name: 'editSmsBatch',
        meta: { label: '新建点对点短信', icon: icon('document') }
      },
      // 短信-新建标签
      {
        path: 'editSmsP2P',
        components: {
          bodyView: COM.editSmsP2P,
          appHeader: COM.NavHeader,
          bodyHeader: COM.BodyHeader,
          secondMenu: COM.SecondMenu,
        },
        name: 'editSmsP2P',
        meta: { label: '新建批量短信', icon: icon('document') }
      },
      // 短链
      {
        path: 'shortLink',
        components: {
          bodyView: COM.shortLink,
          appHeader: COM.NavHeader,
          bodyHeader: COM.BodyHeader,
          secondMenu: COM.SecondMenu,
        },
        name: 'shortLink',
        meta: { label: '短链', icon: icon('document') }
      }
      /** 活动管理 */
      /** 微信设置 */
    ]
  },
  ...sms,
  /** 会员管理 */
  // {
  //   path: '/member',
  //   component: COM.Layout,
  //   redirect: 'noredirect',
  //   name: '会员管理',
  //   meta: {
  //     label: 'member',
  //     title: 'member',
  //     icon: icon('document')
  //   },
  //   children: [
  //     { path: 'memberManager', icon: icon('document'), component: COM.MemberMgr, name: '会员列表', meta: { label: 'memberManager', icon: icon('document'), title: 'memberManager' } },
  //     { path: 'memberDetail/:memberId?', icon: icon('document'), component: COM.MemberDetail, name: '会员详情', meta: { label: 'memberDetail', icon: icon('document'), title: 'memberDetail' } },
  //     { path: 'memberExport', icon: icon('document'), component: COM.MemberExport, name: '会员导出进度查询', meta: { label: 'memberExport', icon: icon('document'), title: 'memberExport' } }
  //   ]
  // },
  /** 基础管理 */
  // {
  //   path: '/basic',
  //   component: COM.Layout,
  //   redirect: 'noredirect',
  //   name: '基础资料',
  //   meta: {
  //     label: 'basic',
  //     title: 'basic',
  //     icon: icon('document')
  //   },
  //   children: [
  //     { path: 'dictionaryManager', icon: icon('document'), component: COM.DictionaryMgr, name: '数据字典', meta: { label: 'dictionaryManager', icon: icon('document'), title: 'dictionaryManager' } }
  //   ]
  // },
  /** 系统管理 */
  // {
  //   path: '/system',
  //   component: COM.Layout,
  //   redirect: 'noredirect',
  //   name: '系统管理',
  //   meta: {
  //     label: 'system',
  //     title: 'system',
  //     icon: icon('document')
  //   },
  //   children: [
  //     // 删除帐套模块->2018.02.07-by lazy/heluan
  //     { path: 'roleManager', icon: icon('document'), component: COM.RoleMgr, name: '角色管理', meta: { label: 'roleManager', icon: icon('document') } },
  //     { path: 'userManager', icon: icon('document'), component: COM.UserMgr, name: '用户管理', meta: { label: 'userManager', icon: icon('document') } },
  //     { path: 'userInfo/:userId?', icon: icon('document'), component: COM.UserInfo, name: '编辑用户', meta: { label: 'userInfo', icon: icon('document') } },
  //     { path: 'newUserInfo', icon: icon('document'), component: COM.UserInfo, name: '新增用户', meta: { label: 'userInfo', icon: icon('document') } },
  //     { path: 'deptManager', icon: icon('document'), component: COM.DepartmentMgr, name: '部门管理', meta: { label: 'deptManager', icon: icon('document') } },
  //     { path: 'menuManager', icon: icon('document'), component: COM.MenuMgr, name: '菜单管理', meta: { label: 'menuManager', title: 'menuManager' } }
  //   ]
  // },
  { path: '*', redirect: '/', meta: { hidden: true } }
];
export default routes;
