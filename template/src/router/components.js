/*
* @Author: yang
* @Date:   2018-01-06 16:02:04
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-05-14 19:36:30
*/

/** 集中加载页面组件（懒加载方式） */
/** 通用页面组件 */
/* eslint-disable */
// 一级布局
export const Layout = () => import('@/views/Layout');
// 头部区（logo、一级菜单）
export const NavHeader = () => import('@/views/Layout/NavHeader');
// 首页专用布局页面
export const HomeLayout = () => import('@/views/Layout/HomeLayout');
// 二级菜单
export const SecondMenu = () => import('@/views/Layout/SecondMenu');
// 页面标题
export const BodyHeader = () => import('@/views/Layout/BodyHeader');
// 二级布局
// export const AppMain = () => import('@/views/Layout/AppMain');
// 登录
export const Login = () => import('@/views/Login');
// 主页
export const Home = () => import('@/views/Home');

/** 专有页面组件 */
/** 会员管理 */
// export const MemberMgr = () => import('@/views/memberMgr/MemberMgr');
// /** 会员详情 */
// export const MemberDetail = () => import('@/views/memberMgr/MemberDetail');
// /** 会员导出进度查询 */
// export const MemberExport = () => import('@/views/memberMgr/MemberExport');
/** 基础管理 */
// 字典管理
export const DictionaryMgr = () => import('@/views/basic/DictionaryMgr');

/** 系统管理 */
// 角色管理
export const RoleMgr = () => import('@/views/system/RoleMgr');
// 用户管理
export const UserMgr = () => import('@/views/system/UserMgr');
// 新建-编辑用户
export const UserInfo = () => import('@/views/system/UserMgr/UserInfo');
// 部门管理
export const DepartmentMgr = () => import('@/views/system/DepartmentMgr');
// 菜单管理
export const MenuMgr = () => import('@/views/system/MenuMgr');
