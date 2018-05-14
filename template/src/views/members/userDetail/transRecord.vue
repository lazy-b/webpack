<template>
  <div class="container">
    <div class="trans-header ms-pl20 border-bottom">
      <el-form :inline="true" :model="formInline" class="demo-form-inline" size='small'>
        <el-form-item label="">
          <el-input v-model="form.transactionNumber" :maxlength="30" class="w250" placeholder="请输入订单编号/门店名称/门店编号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click='getList'>搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格数据 -->
    <div>
      <el-table :data="tableData" style="width: 100%" size='small'>
        <el-table-column prop="transactionRecordId" label="订单编号" width="180">
        </el-table-column>
        <el-table-column prop="payPrice" label="结算价" width="180">
        </el-table-column>
        <el-table-column prop="point" label="积分">
        </el-table-column>
        <el-table-column prop="createTime" label="下单时间">
        </el-table-column>
        <el-table-column prop="storeCode" label="购买门店">
        </el-table-column>
        <el-table-column prop="orderChannelName" label="订单来源">
        </el-table-column>
        <el-table-column label="订单类型">
            <template slot-scope="scope">
            <span v-if='scope.row.type===1'>销售单</span>
            <span v-if='scope.row.type===2'>换货单</span>
            <span v-if='scope.row.type===3'>退货单</span>
          </template>
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
        transactionNumber: null,
        memberId: '',
        pageIndex: 1,
        pageSize: 10
      },
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
    // 查询会员消费信息
    getList() {
      vip.transactionList(this.form).then(res => {
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
