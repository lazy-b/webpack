/*
* @Author: lazy1993
* @Date:   2017-12-26 15:52:19
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-05-10 10:18:05
*/
/** 请求路径 */

/** memberServices */
/** 基础数据 */
// 获取渠道列表
export const MEMBER_BASIC_CHANNEL_LIST = '/vip/basic/channelList';
// 获取成长值规则类型列表
export const MEMBER_BASIC_GROW_RULE_LIST = '/vip/basic/growRuleTypeList';
// 获取积分规则类型列表
export const MEMBER_BASIC_POINT_RULE_LIST = '/vip/basic/pointRuleTypeList';

/** 会员等级 */
// 会员等级列表
export const MEMBER_LEVEL_LIST = '/vip/level/list';
// 根据渠道获取会员等级列表
export const MEMBER_LEVEL_LIST_BY_CHANNEL = '/vip/level/listByChannelId';
// 新建会员等级信息
export const MEMBER_NEW_LEVEL = '/vip/level';
// 编辑会员等级信息
export const MEMBER_UPDATE_LEVEL = '/vip/level';
// 会员矩阵列表 - 各渠道会员等级列表
export const MEMBER_MATRIX_LEVEL_LIST = '/vip/level/list';
// 会员等级矩阵信息
export const MEMBER_LEVEL_MATRIX_INFO = '/vip/level/listMatrix';

/** 成长值规则 */
// 成长值规则列表
export const MEMBER_GROW_RULE_LIST = '/vip/growRule/list';
// 索引成长值规则
export const MEMBER_GROW_RULE_BY_ID = '/vip/growRule';
// 新增成长值规则
export const MEMBER_NEW_GROW_RULE = '/vip/growRule';
// 编辑成长值规则
export const MEMBER_UPDATE_GROW_RULE = '/vip/growRule';
// 删除成长值规则
export const MEMBER_DELETE_GROW_RULE = '/vip/growRule';
// 启用/停用成长值规则
export const MEMBER_TOGGLE_GROW_RULE = '/vip/growRule/toggle';

/** 会员积分 */
// 会员积分规则列表
export const MEMBER_POINT_RULE_LIST = '/vip/pointRule/list';
// 新增会员积分规则
export const MEMBER_NEW_POINT_RULE = '/vip/pointRule';
// 编辑会员积分规则
export const MEMBER_UPDATE_POINT_RULE = '/vip/pointRule';
// 删除积分值规则
export const MEMBER_DELETE_POINT_RULE = '/vip/pointRule';
// 索引会员积分规则
export const MEMBER_POINT_RULE_BY_TYPE = '/vip/pointRule';
// 启用/停用积分值规则
export const MEMBER_TOGGLE_POINT_RULE = '/vip/pointRule/toggle';
// 积分兑换列表
export const MEMBER_POINT_EXCHANGE_RULE_LIST = '/vip/pointExchangeRule/list';
// 索引积分兑换规则
export const MEMBER_POINT_EXCHANGE_RULE_BY_ID = '/vip/pointExchangeRule';
// 新增积分兑换规则
export const MEMBER_NEW_POINT_EXCHANGE_RULE = '/vip/pointExchangeRule';
// 修改积分兑换规则
export const MEMBER_UPDATE_POINT_EXCHANGE_RULE = '/vip/pointExchangeRule';
// 删除积分兑换规则
export const MEMBER_DELETE_POINT_EXCHANGE_RULE = '/vip/pointExchangeRule';
// 启用/禁用积分兑换规则
export const MEMBER_TOGGLE_POINT_EXCHANGE_RULE = '/vip/pointExchangeRule/toggle';
// 积分矩阵列表
export const MEMBER_POINT_MATRIX_LIST = '/vip/pointMatrix/list';
// 索引积分矩阵信息
export const MEMBER_POINT_MATRIX_LIST_BY_ID = '/vip/pointMatrix';
// 新建积分矩阵信息
export const MEMBER_NEW_POINT_MATRIX_LIST = '/vip/pointMatrix';
// 编辑积分矩阵信息
export const MEMBER_UPDATE_POINT_MATRIX_LIST = '/vip/pointMatrix';
// 启用/禁用积分矩阵信息
export const MEMBER_TOGGLE_POINT_MATRIX_LIST = '/vip/pointMatrix/toggle';
// 获取积分有效期信息
export const MEMBER_POINT_EXPIRE_BY_ID = '/vip/pointMatrix';
// 修改积分有效期信息
export const MEMBER_UPDATE_POINT_EXPIRE = '/vip/pointMatrix';
