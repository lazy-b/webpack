<template>
  <!-- 成长值管理 -->
  <div>
    <!-- <el-card class="channel-item" shadow="hover"> -->
    <el-card class="level-mgr-container">
      <el-form :model="growRule" :rules="rules" ref="growRule" label-width="120px">
        <el-form-item label="规则类型：" prop="growRuleTypeId">
          <el-select :disabled="isEdit" v-model="growRule.growRuleTypeId" placeholder="请选择规则类型">
            <el-option
              v-for="(ruleType, index) in growRuleTypeList"
              :label="ruleType.growRuleTypeName"
              :value="ruleType.growRuleTypeId"
              :disabled="ruleType.disabled"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>

        <!-- 签到 -->
        <div v-show="growRule.growRuleTypeId === 1">
          <el-form-item label="签到周期：" prop="properties.signIn.period">
            <el-select :disabled="isEdit" v-model="growRule.properties.signIn.period" placeholder="请选择签到周期">
              <el-option label="每日" :value="0"></el-option>
              <el-option label="每月" :value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="增加成长值：" prop="properties.signIn.bonus">
            <el-input v-model="growRule.properties.signIn.bonus"></el-input>
          </el-form-item>
        </div>
        <!-- 注册 -->
        <div v-show="growRule.growRuleTypeId === 2">
          <el-form-item label="增加成长值：" prop="properties.register.bonus">
            <el-input v-model="growRule.properties.register.bonus"></el-input>
          </el-form-item>
        </div>
        <!-- 关注微信 -->
        <!-- <div v-show="growRule.growRuleTypeId === 3">
          <el-form-item label="收藏限制：" prop="limit">
            <el-select v-model="growRule.properties.favorite.limit" placeholder="请选择收藏限制">
              <el-option label="每日" :value="0"></el-option>
              <el-option label="首次" :value="1"></el-option>
              <el-option label="每日三次" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="增加成长值：" prop="bonus">
            <el-input v-model="growRule.properties.favorite.bonus"></el-input>
          </el-form-item>
        </div> -->
        <!-- 收藏店铺 -->
        <div v-show="growRule.growRuleTypeId === 4">
          <el-form-item label="收藏限制：" prop="properties.favorite.limit">
            <el-select :disabled="isEdit" v-model="growRule.properties.favorite.limit" placeholder="请选择收藏限制">
              <el-option label="每日" :value="0"></el-option>
              <el-option label="首次" :value="1"></el-option>
              <el-option label="每日三次" :value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="增加成长值：" prop="properties.favorite.bonus">
            <el-input v-model="growRule.properties.favorite.bonus"></el-input>
          </el-form-item>
        </div>
        <!-- 订单好评 -->
        <div v-show="growRule.growRuleTypeId === 5">
          <el-form-item label="评价限制" prop="properties.praise.limit">
            <el-select :disabled="isEdit" v-model="growRule.properties.praise.limit" placeholder="请选择评价限制">
              <el-option label="每个商品" :value="0"></el-option>
              <el-option label="每个订单" :value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="增加成长值：" prop="properties.praise.bonus">
            <el-input v-model="growRule.properties.praise.bonus"></el-input>
          </el-form-item>
        </div>

        <el-form-item label="适用渠道：" prop="channelId">
          <el-select :disabled="isEdit" v-model="growRule.channelId" placeholder="请选择适用渠道">
            <el-option
              v-for="(basicChannel, index) in basicChannelList"
              :label="basicChannel.channelName"
              :value="basicChannel.channelId"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="说明：" prop="description">
          <el-input
            type="textarea"
            placeholder="请输入说明..."
            v-model="growRule.description"
            :rows="6"
          ></el-input>
        </el-form-item>
        <el-form-item label="状态：" prop="enable">
          <el-radio-group v-model="growRule.enable">
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
    name: 'MemberLevelMgr',
    components: {},
    directives: {},
    filters: {},
    mixins: [],
    props: {},
    data() {
      return {
        // 是否编辑状态
        isEdit: false,
        // 成长值规则
        growRule: {
          channelId: '', // number, 渠道ID
          growRuleTypeId: '', // number, 规则类型ID
          description: '', // string, 描述信息
          enable: true, // boolean, 状态
          // 不同规则类型对应的不同规则部分
          properties: {
            // 注册
            register: {
              bonus: '' // number, 增加成长值
            },
            // 签到
            signIn: {
              period: 0, // number, 签到周期：0-每日, 1-每月
              bonus: '' // number, 增加成长值
            },
            // 收藏店铺，关注微信
            favorite: {
              limit: 0, // number, 限制: 0-每次, 1-首次, 2-每日三次
              bonus: '', // number, 增加成长值
            },
            // 订单好评
            praise: {
              limit: 0, // number, 限制: 0-每个商品, 1-每个订单
              bonus: '', // number, 增加成长值
            },
          }, // object, 根据规则类型的不同，结构也有所不同，见下面
        },
        // 成长值规则类型列表
        growRuleTypeList: [
          {
            growRuleTypeId: 1, // number, 成长值规则类型ID
            growRuleTypeName: '签到积分' // string, 成长值规则类型名称
          },
        ],
        // 渠道列表
        basicChannelList: [
          {
            channelId: 1, // number, 渠道ID
            channelName: '集团' // string, 渠道名称
          }
        ],
        rules: {
          growRuleTypeId: [
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
            // 签到
            signIn: {
              period: [
                { required: true, message: '请选择签到周期', trigger: 'blur' }
              ],
              bonus: [
                { required: true, message: '请输入增加成长值', trigger: 'blur' }
              ],
            },
            // 注册
            register: {
              bonus: [
                { required: true, message: '请输入增加成长值', trigger: 'blur' }
              ],
            },
            // 收藏店铺，关注微信
            favorite: {
              limit: [
                { required: true, message: '请选择收藏限制', trigger: 'blur' }
              ],
              bonus: [
                { required: true, message: '请输入增加成长值', trigger: 'blur' }
              ],
            },
            // 订单好评
            praise: {
              limit: [
                { required: true, message: '请选择评价限制', trigger: 'blur' }
              ],
              bonus: [
                { required: true, message: '请输入增加成长值', trigger: 'blur' }
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
          const growRuleTypeId = params.growRuleTypeId;
          if (typeof channelId !== 'undefined' && typeof growRuleTypeId !== 'undefined') {
            this.isEdit = true;
            this.growRule.channelId = +channelId;
            this.growRule.growRuleTypeId = +growRuleTypeId;

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
        this.getBasicGrowRuleTypeList();
        this.getBasicChannelList();
      });
    },
    methods: {
      /** --------------- 说明 -------------  */
      /** 索引成长值规则 */
      getMemberGrowRuleById(params) {
        memberServices.getMemberGrowRuleById(params).then(res => {
          if (res.data.code === 0) {
            // debugger
          }
        });
      },
      /** 获取成长值规则类型列表 */
      getBasicGrowRuleTypeList() {
        memberServices.getBasicGrowRuleTypeList().then(res => {
          if (res.data.code === 0) {
            this.growRuleTypeList = res.data.data;
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
        const data = JSON.parse(JSON.stringify(this.growRule));
        const channelArray = ['register', 'signIn', 'favorite', 'praise'];
        const growRuleTypeId = this.growRule.growRuleTypeId;
        // 不同的规则类型对应不同的规则
        data.properties = data.properties[channelArray[growRuleTypeId]];

        if (this.isEdit) {
          this.updateMemberGrowRule(data);
        } else {
          this.putNewMemberGrowRule(data);
        }
      },
      updateMemberGrowRule(data) {
        memberServices.updateMemberGrowRule(data).then(res => {
          if (res.data.code === 0) {
            this.$message({
              type: 'success',
              message: '编辑成长值规则成功！',
            });
            this.goBackToList();
          }
        });
      },
      putNewMemberGrowRule(data) {
        memberServices.putNewMemberGrowRule(data).then(res => {
          if (res.data.code === 0) {
            this.$message({
              type: 'success',
              message: '新增成长值规则成功！',
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
        this.$router.replace({ name: 'memberRuleList' });
      },
    },
  };
</script>

<style scoped>
  
</style>