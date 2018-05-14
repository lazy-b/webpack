<template>
  <div>
    <div class="base-header">
      <!-- 左边框 -->
      <div class="flex1of3">
        <div class="ms-text-right" v-show='false'>
          <el-button type="primary" size="small">+标签</el-button>
        </div>
        <div class="base-header_content">
          <div>
            <img src="/src/assets/images/long.jpeg" class="images">
          </div>
          <div class="user-name">
            \{{vip.memberName}}
          </div>
          <div class="shop-name">
            <p>\{{vip.storeName}}</p>
            <p>门店编号：\{{vip.storeCode}}</p>
          </div>
          <div class="shop-info">
            <div>
              <span>\{{vip.discount}}%</span>
              <u>会员折扣</u>
            </div>
            <div>
              <span class='font-color'>\{{vip.remainPoint}}</span>
              <u>会员积分</u>
            </div>
          </div>
        </div>
      </div>
      <!-- 左边框 -->
      <!-- 右边框 -->
      <div class="flex2of3">
        <div class="header-right">
          <div>
            <span>手机</span>
            <em>\{{vip.memberMobile}}</em>
          </div>
          <div>
            <span>微信昵称</span>
            <em>\{{vip.memberNickName}}</em>
          </div>
          <div>
            <span>生日</span>
            <em>\{{vip.birthday}}</em>
          </div>
          <div>
            <span>累计积分</span>
            <em>\{{vip.grandPoint}}</em>
          </div>
          <div>
            <span>快过期积分</span>
            <em>\{{vip.expirePoint}}</em>
          </div>
          <div>
            <span>会员状态</span>
            <em>\{{vip.state ? '正常':'异常'}}</em>
          </div>
          <div>
            <span>所属大区</span>
            <em>\{{vip.regionName}}</em>
          </div>
          <div>
            <span>所属地区</span>
            <em>\{{vip.provinceName}}-\{{vip.cityName}}-\{{vip.countyName}}</em>
          </div>
          <div>
            <span>所属代理</span>
            <em>\{{vip.agentName}}</em>
          </div>
          <div>
            <span>注册时间</span>
            <em>1992-01-10</em>
          </div>
          <div>
            <span>邮箱账号</span>
            <em>\{{vip.email}}</em>
          </div>
          <div>
            <span>会员来源</span>
            <em>美的商城</em>
          </div>
        </div>
      </div>
      <!-- 右边框 -->
    </div>
    <div class="ms-mt20 ms-mb20 base-footer">
      <!-- left -->
      <div class="base-footer_contain">
        <p class='footer_title'>最近一次消费</p>
        <div class="footer_content">
          <span>门店 ：</span>
          <u>\{{vip.lastTransactionStoreName}}</u>
        </div>
        <div class="footer_content">
          <span>金额 ：</span>
          <u>\{{vip.lastTransactionTotalPrice}}</u>
        </div>
        <div class="footer_content">
          <span>数量 ：</span>
          <u>\{{vip.lastTransactionTotal}}</u>
        </div>
        <div class="footer_content">
          <span>时间 ：</span>
          <u>\{{vip.lastTransactionCreateTime}}</u>
        </div>
      </div>
      <!-- left -->
      <!-- middle -->
      <div class="base-footer_contain">
        <p class='footer_title'>平均消费</p>
        <div class="footer_content">
          <span>客单价 ：</span>
          <u>\{{vip.avgTransactionCodePrice}}</u>
        </div>
        <div class="footer_content">
          <span>客单件 ：</span>
          <u>\{{vip.avgTransactionTotal}}</u>
        </div>
        <div class="footer_content">
          <span>件单价 ：</span>
          <u>\{{vip.avgTransactionCodePrice}}</u>
        </div>
        <div class="footer_content">
          <span>折扣 ：</span>
          <u>\{{vip.discount}}%</u>
        </div>
      </div>
      <!-- middle -->
      <!-- right -->
      <div class="base-footer_contain">
        <p class='footer_title'>累计消费</p>
        <div class="footer_content">
          <span>消费金额 ：</span>
          <u>\{{vip.totalTransactionPrice}}</u>
        </div>
        <div class="footer_content">
          <span>退款金额 ：</span>
          <u>\{{vip.totalTransactionRefundPrice}}</u>
        </div>
        <div class="footer_content">
          <span>消费单数/件数 ：</span>
          <u>\{{vip.totalTransactionAll}}</u>
        </div>
        <div class="footer_content">
          <span>退换次数 ：</span>
          <u>\{{vip.totalTransactionRefund}}</u>
        </div>
      </div>
      <!-- right -->
    </div>
  </div>
</template>

<script>
import { vip } from '@/api/marketingCenter/vip'
export default {
  data() {
    return {
      vip: {}
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$nextTick(function() {
      this.getDetail()
    })
  },
  methods: {
    // 查询会员详情
    getDetail() {
      const params = {
        memberId: 2
      }
      vip.vipDetail(params).then(res => {
        if (res.data.code === 0) {
          this.vip = res.data.data;
        }
      })
    }
  }
}
</script>

<style scoped lang='scss'>
.footer_title {
  font-size: 16px;
  color: #222426;
  height: 35px;
  line-height: 35px;
}
.footer_content {
  height: 35px;
  line-height: 35px;
  span,
  u {
    display: inline-block;
  }
  span {
    // width: 30%;
    text-align: right;
    font-size: 14px;
    color: #999;
  }
  u {
    text-decoration: none;
    text-align: left;
    font-size: 14px;
    color: #222426;
  }
}
.base-footer {
  display: flex;
  flex-flow: row wrap;
  & > div:nth-child(3) {
    margin-right: 0;
  }
}
.base-footer_contain {
  flex: 0 0 32.2%;
  height: 218px;
  margin-right: 20px;
  font-family: MicrosoftYaHei;
  background-color: #ffffff;
  box-shadow: -3px 0px 7px 0px rgba(182, 217, 251, 0.35);
  border-radius: 6px;
  padding: 20px;
}
p {
  padding: 0;
  margin: 0;
}
.header-right {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  padding: 15px 40px;
  & > div {
    flex: 0 0 50%;
    line-height: 60px;
    span,
    em {
      font-family: MicrosoftYaHei;
      display: inline-block;
      font-size: 14px;
    }
    span {
      width: 25%;
      color: #999;
    }
    em {
      font-style: normal;
      color: #222426;
    }
  }
}
.base-header {
  display: flex;
  align-content: center;
  width: 100%;
  height: 400px;
  background: #fff;
  // border: 1px solid #d1dbe5;
  box-sizing: border-box;
  border-radius: 6px;
  // box-shadow: 10px 10px 5px #888888;
}
.flex1of3 {
  flex: 0 0 30%;
  border-right: 1px solid #d1dbe5;
  padding: 15px;
}
.flex2of3 {
  flex: 0 0 70%;
}
.base-header_content {
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  text-align: center;
}
.images {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}
.user-name {
  font-family: MicrosoftYaHei;
  font-size: 20px;
  font-weight: normal;
  font-stretch: normal;
  margin-bottom: 25px;
  margin-top: 20px;
  color: #222426;
}
.shop-name {
  font-family: MicrosoftYaHei;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 25px;
  color: #999999;
}
.shop-info {
  display: flex;
  flex-direction: row;
  align-content: center;
  & > div {
    flex: 1;
    margin-top: 30px;
    padding: 0 50px;
    span,
    u {
      display: block;
      font-size: 24px;
    }
    u {
      text-decoration: none;
      font-size: 14px;
      padding-top: 11px;
      color: #999;
    }
  }
  & > div:nth-child(1) {
    border-right: 1px solid #f0f0f0;
    span {
      color: #ff1a1a;
    }
  }
}
.font-color {
  color: #ab1aff;
}
</style>
