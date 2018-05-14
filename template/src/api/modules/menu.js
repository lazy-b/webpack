import request from '../fetch';
import {MENU_TREE, MENU_ADD, MENU_EDIT, MENU_DELETE, MENU_LIST} from '../url/url';

function getMenuTree(query) {
  return request({
    url: MENU_TREE,
    method: 'get',
    params: query
  });
}

function getMenuList() {
  return request({
    url: MENU_LIST,
    method: 'get'
  });
}

function addMenu(form) {
  return request({
    url: MENU_ADD,
    method: 'post',
    data: form
  });
}

function editMenu(form) {
  return request({
    url: MENU_EDIT,
    method: 'post',
    data: form
  });
}
function addSubMenu(form) {
  return request({
    url: '/system/menu/edit/' + form.parentId,
    method: 'get',
    params: form
  });
}

function deleteMenu(data) {
  return request({
    url: MENU_DELETE + '/' + data.menuId,
    method: 'delete',
    data
  });
}
const menu = {
  getMenuTree,
  addMenu,
  editMenu,
  addSubMenu,
  deleteMenu,
  getMenuList
};

export {menu};
