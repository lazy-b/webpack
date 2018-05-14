<template>
  <div class="container">
    <div class="trans-header ms-pl20 border-bottom">
      <el-form :inline="true" :model="form" class="demo-form-inline" size='small'>
        <el-form-item label="">
          <el-input v-model="form.tagName" :maxlength="30" placeholder="请输入标签名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getList">搜索</el-button>
          <el-button @click='toNewLabel'>新建</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格数据 -->
    <div class="ms-text-center">
      <el-table :data="tableData" style="width: 100%" size='small'>
        <el-table-column prop="tagName" label="标签名称" width="180">
        </el-table-column>
        <el-table-column prop="name" label="可见范围" width="180">
          <template slot-scope="scope">
            <span v-if='scope.row.visible===1'>本账号</span>
          </template>
        </el-table-column>
        <el-table-column prop="tagTotal" label="打标人数">
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间">
        </el-table-column>
        <el-table-column prop="name" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="openEdit(scope.row.tagId)">编辑</el-button>
            <el-button @click='openDelete(scope.row)' type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="ms-footer_pagination">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="form.pageIndex" :page-sizes="[10, 20, 30, 50]" :page-size="form.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="40">
        </el-pagination>
      </div>
    </div>
    <!-- 删除弹出框 -->
    <el-dialog title="提示" :visible.sync="deleteDialog" width="30%" center>
      <div class="ms-text-center">
        <span>确认删除标签\{{rowData.tagName}}</span>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="deleteDialog = false">取 消</el-button>
        <el-button size="small" @click="deleteLabel" type="primary">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 删除弹出框 -->
    <!-- 编辑弹出框 -->
    <el-dialog title="提示" :visible.sync="editDialog" width="30%" center @close='closeEditDialog'>
      <div class="ms-text-center">
        <el-form ref="editForm" :rules="rules" :model="editForm" label-width="100px" size="small" class="demo-dynamic">
          <el-form-item label="标签名称" prop='tagName'>
            <el-input :maxlength="20" v-model="editForm.tagName" placeholder="请输入标签名称，最长20个字"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="closeEditDialog">取 消</el-button>
        <el-button size="small" @click="editeLabel" type="primary">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑弹出框 -->
  </div>
</template>

<script>
import { vip } from '@/api/marketingCenter/vip'
export default {
  data() {
    return {
      form: {
        tagName: '',
        memberId: '',
        pageIndex: 1,
        pageSize: 10
      },
      editForm: {
        tagId: null,
        tagName: ''
      },
      tagId: null,
      editDialog: false,
      rowData: {},
      deleteDialog: false,
      tableData: [],
      rules: {
        tagName: {
          required: true,
          message: '标签名不能为空',
          trigger: 'blur'
        }
      }
    }
  },
  computed: {},
  watch: {},
  created() {
    this.getList()
  },
  mounted() {
    this.$nextTick(function() {})
  },
  methods: {
    editeLabel() {
      // 编辑弹出框
      this.editForm.tagId = this.tagId
      this.$refs.editForm.validate(valid => {
        if (valid) {
          vip.memberUpdate(this.editForm).then(res => {
            if (res.data.code === 0) {
              this.editDialog = false
              this.getList()
              this.$message({
                message: res.data.msg,
                type: 'success'
              })
            }
          })
        }
      })
    },
    closeEditDialog() {
      // 关闭编辑弹出框
      this.editDialog = false
      // this.editForm.tagName = ''
      this.$refs.editForm.resetFields()
    },
    openEdit(tagId) {
      this.tagId = tagId
      this.editDialog = true
    },
    deleteLabel() {
      // 删除标签
      vip.memberDelete(this.rowData.tagId).then(res => {
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
    // 查询标签列表
    getList() {
      vip.listMemberTag(this.form).then(res => {
        if (res.data.code === 0) {
          this.tableData = res.data.data.records
        }
      })
    },
    handleSizeChange(val) {
      this.form.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.form.pageIndex = val
      this.getList()
    },
    toNewLabel() {
      this.$router.push('newLabel')
    }
  }
}
</script>
<style>
.cell {
  text-align: center;
}
</style>

<style scoped lang='scss'>
.w250 {
  width: 250px;
}
</style>
