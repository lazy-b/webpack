/*
* @Author: lazy1993
* @Date:   2017-12-27 17:10:55
* @Last Modified by:   XIONGYANG
* @Last Modified time: 2018-01-23 11:14:34
*/
// 和树有关的操作辅助函数

// 递归得到树结构中指定节点的父节点数组
export const findParents = function findParents(node, treeList) {
  // 获得树的“节点id-节点”映射表
  const getTreeObj = function getTreeObj(treeList, obj = {}) {
    treeList.forEach(item => {
      obj[item.id] = item;

      // 递归
      if (item.hasChildren) {
        getTreeObj(item.children, obj);
      }
    });

    return obj;
  };

  // 根据映射表获得目标节点的父节点集数组
  const findParentNodes = function findParentNodes(node, nodeMap, arr = []) {
    // 后端逻辑有问题，前端先做处理保证页面正常
    // if (node.hasParent) {
    //   arr.push(nodeMap[node.parentId]);

    //   findParentNodes(nodeMap[node.parentId], nodeMap, arr);
    // }

    if (node.hasParent) {
      arr.push(nodeMap[node.parentId]);

      findParentNodes(nodeMap[node.parentId], nodeMap, arr);
    } else if (node.parentId === '0') {
      arr.push(nodeMap['-1']);
    }

    return arr;
  };

  const nodeMap = getTreeObj(treeList);
  const parents = findParentNodes(node, nodeMap);
  return parents;
};

// 递归得到树结构中指定节点的被选中父节点数组
export const findCheckedParents = function findCheckedParents(node, treeList, selectedList) {
  // 获得树的“节点id-节点”映射表
  const getTreeObj = function getTreeObj(treeList, obj = {}) {
    treeList.forEach(item => {
      obj[item.id] = item;

      // 递归
      if (item.hasChildren) {
        getTreeObj(item.children, obj);
      }
    });

    return obj;
  };

  // 根据映射表获得目标节点的父节点集数组
  const findParentNodes = function findParentNodes(node, nodeMap, selectedList, arr = []) {
    // 后端逻辑有问题，前端先做处理保证页面正常
    // if (node.hasParent) {
    //   const parentId = node.parentId;
    //   const parentNode = nodeMap[parentId];

    //   if (selectedList.indexOf(parentId) !== -1) {
    //     arr.push(parentNode);
    //   }

    //   findParentNodes(parentNode, nodeMap, selectedList, arr);
    // }

    if (node.hasParent) {
      const parentId = node.parentId;
      const parentNode = nodeMap[parentId];

      if (selectedList.indexOf(parentId) !== -1) {
        arr.push(parentNode);
      }

      findParentNodes(parentNode, nodeMap, selectedList, arr);
    } else if (node.parentId === '0') {
      if (selectedList.indexOf('-1') !== -1) {
        arr.push(nodeMap['-1']);
      }
    }

    return arr;
  };

  const nodeMap = getTreeObj(treeList);
  const parents = findParentNodes(node, nodeMap, selectedList);
  return parents;
};

// 递归得到树结构中指定节点的被选中子节点数组
export const findCheckedChildren = function findCheckedChildren(node, selectedList, arr = []) {
  if (node.hasChildren) {
    const children = node.children;

    children.forEach(item => {
      if (selectedList.indexOf(item.id) !== -1) {
        arr.push(item);
      }

      findCheckedChildren(item, selectedList, arr);
    });
  }

  return arr;
};
