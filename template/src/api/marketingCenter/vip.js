import request from '../../api/fetch';
import * as API from './url';

function vipDetail(query) {
  // 会员详情
  return request({
    url: API.vipDetail,
    method: 'get',
    params: query
  });
}
function transactionList(query) {
  // 会员交易信息
  return request({
    url: API.transactionList,
    method: 'get',
    params: query
  });
}
function pointList(query) {
  // 会员积分记录
  return request({
    url: API.pointList,
    method: 'get',
    params: query
  });
}
function couponList(query) {
  // 会员券信息
  return request({
    url: API.couponList,
    method: 'get',
    params: query
  });
}
function listMemberTag(query) {
  // 标签列表
  return request({
    url: API.listMemberTag,
    method: 'get',
    params: query
  });
}
function memberUpdate(data) {
  // 编辑标签
  return request({
    url: API.memberUpdate,
    method: 'post',
    data: data
  });
}
function memberSave(data) {
  // 新增标签
  return request({
    url: API.memberSave,
    method: 'post',
    data: data
  });
}
function memberDelete(data) {
  // 删除标签
  return request({
    url: API.memberDelete,
    method: 'post',
    data: data
  });
}
function groupUpdate(data) {
  // 修改分组
  return request({
    url: API.groupUpdate,
    method: 'post',
    data: data
  });
}
function groupList(data) {
  // 分组列表
  return request({
    url: API.groupList,
    method: 'get',
    data: data
  });
}
function groupDelete(data) {
  // 删除分组
  return request({
    url: API.groupDelete,
    method: 'post',
    data: data
  });
}
function groupSave(data) {
  // 新增分组
  return request({
    url: API.groupSave,
    method: 'put',
    data: data
  });
}
const vip = {
  vipDetail,
  couponList,
  pointList,
  transactionList,
  listMemberTag,
  memberUpdate,
  memberDelete,
  memberSave,
  groupUpdate,
  groupList,
  groupDelete,
  groupSave

};
export { vip };
