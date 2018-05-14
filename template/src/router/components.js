/*
* @Author: yang
* @Date:   2018-01-06 16:02:04
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-05-09 11:32:31
*/

/** 集中加载页面组件（懒加载方式） */
/** 通用页面组件 */
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
export const Login = () => import('@/views/login');
// authredirect
// export const Authredirect = () => import("@/views/Login/authredirect");
// 401
export const ErrorPage1 = () => import('@/views/errorPage/401');
// 404
export const ErrorPage2 = () => import('@/views/errorPage/404');
// 主页
export const Home = () => import('@/views/home');

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

/** 会员服务 */
// 会员等级列表
export const MemberLevelList = () => import('@/views/memberServices/MemberLevel/LevelList');
// 会员等级管理（新建/编辑）
export const MemberLevelMgr = () => import('@/views/memberServices/MemberLevel/LevelList/MemberLevelMgr');
// 成长值规则列表
export const MemberRuleList = () => import('@/views/memberServices/MemberLevel/RuleList');
// 成长值规则管理
export const MemberRuleMgr = () => import('@/views/memberServices/MemberLevel/RuleList/MemberRuleMgr');
// 积分规则列表
export const PointRuleList = () => import('@/views/memberServices/MemberPoint/PointRule');
// 积分规则管理
export const GetPointRuleMgr = () => import('@/views/memberServices/MemberPoint/PointRule/GetPointRuleMgr');
// 积分兑换列表
export const PointExchangeList = () => import('@/views/memberServices/MemberPoint/PointExchange');
// 积分兑换规则管理
export const PointExchangeRuleMgr = () => import('@/views/memberServices/MemberPoint/PointExchange/PointExchangeRuleMgr');
// 积分消耗规则管理（其实是过期时间管理）
export const ExpirePointRuleMgr = () => import('@/views/memberServices/MemberPoint/PointRule/ExpirePointRuleMgr');

/** 会员管理 */
// 会员列表
export const userList = () => import('@/views/memberMgr/MemberList/index');
// 会员分组
export const userGroup = () => import('@/views/members/userGroup/index');
// 会员详情
export const userDetail = () => import('@/views/members/userDetail/index');
// 会员标签
export const labelMgr = () => import('@/views/members/labelMgr/index');
// 新建标签
export const newLabel = () => import('@/views/members/labelMgr/newLabel');

/** 营销中心 */
/** 营销工具 */
// 短信
export const smsMgr = () => import('@/views/marketingCenter/marketingTool/smsMgr/index');
// 新建点对点短信
export const editSmsBatch = () => import('@/views/marketingCenter/marketingTool/smsMgr/editSmsBatch');
// 新建批量短信_本地上传
export const editSmsP2P = () => import('@/views/marketingCenter/marketingTool/smsMgr/editSmsP2P');
// 短链
export const shortLink = () => import('@/views/marketingCenter/marketingTool/shortLink/index');
