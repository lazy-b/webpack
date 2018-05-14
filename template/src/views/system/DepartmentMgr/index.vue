<template>
  <div>
    <!-- <page-nav></page-nav> -->
    <div  class="app-container">
    <div class="filter-container">
      <el-form label-width="80px">
        <el-row>
          <!--<el-col :span="8">
            <el-form-item label="部门名称">
              <el-input @keyup.enter.native="handleFilter"   placeholder="请输入部门名称" v-model="listQuery.name"></el-input>
            </el-form-item>
          </el-col>-->
          <el-col :span="16" class="text-left">
            <!--<el-button class="filter-item" icon="el-icon-search" @click="handleFilter">查询</el-button>-->
            <el-button class="filter-item"  @click="handleCreate" type="primary" icon="el-icon-plus">新增</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <tree-grid v-if="tableData.length > 0" :columns="columns" :tree-structure="true" :data-source="tableData" :defaultExpandAll="false" @reload="getDeptList">
      <template slot="_column" slot-scope="props">
        <!-- <span v-if="props.dataIndex === 'delFlag'">\{{props.column[props.dataIndex] == '1' ? '正常': '停用'}}</span> -->
        <span>\{{ props.column[props.dataIndex] || props.column.data[props.dataIndex] }}</span>
      </template>
      <el-table-column label="操作"  align="center" width="300" class-name="small-padding">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="editDept(scope.row)" >编辑</el-button>
          <el-button type="text" size="mini" @click="addChild(scope.row)" >增加下级</el-button>
          <el-button type="text" size="mini" @click="deleteDept(scope.row)">删除</el-button>
          <!-- <el-button type="text" size="mini" @click="viewUsers(scope.row)">查看用户</el-button> -->
        </template>
      </el-table-column>
    </tree-grid>
    <div class="text-center" style="color:#999999;font-size: 10px;" v-else><span>暂无数据</span></div>
    <dept-add ref="deptAdd" @done="getDeptList"></dept-add>
    <dept-edit ref="deptEdit" @done="getDeptList"></dept-edit>
    <dept-users ref="deptUsers"></dept-users>
    </div>
  </div>
</template>
<script>
  import deptAdd from './DeptAdd';
  import deptEdit from './DeptEdit';
  import deptUsers from '../RoleMgr/RoleUsers';
  import { dept } from '@/api';
  export default {
    components: {
      deptAdd,
      deptEdit,
      deptUsers
    },
    data() {
      return {
        listQuery: {
          name: ''
        },
        columns: [
          {
            label: '部门名称',
            dataIndex: 'label'
          },
          // {
          //   label: '编码',
          //   dataIndex: 'code'
          // },{
          //   label: '排序',
          //   dataIndex: 'orderNum'
          // },
          {
            label: '描述',
            dataIndex: 'description'
          }
        ],
        tableData: []
      };
    },
    methods: {
      handleFilter() {
        this.getDeptList();
      },
      handleCreate() {
        this.$refs.deptAdd.show();
      },
      editDept(row) {
        this.$refs.deptEdit.show(row);
      },
      addChild(row) {
        this.$refs.deptAdd.show(row);
      },
      viewUsers(row) {
        this.$refs.deptUsers.show(row.id, 'dept');
      },
      deleteDept(row) { // 按钮操作
        this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'error',
          closeOnClickModal: false
        }).then(() => {
          dept.deleteDept({cascade: true, departmentId: row.id}).then(response => {
            if (response.data.code === 0) {
              this.$message({
                message: response.data.msg,
                type: 'success'
              });
              this.$emit('reload');
              this.getDeptList();
            } else {
              this.$message({
                message: response.data.msg,
                type: 'warning'
              });
            }
          });
        });
      },
      // 获取部门数据
      getDeptList() {
        dept.getDeptTree().then(response => {
          this.tableData = response.data.data;
          // console.log(this.tableData)
        });
      }
    },
    created() {
      this.getDeptList();
    }
  };
</script>
