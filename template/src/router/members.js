/**
 * @Author: xuxl12
 * @Date:   2018-01-06 16:02:04
 * @Last Modified by: xuxl
 * @Last Modified time: 2018-05-01 14:32:08
 */
// eslint-disable
const userList = () => import('@/views/members/userMgr/userList');
const userDetail = () => import('@/views/members/userDetail/index');
const userGroup = () => import('@/views/members/userGroup/index');
const labelMgr = () => import('@/views/members/labelMgr/index');
const newLabel = () => import('@/views/members/labelMgr/newLabel');
export const member = [
  {
    path: 'userList',
    component: userList,
    name: 'userList'
  },
  {
    path: 'userDetail',
    component: userDetail,
    name: 'userDetail'
  },
  // 会员分组
  {
    path: 'userGroup',
    component: userGroup,
    name: 'userGroup'
  },
  // 标签管理
  {
    path: 'labelMgr',
    component: labelMgr,
    name: 'labelMgr'
  },
  // 新建标签
  {
    path: 'newLabel',
    component: newLabel,
    name: 'newLabel'
  }
];
