/*
* @Author: lazy1993
* @Date:   2017-12-26 15:52:19
 * @Last Modified by: LuoJW
 * @Last Modified time: 2018-04-20 02:35:42
*/

/** 请求路径 */

/** dictionarySelects */
// 公共组件-数据字典
export const DICT_SELECT_LIST = '/common/sysDict/listByType';

/** 公共接口 */
// 渠道列表
export const CHANNEL_LIST = '/basic/common/listChannel';
// 代理商列表
export const AGENT_LIST = '/basic/common/listAgent';
// 大区列表
export const REGION_LIST = '/basic/region/regionList';
// 省列表
export const PROVINCE_LIST = '/basic/region/provinceList';
// 市列表
export const CITY_LIST = '/basic/region/cityList/';
// 区列表
export const COUNTY_LIST = '/basic/region/countyList/';
// 获取根据类型地区列表
export const AREA_LIST = '/basic/area/list';
// 获取子级地区列表
export const AREA_DETAIL_LIST = '/basic/area/';

/** user */
// 查询用户列表
export const USER_LIST = '/system/user/list';
// 保存用户
export const USER_SAVE = '/system/user/save';
// 修改用户
export const USER_UPDATE = '/system/user/update';
// 查询用户已分配角色
export const USER_GET_ROLES = '/system/role/listRoleBySetsOfBooksIdAndUserId';
// 设置用户角色
export const USER_EDIT_ROLE = '/system/userRole/saveUserAndRole';
// 删除用户
export const USER_REMOVE = '/system/user';
// 重置密码
export const USER_UPDATE_PASSWORD = '/system/user/changePassword';
// 用户登录
export const USER_LOGIN = '/login';
// 用户注销
export const USER_LOGOUT = '/logout';
// 根据用户id获取用户信息
export const USER_GET_INFO_BY_ID = '/system/user/getById';
// 用户登录
export const USER_GET_USER_INFO = '/getCurrentSession';
// 获取用户菜单
export const USER_GET_MENU = '/getCurrentUserMenu';
// 查询用户已分配的部门数据权限
export const USER_GET_USER_PERMISSION_DEPT = '/system/deptctrl/listDeptctrlBySetsOfBooksIdAndUserId';
// 设置用户部门数据权限
export const USER_SET_USER_PERMISSION_DEPT = '/system/deptctrl/saveUserAndDeptctrl';

/** dept */
// 获取部门列表数据
export const DEPARTMENT_LIST = '/system/department/list';
// 获取部门数据（树形结构
export const DEPARTMENT_TREE = '/system/department/listTree';
// 保存
export const DEPARTMENT_SAVE = '/system/department/save';
// 编辑
export const DEPARTMENT_EDIT = '/system/department/update';
// 删除
export const DEPARTMENT_DELETE = '/system/department';

/** dictionary */
// 获取键列表
export const DICTIONARY_KEY_LIST = '/system/dictKey/list';
// 修改字典键
export const DICTIONARY_KEY_UPDATE = '/system/dictKey/update';
// 获取值列表
export const DICTIONARY_VALUE_LIST = '/system/dictValue/';
// 修改字典值
export const DICTIONARY_VALUE_UPDATE = '/system/dictValue/update';

/* role */
// 获取列表
export const ROLE_LIST = '/system/role/list';
// 新增
export const ROLE_ADD = '/system/role/save';
// 编辑
export const ROLE_EDIT = '/system/role/update';
// 详情
export const ROLE_DETAIL = '/system/role/';

// menu
// 获取菜单树
export const MENU_TREE = '/system/menu/tree';
// 获取菜单列表(数)
export const MENU_LIST = '/system/menu/listTree';
// 新增
export const MENU_ADD = '/system/menu/save';
// 编辑
export const MENU_EDIT = '/system/menu/update';
// 删除
export const MENU_DELETE = '/system/menu';

/* 基础管理 */
// 首页展示
export const BASIC_HOME = '/vip/member/index';

/* 会员管理 */
// 会员列表
export const VIP_MEMBER_LIST = '/vip/member/list';
// 会员列表导出
export const VIP_MEMBER_EXPORT = '/vip/member/export';
// 会员地址列表
export const VIP_MEMBER_ADDRESS_LIST = '/vip/memberAddress/getAddressByMemberId/';
// 会员总数
export const VIP_MEMBER_TOTAL = '/vip/member/total';
// 会员扫码记录
export const VIP_MEMBER_SCAN_LIST = '/vip/scanRecord/list';
// 会员等级列表
export const VIP_MEMBER_LEVEL_LIST = '/vip/level/list';
// 修改会员信息
export const VIP_MEMBER_UPDATE = '/vip/member/update';
// 昨日新增会员
export const VIP_MEMBER_YESTERDAY = '/vip/member/newMemberYesterday';
// 索引会员
export const VIP_MEMBER_DETAIL = '/vip/member/getById/';
// 获取会员信息导出状态列表
export const VIP_MEMBER_EXPORT_LIST = '/vip/member/exportList';
// 近12个月会员增值趋势
export const VIP_MEMBER_YEAR = '/vip/member/newMemberOneYear';
// 扫码明细列表
export const VIP_SCAN_LIST = '/vip/scanRecord/list';
