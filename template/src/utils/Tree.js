/*
* @Author: lazy1993
* @Date:   2018-01-23
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-02-08 10:12:46
*/
const getType = function getType(arg) {
  const classString = Object.prototype.toString.call(arg);
  return classString.substring(8, classString.length - 1);
};

// 混合模式
const Tree = function Tree(params) {
  // 防止不加new初始化...
  if (!(this instanceof Tree)) {
    return new Tree(params);
  }

  const tree = params.tree || [];
  const treeList = getType(tree) === 'Array' ? tree : [tree];

  // 深复制
  this.tree = JSON.parse(JSON.stringify(treeList));
  this.key = params.key || 'id';
  this.children = params.children || 'children';

  this.init();
};

// 初始化
Tree.prototype.init = function init() {
  this.getTreeMap();
};

// 获得扁平结构的可索引的树映射
Tree.prototype.getTreeMap = function getTreeMap() {
  const source = this.tree;
  const key = this.key;
  const children = this.children;

  // 获得树的“节点id-节点”映射表
  // 同时添加一个字段指向父级
  const getMap = function getMap(tree, key, children, map = {}) {
    tree.forEach(item => {
      // 添加字段
      if (!item.parents) {
        item.parents = [];
      }

      map[item[key]] = item;

      const _children = item[children];

      // 递归
      if (_children && _children.length > 0) {
        // 指向父级
        _children.forEach(_item => {
          if (!_item.parents) {
            _item.parents = [];
          }

          // 添加父级id
          _item.parents.push(item[key]);
          _item.parents = item.parents.concat(_item.parents);
        });

        getMap(_children, key, children, map);
      }
    });

    return map;
  };

  this.treeMap = getMap(source, key, children);
};

// 获得指定节点的父节点数组:[最上级, ...., 上级]
Tree.prototype.getParents = function getParents(node) {
  const treeMap = this.treeMap;
  const key = this.key;

  // 获得该节点对应的格式化之后的节点
  const treeNode = treeMap[node[key]];
  // 获得该节点的父节点key值数组
  const parentIds = treeNode.parents;
  const parents = [];

  parentIds.forEach(item => {
    parents.push(treeMap[item]);
  });

  return parents;
};

// 获得指定节点在树中的位置关系:[最上级, ...., 上级, 本身]
Tree.prototype.getLocation = function getLocation(node) {
  return this.getParents(node).concat(node);
};

export default Tree;
