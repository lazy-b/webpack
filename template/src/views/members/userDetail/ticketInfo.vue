<template>
  <div class="container">
    <div class="ticket-header ms-pl20 ">
      <el-form :inline="true" :model="form" class="demo-form-inline" size='small'>
        <el-form-item label="">
          <el-input v-model="form.couponCode" :maxlength="30" placeholder="请输入券号/券名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getList">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="ticket-header_info ms-mt15 ms-pb15 border-bottom">
      <div>
        <div class="icon">&nbsp;</div>
        <span>已使用数量 ：</span>
        <u class="ms-pr15">\{{usedCoupon}}</u>
      </div>
      <div>
        <div class="icon">&nbsp;</div>
        <span>未使用数量：</span>
        <u class="ms-pl15">\{{noUsedCoupon}}</u>
      </div>
    </div>
    <!-- 表格数据 -->
    <div class="ms-text-center">
      <el-table :data="tableData" style="width: 100%" size='small'>
        <el-table-column prop="type" label="类型" min-width="100">
        </el-table-column>
        <el-table-column prop="couponCode" label="券号" min-width="180">
        </el-table-column>
        <el-table-column prop="couponName" label="名称" min-width="100">
        </el-table-column>
        <el-table-column label="状态" min-width="100">
          <template slot-scope="scope">
            <span>\{{scope.row.enable ? '已使用':'未使用'}}</span>
          </template>
        </el-table-column>
        <el-table-column  label="使用期限" min-width="200">
          <template slot-scope="scope">
            <span>\{{scope.row.startTime}} 至\{{scope.row.expireTime}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="领取日期" min-width="150">
        </el-table-column>
      </el-table>
      <div class="ms-footer_pagination ms-bg_white">
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
        couponCode: '',
        memberId: '',
        pageIndex: 1,
        pageSize: 10
      },
      usedCoupon: null,
      noUsedCoupon: null,
      currentPage: 1,
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
    // 查询会员券信息
    getList() {
      vip.couponList(this.form).then(res => {
        if (res.data.code === 0) {
          this.tableData = res.data.data.records;
          this.noUsedCoupon = res.data.data.noUsedCoupon;
          this.usedCoupon = res.data.data.usedCoupon;
        }
      })
    },
    ...Action
  }
}
</script>
<style>
.cell{
  text-align: center;
}
</style>

<style scoped lang='scss'>
.icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #eee;
}
.ticket-header_info {
  display: flex;
  justify-content: center;
  // align-items: center;
  // float: left;
  & > div {
    // float: left;
    // width: 50%;
    flex: 0 0 30%;
    text-align: center;
    div,
    span,
    u {
      display: inline-flex;
      align-items: center;
    }
  }
  div {
    span {
      color: #333;
      font-size: 15px;
    }
    u {
      text-decoration: none;
      font-weight: 700;
      font-size: 30px;
      color: blueviolet;
    }
  }
}
</style>
