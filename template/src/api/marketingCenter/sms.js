import request from '../../api/fetch';
import * as API from './url';

function SmsList(query) {
  // 列表
  return request({
    url: API.getEvents,
    method: 'get',
    params: query
  });
}
function doDel(query) {
  // 删除短信
  return request({
    url: API.delEvent,
    method: 'get',
    params: query
  });
}
function getOrgInfo(query) {
  // 获取主题信息
  return request({
    url: API.getOrgMsg,
    method: 'get',
    params: query
  });
}
function getUserForBatch(query) {
  // 从大数据获取发送目标用户文件
  return request({
    url: API.getUserForBatch,
    method: 'post',
    params: query
  });
}

const sms = {
  SmsList,
  doDel,
  getOrgInfo,
  getUserForBatch
};
export { sms };
