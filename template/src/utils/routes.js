/*
* @Author: yang
* @Date:   2018-01-06 20:18:30
* @Last Modified by:   lazy1993
* @Last Modified time: 2018-01-08 20:54:53
*/

// 获得菜单路由（已不再需要该方法-》2018.01.07）
export const getMenuRoutes = function getMenuRoutes(routes) {
  const result = [];

  routes.forEach(item => {
    if (!item.meta.hidden) {
      result.push(item);

      if (item.children && item.children.length > 0) {
        item.children = getMenuRoutes(item.children);
      }
    }
  });

  return result;
};

// 递归将后端返回的菜单格式化成前端需要的菜单格式
export const convert = function convertMenuArrToRoutes(menuArr) {
  const result = [];

  // 迭代每一项，将需要的数据取出并存入结果集中
  menuArr.forEach(item => {
    const obj = {};

    obj.path = item.url;
    // 如果存在name字段，必须是再router中注册过的值，否则vue-router报错
    // obj.name = item.name;
    obj.meta = {
      label: item.name,
      icon: item.icon
    };

    if (item.childMenuList && item.childMenuList.length > 0) {
      obj.children = convertMenuArrToRoutes(item.childMenuList);
    }

    result.push(obj);

  });
  return result;
};
