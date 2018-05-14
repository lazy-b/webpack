<template>
  <el-dialog title="查看用户" :visible.sync="dialogFormVisible" top="1vh" width="90%" :close-on-click-modal='false'>
    <div class="filter-container">
      <el-form label-width="80px">
        <el-row>
          <el-col :span="5">
            <el-form-item label="用户名称">
              <el-input  placeholder="请输入用户名称" v-model="listQuery.userName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6" class="text-left" :offset="1">
            <el-button class="filter-item" icon="el-icon-search" @click="handleFilter">查询</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div style="overflow: auto">
      <page-table
        ref="pageTable"
        height="400"
        :data-fun="list"
        border
        show-number
        fit
        highlight-current-row
        :params="listQuery">
        <el-table-column min-width="180px" align="center" show-overflow-tooltip label="登录名">
          <template slot-scope="scope">
            <span>\{{scope.row.username}}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="180px" align="center" show-overflow-tooltip label="员工编号">
          <template slot-scope="scope">
            <span>\{{scope.row.employeeNumber}}</span>
          </template>
        </el-table-column>
        <el-table-column width="180px" align="center" label="真实姓名">
          <template slot-scope="scope">
            <span>\{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column width="180px" align="center" label="身份证号">
          <template slot-scope="scope">
            <span>\{{scope.row.idCardno}}</span>
          </template>
        </el-table-column>
        <el-table-column width="180px" align="center" label="性别">
          <template slot-scope="scope">
            <span>\{{scope.row.sex | statusFilter}}</span>
          </template>
        </el-table-column>
        <el-table-column width="150px" align="center" label="邮箱">
          <template slot-scope="scope">
            <span>\{{scope.row.email}}</span>
          </template>
        </el-table-column>
      </page-table>
    </div>
  </el-dialog>
</template>
<script>
  import { role, dept } from '@/api';
  export default {
    data() {
      return {
        source: '', // 来源
        dialogFormVisible: false,
        list: null,
        listQuery: {
          userName: '',
          query: {
            name: ''
          },
          id: '',
        }
      };
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          M: '男',
          F: '女'
        };
        return statusMap[status];
      }
    },
    methods: {
      show(id, source) {
        if (id) {
          this.listQuery.userName = '';
          this.listQuery.pageIndex = 0;
          this.listQuery.pageSize = 20;
          this.listQuery.id = id;
          this.source = source;
          this.dialogFormVisible = true;
          this.getList();
        }
      },
      getList() {
        if (this.source === 'role') {
          this.list = role.getUserListByRoleId;
        } else {
          this.list = dept.getDeptUsers;
        }
        this.$refs.pageTable.reload(this.listQuery);
      },
      handleFilter() {
        this.listQuery.query.name = encodeURI(this.listQuery.userName);
        this.$refs.pageTable.reload(this.listQuery);
      }
    }
  };
</script>
