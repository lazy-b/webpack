import request from '../fetch';
import { ROLE_LIST, ROLE_ADD, ROLE_EDIT } from '../url/url';

function fetchList(query) { // 列表
  return request({
    url: ROLE_LIST,
    method: 'get',
    params: query
  });
}
function addRole(form) { // 新增
  return request({
    url: ROLE_ADD,
    method: 'post',
    data: form
  });
}

function editRole(form) { // 编辑
  return request({
    url: ROLE_EDIT,
    method: 'post',
    data: form
  });
}

function deleteRole(params) { // 删除
  return request({
    url: '/system/role/' + params.roleId,
    method: 'delete'
  });
}

function detailRole(params) { // 详情
  return request({
    url: '/system/role/' + params,
    method: 'get'
  });
}

function getMenuTreeByRoleId(roleId) { // 查询角色菜单树
  return request({
    url: '/system/role/getMenuByRoleId/' + roleId,
    method: 'get'
  });
}

function saveRoleMenu(data) {
  return request({
    url: '/system/roleMenu/saveRoleMenu',
    method: 'post',
    data
  });
}

function getUserListByRoleId(params) { // 查询角色下用户列表
  return request({
    url: '/sys/user/listUserByRoleId/' + params.id,
    method: 'get',
    params
  });
}

const role = {
  fetchList,
  addRole,
  editRole,
  deleteRole,
  detailRole,
  getMenuTreeByRoleId,
  saveRoleMenu,
  getUserListByRoleId
};

export { role };
