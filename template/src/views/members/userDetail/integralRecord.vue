<template>
  <div class="container">
    <div class="trans-header ms-pl20 border-bottom">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" size='small'>
        <el-form-item label="">
          <el-select v-model="form.type" placeholder="请选择积分类型" class="w250">
            <el-option v-for='(item,index) in typeArr' :key="index" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click='getList'>搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格数据 -->
    <div>
      <el-table :data="tableData" style="width: 100%" size='small'>
        <el-table-column prop="type" label="积分类型" width="180">
          <template slot-scope="scope">
            <span v-if='scope.row.type===1'>购物</span>
            <span v-if='scope.row.type===2'>签到</span>
            <span v-if='scope.row.type===3'>扫码</span>
            <span v-if='scope.row.type===4'>生日赠送</span>
          </template>
        </el-table-column>
        <el-table-column prop="piont" label="积分" width="180">
        </el-table-column>
        <el-table-column prop="createTime" label="积分时间">
        </el-table-column>
        <el-table-column prop="expireTime" label="过期时间">
        </el-table-column>
        <el-table-column prop="storeName" label="门店">
        </el-table-column>
        <el-table-column prop="transactionId" label="关联编号">
        </el-table-column>
        <el-table-column prop="remark" label="备注">
        </el-table-column>
      </el-table>
      <div class="ms-footer_pagination">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="form.pageIndex" :page-sizes="[10, 20, 30, 50]" :page-size="form.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="40">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { vip } from '@/api/marketingCenter/vip'
import Action from './action'
export default {
  data() {
    return {
      form: {
        type: null,
        memberId: '',
        pageIndex: 1,
        pageSize: 10
      },
      typeArr: [
        { value: 1, name: '购物' },
        { value: 2, name: '签到' },
        { value: 3, name: '扫码' },
        { value: 4, name: '生日赠送' }
      ],
      tableData: []
    }
  },
  computed: {},
  watch: {},
  created() {
    Action.init(this)
    this.getList()
  },
  mounted() {
    this.$nextTick(function() {})
  },
  methods: {
    // 查询会员积分信息
    getList() {
      vip.pointList(this.form).then(res => {
        if (res.data.code === 0) {
          this.tableData = res.data.data.records
        }
      })
    }
  }
}
</script>

<style scoped lang='scss'>
.w250 {
  width: 250px;
}
</style>
