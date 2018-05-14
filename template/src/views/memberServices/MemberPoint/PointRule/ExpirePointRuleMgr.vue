<template>
  <!-- 积分消耗（过期）规则管理TODO:原型有问题 -->
  <el-card class="point-expire-container">
    <el-form :model="expirePointRule" :rules="rules" ref="expirePointRule" label-width="120px">
      <h2 class="ms-h2">积分有效期管理</h2>
      <el-form-item label="适用渠道：" prop="channelId">
        <el-select :disabled="isEdit" v-model="expirePointRule.channelId" placeholder="请选择适用渠道">
          <el-option
            v-for="(basicChannel, index) in basicChannelList"
            :label="basicChannel.channelName"
            :value="basicChannel.channelId"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="失效类型：" prop="expireType">
        <el-select :disabled="isEdit" v-model="expirePointRule.expireType" placeholder="请选择收藏限制">
          <el-option label="有效日期" :value="0"></el-option>
          <el-option label="有效年月" :value="1"></el-option>
        </el-select>
      </el-form-item>

      <!-- 固定天数失效 -->
      <div v-show="expirePointRule.expireType === 0">
        <el-form-item>
          本年度获取积分：第
          <el-form-item prop="properties.year" class="ms-w50 ms-inline-block">
            <el-input v-model="expirePointRule.properties.year"></el-input>
          </el-form-item>
          年
          <el-form-item prop="properties.month" class="ms-w50 ms-inline-block">
            <el-input :max="12" v-model="expirePointRule.properties.month"></el-input>
          </el-form-item>
          月
          <el-form-item prop="properties.day" class="ms-w50 ms-inline-block">
            <el-input v-model="expirePointRule.properties.day"></el-input>
          </el-form-item>
          日内有效
        </el-form-item>
      </div>
      <!-- 固定日期失效 -->
      <div v-show="expirePointRule.expireType === 1">
       <el-form-item>
          自获取时间起
          <el-form-item prop="properties.year" class="ms-w50 ms-inline-block">
            <el-input v-model="expirePointRule.properties.year"></el-input>
          </el-form-item>
          年
          <el-form-item prop="properties.month" class="ms-w50 ms-inline-block">
            <el-input v-model="expirePointRule.properties.month"></el-input>
          </el-form-item>
          月内有效
        </el-form-item>
      </div>

      <h2 class="ms-h2">积分消耗管理</h2>
        <p class="eprm-expire-tips"><span class="eprm-red-text">*</span>按积分过期顺序，先过期的先消耗（以积分流水列表为准）</p>

      <el-form-item>
        <el-button type="primary" @click="confirmHandler">确定</el-button>
        <el-button @click="cancelHandler">取消</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
  import { memberServices } from '@/api';

  export default {
    name: 'ExpirePointRuleMgr',
    components: {},
    directives: {},
    filters: {},
    mixins: [],
    props: {},
    data() {
      return {
        // 是否编辑状态
        isEdit: false,
        // 积分消耗规则管理（积分过期规则）
        expirePointRule: {
          channelId: '', // number, 渠道ID
          expireType: 0, // number, 0-有效日期, 1-有效年月
          properties: {
            year: '', // number, 年
            month: '', // number, 月
            day: '', // number, 日（选择“有效年月”时，该值为空）
          }
        },
        // 渠道列表
        basicChannelList: [
          {
            channelId: 1, // number, 渠道ID
            channelName: '集团' // string, 渠道名称
          }
        ],
        rules: {
          channelId: [
            { required: true, message: '请选择适用渠道', trigger: 'change' }
          ],
          expireType: [
            { required: true, message: '请选择失效类型', trigger: 'blur' }
          ],
          properties: {
            year: [
              { required: true, message: '请输入年', trigger: 'blur' }
            ],
            month: [
              { required: true, message: '请输入月', trigger: 'blur' }
            ],
            day: [
              { required: true, message: '请输入天', trigger: 'blur' }
            ]
          },
        },
      };
    },
    computed: {},
    watch: {
      // 根据传入的params判断是否是编辑模式
      $route: {
        handler(val) {
          const params = val.params;
          const channelId = params.channelId;
          const growRuleTypeId = params.growRuleTypeId;
          if (typeof channelId !== 'undefined' && typeof growRuleTypeId !== 'undefined') {
            this.isEdit = true;
            this.pointRule.channelId = +channelId;
            this.pointRule.growRuleTypeId = +growRuleTypeId;

            // 请求成长值规则数据
            this.getMemberGrowRuleById(params);
          } else {
            this.isEdit = false;
          }
        },
        immediate: true,
        deep: true,
      },
    },
    created() {},
    mounted() {
      this.$nextTick(function() {
        this.getBasicChannelList();
      });
    },
    methods: {
      /** --------------- 说明 -------------  */
      /** 获取渠道列表 */
      getBasicChannelList() {
        memberServices.getBasicChannelList().then(res => {
          if (res.data.code === 0) {
            this.basicChannelList = res.data.data;
          }
        });
      },
      /** 确认按钮处理程序TODO:还没确定有没有新建功能 */
      confirmHandler() {
        const data = JSON.parse(JSON.stringify(this.expirePointRule));

        if (this.isEdit) {
          this.updatePointExpire(data);
        } else {
          this.putNewMemberGrowRule(data);
        }
      },
      updatePointExpire(data) {
        memberServices.updatePointExpire(data).then(res => {
          if (res.data.code === 0) {
            this.$message({
              type: 'success',
              message: '编辑积分有效期成功',
            });
          }
        });
      },
      putNewMemberGrowRule(data) {
        memberServices.putNewMemberGrowRule(data).then(res => {
          if (res.data.code === 0) {
            this.$message({
              type: 'success',
              message: '新增积分有效期成功',
            });
          }
        });
      },
      /** 取消按钮处理程序 */
      cancelHandler() {
        this.$confirm('是否确定取消', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push({ name: 'pointRuleList' });
        }).catch(() => {
        });
      },
    },
  };
</script>

<style scoped>
  .eprm-expire-tips {
    text-indent: 30px;
  }
  .eprm-red-text {
    color: red;
  }
</style>