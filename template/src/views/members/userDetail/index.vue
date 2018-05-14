<template>
  <div class="ml15 mr15">
    <p>会员详情</p>
    <div class="nav">
      <el-tabs v-model="activeName"  @tab-click="handleClick">
        <el-tab-pane label="基础信息" name="first">
          <base-msg></base-msg>
        </el-tab-pane>
        <el-tab-pane label="券信息" name="second">
        <ticket-info></ticket-info>
        </el-tab-pane>
        <el-tab-pane label="交易记录" name="third">
          <trans-record></trans-record>
        </el-tab-pane>
        <el-tab-pane label="积分记录" name="fourth">
          <integral-record></integral-record>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import baseMsg from './baseMsg';
import integralRecord from './integralRecord';
import ticketInfo from './ticketInfo';
import transRecord from './transRecord';

export default {
  components: {
    baseMsg,
    integralRecord,
    ticketInfo,
    transRecord
  },
  data() {
    return {
      name: 'userDetail',
      activeName: 'first'
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$nextTick(function() {})
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style lang='scss'>
.el-tabs__header{
  position: relative;
  padding: 15px 0 0 20px;
  border-radius: 6px 6px 0 0 ;
  background: #fff;
  margin: 0;
}
.container{
  padding: 30px 0;
  background: #fff;
}
.border-bottom{
  border-bottom: 1px solid #eee;
}
</style>
