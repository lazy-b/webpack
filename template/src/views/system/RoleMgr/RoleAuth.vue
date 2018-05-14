<template>
  <el-dialog title="角色授权" :visible.sync="dialogFormVisible" top="8vh" :close-on-click-modal='false'>
    <el-form ref="dataForm" :model="dataForm"  label-width="80px" style='width: 400px; margin-left:50px;overflow: auto'>
      <el-form-item>
        <el-tree
          class="filter-tree"
          :show-checkbox="true"
          node-key="id"
          :data="menuDatas"
          :check-strictly="true"
          :props="defaultProps"
          :defaultExpandAll="false"
          :filter-node-method="filterNode"
          :default-checked-keys = "checkedKeys"
          ref="tree"></el-tree>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer text-center">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="authRole">提 交</el-button>
    </div>
  </el-dialog>
</template>
<script>
  import {role} from '@/api';
  export default {
    data() {
      return {
        dialogFormVisible: false,
        menuDatas: [],
        checkedKeys: [],
        roleId: '',
        dataForm: {},
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        menus: []
      };
    },
    methods: {
      show(params) {
        role.getMenuTreeByRoleId(params.roleId).then(response => {
          this.checkedKeys = this.getCheckedIds(response.data.data.children);
          this.menuDatas = response.data.data.children;
          this.menus = this.genArray(this.menuDatas);// 把树转换成数组
        });
        this.roleId = params.roleId; // 给角色ID赋值
        this.dialogFormVisible = true;
      },
      getCheckedIds(nodes) {
        let checkedNodesIds = [];
        nodes.forEach(item => {
          if (item.state.selected) {
            checkedNodesIds.push(item.id);
          }
          if (item.children && item.children.length > 0) {
            checkedNodesIds = [...checkedNodesIds, ...this.getCheckedIds(item.children)];
          }
        });
        return checkedNodesIds;
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      genArray(nodes) {
        let menus = [];
        nodes.forEach(item => {
          menus.push(item);
          if (item.children && item.children.length > 0) {
            menus = [...menus, ...this.genArray(item.children)];
          }
        });
        return menus;
      },
      findParentId(ids, currentId) { // 递归查找父亲并放入数组
        if (!ids.includes(Number(currentId))) {
          let node = this.menus.find(item => {
            /* eslint-disable eqeqeq */
            return item.id == currentId;
          });
          ids.push(Number(currentId));
          if (node.hasParent) {
            this.findParentId(ids, node.parentId);
          }
        }
      },
      authRole() {
        let nodes = this.$refs['tree'].getCheckedNodes();
        let menuIds = [];
        nodes.forEach(item => {
          menuIds.push(Number(item.id));
          if (item.hasParent) {
            this.findParentId(menuIds, item.parentId);
          }
        });
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            role.saveRoleMenu({menuIdList: menuIds, roleId: this.roleId}).then(response => {
              if (response.data.code === 0) {
                this.$message({
                  message: response.data.msg,
                  type: 'success',
                  duration: 2000
                });
                this.dialogFormVisible = false;
              } else {
                this.$message({
                  message: response.data.msg,
                  type: 'warning'
                });
              }
            });
          }
        });
      }
    }
  };
</script>
