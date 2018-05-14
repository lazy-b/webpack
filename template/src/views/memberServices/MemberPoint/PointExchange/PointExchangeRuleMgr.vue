<template>
  <!-- 积分兑换创建 -->
  <el-card class="point-exchange-container">
    <el-form :model="pointExchangeRule" :rules="rules" ref="pointExchangeRule" label-width="170px">
      <el-form-item label="渠道名称：" prop="channelId">
        <el-select
          class="ms-wp50"
          :disabled="isEdit"
          v-model="pointExchangeRule.channelId"
          placeholder="请选择渠道名称"
        >
          <el-option
            v-for="(basicChannel, index) in basicChannelList"
            :label="basicChannel.channelName"
            :value="basicChannel.channelId"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="兑换类型：" prop="fullExchange">
        <el-select
          class="ms-wp50"
          :disabled="isEdit"
          v-model="pointExchangeRule.fullExchange"
          placeholder="请选择兑换类型"
        >
          <el-option label="全额兑换" :value="true"></el-option>
          <el-option label="加价兑换" :value="false"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="兑换商品名称：" prop="productName">
        <el-input
          class="ms-wp50"
          :maxlength="20"
          v-model="pointExchangeRule.productName"
          placeholder="不输入则显示商品原名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="商品编码：" prop="productCode">
        <el-input
          class="ms-wp50"
          v-model="pointExchangeRule.productCode"
          placeholder="请准确输入商品对应编码"
        ></el-input>
      </el-form-item>
      <el-form-item label="兑换总量：" prop="num">
        <el-input
          class="ms-wp50"
          v-model="pointExchangeRule.num"
          placeholder="请输入兑换总量"
        ></el-input>
      </el-form-item>
      <el-form-item label="消耗积分：" prop="point">
        <el-input
          class="ms-wp50"
          v-model="pointExchangeRule.point"
          placeholder="本次兑换消耗的积分数"
        ></el-input>
      </el-form-item>
      <!-- 加价 -->
      <div v-show="!pointExchangeRule.fullExchange">
        <el-form-item label="加价金额：" prop="additionalPrice">
          <el-input
            class="ms-wp50"
            v-model="pointExchangeRule.additionalPrice"
            placeholder="本次兑换需另外加价金额"
          >
            <template slot="append">元</template>
          </el-input>
        </el-form-item>
      </div>
      <el-form-item label="邮费：" prop="postage">
        <el-input
          class="ms-wp50"
          v-model="pointExchangeRule.postage"
          placeholder="商品邮递费用"
        ></el-input>
      </el-form-item>
      <el-form-item label="说明：" prop="description">
        <el-input
          class="ms-wp50"
          type="textarea"
          placeholder="请输入说明..."
          v-model="pointExchangeRule.description"
          :rows="6"
        ></el-input>
      </el-form-item>
      <el-form-item label="状态：" prop="enable">
        <el-radio-group v-model="pointExchangeRule.enable">
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
</template>

<script>
  import { memberServices } from '@/api';
  import { regExps } from '@/utils/reg';

  export default {
    name: 'PointExchangeRuleMgr',
    components: {},
    directives: {},
    filters: {},
    mixins: [],
    props: {},
    data() {
      // 局部提交表单给后端校验规则
      // const validateProductCode = (rule, value, callback) => {
      //     const params = {
      //       'account': value
      //     };
      //     // 发送验证请求伪代码
      //     checkProductCode(params).then(res => {
      //       if (res.data.code === 0) {
      //         callback();
      //       } else {
      //         callback(new Error(res.data.msg));
      //         callback(res.data.msg);
      //       }
      //     }, () => {
      //       callback(new Error('服务异常'));
      //     });
      // };
      return {
        // 是否编辑状态
        isEdit: false,
        // 成长值规则
        pointExchangeRule: {
          pointExchangeRuleId: '', // 规则兑换ID
          productName: '', // string, 商品名称
          channelId: '', // number, 渠道ID
          productCode: '', // string, 商品编码
          num: '', // number, 兑换总量
          fullExchange: true, // boolean, 是否全额兑换
          point: '', // number, 消耗积分
          additionalPrice: '', // number, 需加价
          postage: '', // number, 邮费
          description: '', // string, 说明
          enable: true, // boolean, 状态
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
            { required: true, message: '请选择适用渠道', trigger: 'change' },
          ],
          fullExchange: [
            { required: true, message: '请选择兑换类型', trigger: 'change' },
          ],
          productCode: [
            { required: true, message: '请准确输入商品对应编码', trigger: 'blur' },
            // 局部提交后端进行校验
            // { validator: validateProductCode, trigger: 'blur' },
          ],
          num: [
            { pattern: regExps.integer, required: true, message: '请输入一个整数', trigger: 'blur,change' },
          ],
          point: [
            { pattern: regExps.number, required: true, message: '请输入正确的消耗积分数', trigger: 'blur' },
          ],
          additionalPrice: [
            { pattern: regExps.number, required: true, message: '请输入正确的加价金额', trigger: 'blur' },
          ],
          postage: [
            { pattern: regExps.number, message: '请输入数字', trigger: 'change' },
          ],
          description: [
            { required: true, message: '请输入说明', trigger: 'blur' }
          ],
          enable: [
            { type: 'boolean', required: true, message: '请选择状态', trigger: 'blur' }
          ],
        },
      };
    },
    computed: {},
    watch: {
      // 是否是编辑模式
      $route: {
        handler(val) {
          const pointExchangeRuleId = val.params.pointExchangeRuleId;

          if (typeof pointExchangeRuleId !== 'undefined') {
            this.pointExchangeRule.pointExchangeRuleId = this.params.pointExchangeRuleId;
            this.isEdit = true;
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
        if (this.isEdit) {
          this.getPointExchangeRuleById();
        }

        this.getBasicChannelList();
      });
    },
    methods: {
      /** --------------- 说明 -------------  */
      getPointExchangeRuleById() {
        const params = { pointExchangeRuleId: this.pointExchangeRule.pointExchangeRuleId };
        memberServices.getPointExchangeRuleById(params).then(res => {
          if (res.data.code === 0) {
            // debugger
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
        if (this.isEdit) {
          this.updateMemberGrowRule();
        } else {
          this.putNewMemberGrowRule();
        }
      },
      updateMemberGrowRule() {
        memberServices.updateMemberGrowRule(this.pointExchangeRule).then(res => {
          if (res.data.code === 0) {
            this.$message({
              type: 'success',
              message: '编辑成长值规则成功！',
            });
          }
        });
      },
      putNewMemberGrowRule() {
        memberServices.putNewMemberGrowRule(this.pointExchangeRule).then(res => {
          if (res.data.code === 0) {
            this.$message({
              type: 'success',
              message: '新增成长值规则成功！',
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
          this.$router.go(-1);
        }).catch(() => {
        });
      },
    },
  };
</script>

<style scoped>
  
</style>