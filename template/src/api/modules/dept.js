import request from '../fetch';
import { DEPARTMENT_TREE, DEPARTMENT_SAVE, DEPARTMENT_EDIT, DEPARTMENT_DELETE, DEPARTMENT_LIST } from '../url/url';

function getDeptTree(query) {
  return request({
    url: DEPARTMENT_TREE,
    method: 'get',
    params: query
  });
}

function getDeptList() {
  return request({
    url: DEPARTMENT_LIST,
    method: 'get'
  });
}

function addDept(form) {
  return request({
    url: DEPARTMENT_SAVE,
    method: 'post',
    data: form
  });
}

function editDept(form) {
  return request({
    url: DEPARTMENT_EDIT,
    method: 'post',
    data: form
  });
}

function deleteDept(params) {
  return request({
    url: DEPARTMENT_DELETE + '/' + params.departmentId + '?cascade=' + params.cascade,
    method: 'delete'
  });
}

function getDeptUsers(params) {
  return request({
    url: '/sys/user/listUserByDeptId/' + params.id,
    method: 'get',
    params
  });
}

const dept = {
  getDeptTree,
  getDeptList,
  addDept,
  editDept,
  deleteDept,
  getDeptUsers
};

export { dept };
