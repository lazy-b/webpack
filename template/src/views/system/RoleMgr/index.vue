<template>
  <div>
    <!-- <page-nav></page-nav> -->
    <div class="app-container">
    <div class="filter-container" v-if="true">
      <el-form label-width="80px">
        <el-row>
          <el-col :span="15" class="text-left">
            <el-button class="filter-item"   @click="handleCreate" type="primary" icon="el-icon-plus">新增</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <page-table
      ref="pageTable"
      border
      fit
      highlight-current-row
      show-number
      :params="listQuery"
      :data-fun="list">
      <el-table-column width="280px" align="center" label="角色名">
        <template slot-scope="scope">
          <span>\{{scope.row.roleName}}</span>
        </template>
      </el-table-column>
      <!--<el-table-column width="110px" align="center" label="角色类型">
        <template slot-scope="scope">
          <span>\{{scope.row.type | statusFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column width="110px" align="center" label="角色范围">
        <template slot-scope="scope">
          <span>\{{scope.row.scope | statusFilter}}</span>
        </template>
      </el-table-column>-->
      <el-table-column min-width="150px" align="center" show-overflow-tooltip label="备注">
        <template slot-scope="scope">
          <span>\{{scope.row.description}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="300" class-name="small-padding">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="editRole(scope.row)" style="margin-left: 0px;">编辑</el-button>
          <!-- <el-button type="text" size="mini" @click="assignAuth(scope.row)" style="margin-left: 0px;">分配权限</el-button> -->
          <el-button type="text" size="mini"  @click="deleteRole(scope.row)" style="margin-left: 0px;">删除</el-button>
          <!-- <el-button size="mini" type="text" @click="viewUsers(scope.row)" style="margin-left: 0px;">查看用户</el-button> -->
        </template>
      </el-table-column>
    </page-table>
    <!--<div class="text-center" style="color:#999999;font-size: 10px" v-if="list.length==0"><span>暂无数据</span></div>-->
    <role-add ref="roleAdd" @done="handleFilter"></role-add>
    <role-edit ref="roleEdit" @done="handleFilter"></role-edit>
    <!-- <role-auth ref="roleAuth"></role-auth>
    <role-users ref="roleUsers"></role-users> -->
    </div>
  </div>
</template>

<script>
  import { role } from '@/api';
  import roleAdd from './RoleAdd'; // 新增
  import roleEdit from './RoleEdit'; // 编辑
  // import roleAuth from './RoleAuth'; // 授权
  // import roleUsers from './RoleUsers'; // 查看用户
// import { parseTime } from '@/utils';

  export default {
    components: {
      roleAdd,
      roleEdit
      // roleAuth,
      // roleUsers
    },
    data() {
      return {
        list: role.fetchList,
        listQuery: {}
      };
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          b: '帐套角色',
          P: '共有角色',
          m: '跨帐套角色',
          s: '系统角色',
          p: '平台角色'
        };
        return statusMap[status];
      }
    },
    methods: {
      handleFilter() {
        this.$refs.pageTable.reload(this.listQuery);
      },
      reload() {
        this.$refs.pageTable.reload();
      },
      handleCreate() {
        this.$refs.roleAdd.show();
      },
      editRole(row) {
        this.$refs.roleEdit.show(row);
      },
      deleteRole(row) {
        if (row.roleId) {
          this.$confirm('您确定要删除该角色吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            closeOnClickModal: false
          }).then(() => {
            role.deleteRole({roleId: row.roleId}).then(response => {
              if (response.data.code === 0) {
                this.$message({
                  message: '删除成功',
                  type: 'success',
                  duration: 2000
                });
                this.handleFilter();
              }
            });
          });
        }
      },
      assignAuth(row) {
        this.$refs.roleAuth.show(row);
      },
      viewUsers(row) {
        this.$refs.roleUsers.show(row.roleId, 'role');
      }
    }
  };
</script>
