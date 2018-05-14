<template>
  <div>
    <page-nav></page-nav>
    <div class="app-container">
    <div class="filter-container">
      <el-form label-width="80px">
        <el-row>
          <el-col :span="15" class="text-left">
            <el-button class="filter-item"   @click="handleCreate" type="primary" icon="el-icon-plus">新增</el-button>
            <el-button class="filter-item" @click="batchDelete" type="danger" icon="el-icon-delete">批量删除</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <page-table
      ref="pageTable"
      border
      fit
      highlight-current-row
      show-check-box
      :params="listQuery"
      :data-fun="list"
      @selection-change="handleSelectionChange">
      <el-table-column width="180px" align="center" label="任务名称">
        <template slot-scope="scope">
          <span>\{{scope.row.jobName}}</span>
        </template>
      </el-table-column>
      <el-table-column width="110px" align="center" label="任务分组">
        <template slot-scope="scope">
          <span>\{{scope.row.jobGroup }}</span>
        </template>
      </el-table-column>
      <el-table-column width="200px" align="center" label="任务类">
        <template slot-scope="scope">
          <span>\{{scope.row.beanClass }}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="110px" align="center" show-overflow-tooltip label="cron表达式">
        <template slot-scope="scope">
          <span>\{{ scope.row.cronExpression }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="300" class-name="small-padding">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="changeJobStatus(scope.row.id,'stop')" v-if="scope.row.jobStatus ==='1'">关闭</el-button>
          <el-button type="text" size="mini" @click="changeJobStatus(scope.row.id,'start')" v-else>启用</el-button>
          <el-button type="text" size="mini" @click="editJob(scope.row)">编辑</el-button>
          <el-button type="text" size="mini"  @click="deleteJob(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </page-table>
    <job-add ref="jobAdd" @done="handleFilter"></job-add>
    <job-edit ref="jobEdit" @done="handleFilter"></job-edit>
    </div>
  </div>
</template>
<script>
  import { job } from '@/api';
  import jobAdd from './JobAdd';
  import jobEdit from './JobEdit';
  export default {
    components: {
      jobAdd,
      jobEdit
    },
    data() {
      return {
        list: job.getList,
        listQuery: {},
        multipleIds: []
      };
    },
    methods: {
      handleFilter() {
        this.$refs.pageTable.reload(this.listQuery);
      },
      handleCreate() {
        this.$refs.jobAdd.show();
      },
      batchDelete() {
        if (this.multipleIds.length > 0) {
          this.$confirm('您确定要批量删除选中任务吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            closeOnClickModal: false
          }).then(() => {
            job.deleteJob({ids: this.multipleIds}).then(response => {
              if (response.data.code === 0) {
                this.$message({
                  message: '删除成功',
                  type: 'success',
                  duration: 2000
                });
                this.$refs.pageTable.clearSelection();
                this.handleFilter();
              }
            });
          });
        } else {
          this.$alert('您尚未选择任务');
        }
      },
      changeJobStatus(id, cmd) {
        if (id) {
          let msgTip = cmd === 'stop' ? '您确定要关闭该任务吗？' : '您确定要开启该任务吗？';
          this.$confirm(msgTip, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            closeOnClickModal: false
          }).then(() => {
            job.changeJobStatus({id, cmd}).then(response => {
              if (response.data.code === 0) {
                this.$message({
                  message: response.data.msg,
                  type: 'success',
                  duration: 2000
                });
                this.handleFilter();
              }
            });
          });
        }
      },
      handleSelectionChange(val) {
        this.multipleIds = val.map((item) => {
          return item.id;
        });
      },
      editJob(row) {
        this.$refs.jobEdit.show(row);
      },
      deleteJob(row) {
        if (row.id) {
          this.$confirm('您确定要删除该任务吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
            closeOnClickModal: false
          }).then(() => {
            job.deleteJob({ids: [row.id]}).then(response => {
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
      }
    }
  };
</script>
