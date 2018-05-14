<template>
  <div class="container">

    <!-- 表格数据 -->
    <div class="ms-text-center">
      <el-table :data="tableData" style="width: 100%" size='small'>
        <el-table-column prop="groupName" label="分组名称" width="180">
        </el-table-column>
        <el-table-column prop="groupTotal" label="人数" width="180">
        </el-table-column>
        <el-table-column label="创建者">
          <template slot-scope="scope">
            <span>\{{scope.row.ownerName}} - \{{scope.row.ownerRoleName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="updateTime" label="最新修改时间">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- <el-button type="text" size="small">创建活动</el-button>
            <el-button type="text" size="small">编辑</el-button> -->
            <el-button @click='openDelete(scope.row)' type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="ms-footer_pagination">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 50]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="40">
        </el-pagination>
      </div>
    </div>
    <!-- 删除弹出框 -->
    <el-dialog title="提示" :visible.sync="deleteDialog" width="30%" center>
      <div class="ms-text-center">
        <span>确认删除#\{{rowData.groupName}}#</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="deleteDialog = false">取 消</el-button>
        <el-button size="small" @click="delGroup" type="primary">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 删除弹出框 -->
  </div>
</template>

<script>
import { vip } from '@/api/marketingCenter/vip'
export default {
  props: {
    name: ''
  },
  data() {
    return {
      user: '',
      rowData: {},
      deleteDialog: false,
      form: {
        groupName: '',
        pageIndex: 1,
        pageSize: 10
      },
      currentPage: 1,
      tableData: []
    }
  },
  computed: {

  },
  watch: {
        name: function(val) {
      debugger
        this.form.groupName = val
        this.getList()

    }
  },
  created() {
    this.getList()
  },
  mounted() {
    this.$nextTick(function() {})
  },
  methods: {
    // 查询分组列表
    getList() {
      vip.groupList(this.form).then(res => {
        if (res.data.code === 0) {
          this.tableData = res.data.data.records
        }
      })
    },
    delGroup() {
      // 删除分组
      vip.groupDelete(1).then(res => {
        if (res.data.code === 0) {
          this.deleteDialog = false
          this.getList()
          this.$message({
            message: res.data.msg,
            type: 'success'
          })
        }
      })
    },
    openDelete(row) {
      this.rowData = row
      this.deleteDialog = true
    },
    handleSizeChange(val) {
      this.form.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.form.pageIndex = val
      this.getList()
    }
  }
}
</script>

<style lang='scss'>
.cell {
  text-align: center;
}
</style>
