<template>
  <!-- 成长值管理 TODO:完成度80% -->
  <div>
    <el-card class="level-mgr-container">
      <el-form :model="pointRule" :rules="rules" ref="pointRule" label-width="170px">
        <el-form-item label="规则类型：" prop="pointRuleTypeId">
          <el-select class="ms-wp50" :disabled="isEdit" v-model="pointRule.pointRuleTypeId" placeholder="请选择规则类型">
            <el-option
              v-for="(ruleType, index) in pointRuleTypeList"
              :label="ruleType.pointRuleTypeName"
              :value="ruleType.pointRuleTypeId"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>

        <!-- 注册 -->
        <div v-show="pointRule.pointRuleTypeId === 0">
          <el-form-item label="赠送积分：" prop="properties.register.bonus">
            <el-input
              class="ms-wp50"
              v-model="pointRule.properties.register.bonus"
              placeholder="注册赠送积分值"
            ></el-input>
          </el-form-item>
        </div>
        <!-- 签到 -->
        <div v-show="pointRule.pointRuleTypeId === 1">
          <el-form-item label="签到周期：" prop="properties.signIn.period">
            <el-select class="ms-wp50" :disabled="isEdit" v-model="pointRule.properties.signIn.period" placeholder="请选择签到周期">
              <el-option label="每日" :value="0"></el-option>
              <el-option label="每月" :value="1"></el-option>
              <el-option label="每周" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="赠送积分：" prop="properties.signIn.bonus">
            <el-input
              class="ms-wp50"
              v-model="pointRule.properties.signIn.bonus"
              placeholder="签到赠送积分值"
            ></el-input>
          </el-form-item>
        </div>
        <!-- 扫码（目前只有一句话） -->
        <div v-show="pointRule.pointRuleTypeId === 2">
          <p class="ms-form-tips scan-code-tips">扫描商品二维码可以获得积分</p>
        </div>
        <!-- 完善资料积分 -->
        <div v-show="pointRule.pointRuleTypeId === 3">
          <el-form-item label="赠送积分：" prop="properties.optimizeInfo.bonus">
            <el-input
              class="ms-wp50"
              v-model="pointRule.properties.optimizeInfo.bonus"
              placeholder="第一次填写资料赠送积分值"
            ></el-input>
          </el-form-item>
        </div>
        <!-- 生日奖励 -->
        <div v-show="pointRule.pointRuleTypeId === 4">
          <el-form-item label="积分倍数：" prop="properties.birthdayReward.bonus">
            <el-input
              class="ms-wp50"
              v-model="pointRule.properties.birthdayReward.bonusUppser"
              placeholder="生日当月购物的积分计算倍数"
            ></el-input>
            <p class="ms-form-tips">例如：会员3月生日，3月所有购物的积分为：正常积分*积分倍数。</p>
          </el-form-item>
          <el-form-item label="赠送上限：" prop="properties.birthdayReward.bonus">
            <el-input
              class="ms-wp50"
              v-model="pointRule.properties.birthdayReward.multiple"
              placeholder="生日奖励积分赠送上限"
            ></el-input>
          </el-form-item>
        </div>

        <el-form-item label="适用渠道：" prop="channelId">
          <el-select class="ms-wp50" :disabled="isEdit" v-model="pointRule.channelId" placeholder="请选择适用渠道">
            <el-option
              v-for="(basicChannel, index) in basicChannelList"
              :label="basicChannel.channelName"
              :value="basicChannel.channelId"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规则说明：" prop="description">
          <el-input
            type="textarea"
            class="ms-wp50"
            placeholder="请输入规则说明..."
            v-model="pointRule.description"
            :rows="6"
          ></el-input>
        </el-form-item>
        <el-form-item label="规则状态：" prop="enable">
          <el-radio-group v-model="pointRule.enable">
            <el-radio :label="true">启用</el-radio>
            <el-radio :label="false">停用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="confirmHandler">确定</el-button>
          <el-button @click="cancelHandler">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import { memberServices } from '@/api';
  export default {
    name: 'GetPointRuleMgr',
    components: {},
    directives: {},
    filters: {},
    mixins: [],
    props: {},
    data() {
      return {
        // 是否编辑状态
        isEdit: false,
        // 积分规则
        pointRule: {
          channelId: '', // number, 渠道ID
          pointRuleTypeId: '', // number, 规则类型ID
          description: '', // string, 描述信息
          enable: true, // boolean, 状态
          // 不同规则类型对应的不同规则部分
          properties: {
            // 注册
            register: {
              bonus: '' // number, 增加积分
            },
            // 签到
            signIn: {
              period: 0, // number, 签到周期：0-每日, 1-每月
              bonus: '' // number, 增加积分
            },
            // 扫码
            scanCode: {}, // 扫码暂时没有对应规则
            // 完善资料积分
            optimizeInfo: {
              bonus: '', // number, 增加积分
            },
            // 生日奖励
            birthdayReward: {
              bonusUppser: '', // number, 当天积分翻倍的倍数
              multiple: '', // number, 赠送积分上限
            },
          }, // object, 根据规则类型的不同，结构也有所不同，见下面
        },
        // 会员积分规则类型列表
        pointRuleTypeList: [
          {
            pointRuleTypeId: 1, // number, 会员积分规则类型ID
            pointRuleTypeName: '签到积分' // string, 会员积分规则类型名称
          }
        ],
        // 渠道列表
        basicChannelList: [
          {
            channelId: 1, // number, 渠道ID
            channelName: '集团' // string, 渠道名称
          }
        ],
        rules: {
          pointRuleTypeId: [
            { required: true, message: '请选择规则类型', trigger: 'change' },
          ],
          channelId: [
            { required: true, message: '请选择适用渠道', trigger: 'change' }
          ],
          description: [
            { required: true, message: '请输入描述信息', trigger: 'blur' }
          ],
          enable: [
            { type: 'boolean', required: true, message: '请选择状态', trigger: 'change' }
          ],
          properties: {
            // 注册
            register: {
              bonus: [
                { required: true, message: '请输入积分值', trigger: 'blur' }
              ],
            },
            // 签到
            signIn: {
              period: [
                { required: true, message: '请选择签到周期', trigger: 'blur' }
              ],
              bonus: [
                { required: true, message: '请输入积分值', trigger: 'blur' }
              ],
            },
            // 完善资料积分
            optimizeInfo: {
              bonus: [
                { required: true, message: '请输入积分值', trigger: 'blur' }
              ],
            },
            // 生日奖励
            birthdayReward: {
              bonusUppser: [
                { required: true, message: '请输入积分倍数', trigger: 'blur' }
              ],
              multiple: [
                { required: true, message: '请输入赠送积分上限', trigger: 'blur' }
              ],
            },
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
          const pointRuleTypeId = params.pointRuleTypeId;
          if (typeof channelId !== 'undefined' && typeof pointRuleTypeId !== 'undefined') {
            this.isEdit = true;
            this.growRule.channelId = +channelId;
            this.growRule.pointRuleTypeId = +pointRuleTypeId;

            // 请求会员积分规则数据
            this.getPointRuleById(params);
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
        this.getBasicPointRuleTypeList();
        this.getBasicChannelList();
      });
    },
    methods: {
      /** --------------- 说明 -------------  */
      /** 索引会员积分规则 */
      getPointRuleById(params) {
        memberServices.getPointRuleById(params).then(res => {
          if (res.data.code === 0) {
            // debugger
          }
        });
      },
      /** 获取积分规则类型列表 */
      getBasicPointRuleTypeList() {
        memberServices.getBasicPointRuleTypeList().then(res => {
          if (res.data.code === 0) {
            this.pointRuleTypeList = res.data.data;
          }
        });
      },
      /** 获取渠道列表 */
      getBasicChannelList() {
        memberServices.getBasicChannelList().then(res => {
          if (res.data.code === 0) {
            this.basicChannelList = res.data.data;
          }
        });
      },
      /** 确认按钮处理程序 */
      confirmHandler() {
        const data = JSON.parse(JSON.stringify(this.pointRule));
        const channelArray = ['register', 'signIn', 'scanCode', 'optimizeInfo', 'birthdayReward'];
        const pointRuleTypeId = this.pointRule.pointRuleTypeId;
        // 不同的规则类型对应不同的规则
        data.properties = data.properties[channelArray[pointRuleTypeId]];

        if (this.isEdit) {
          this.updatePointRule(data);
        } else {
          this.putNewPointRule(data);
        }
      },
      updatePointRule(data) {
        memberServices.updatePointRule(data).then(res => {
          if (res.data.code === 0) {
            this.$message({
              type: 'success',
              message: '编辑会员积分规则成功！',
            });
            this.goBackToList();
          }
        });
      },
      putNewPointRule(data) {
        memberServices.putNewPointRule(data).then(res => {
          if (res.data.code === 0) {
            this.$message({
              type: 'success',
              message: '新增会员积分规则成功！',
            });
            this.goBackToList();
          }
        });
      },
      /** 取消按钮处理程序 */
      cancelHandler() {
        this.$confirm('是否确定取消操作并返回列表？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.goBackToList();
        }).catch(() => {
        });
      },
      /** 返回列表页面 */
      goBackToList() {
        this.$router.replace({ name: 'pointRuleList' });
      },
    },
  };
</script>

<style scoped>
  .scan-code-tips {
    text-indent: 180px;
    margin-bottom: 20px;
  }
</style>