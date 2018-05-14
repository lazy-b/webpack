<!-- 用户管理编辑-》新增、修改页面 -->
<template>
  <div class="app-container">
    <el-form
      class="form"
      ref="userForm"
      :rules='rules'
      :model='form'
      label-width="120px">

      <!-- 表单项 -->
      <el-form-item label="会员姓名">
        <el-input v-model='form.name' :maxlength="50"></el-input>
      </el-form-item>
      <el-form-item label="会员昵称">
        <el-input v-model='form.nickname' disabled></el-input>
      </el-form-item>
      <el-form-item label="会员年龄">
        <el-input v-model='form.age'></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-input :value='form.sex | sex' disabled></el-input>
      </el-form-item>
      <el-form-item label="累计积分">
        <el-input v-model='form.grandValue' disabled></el-input>
      </el-form-item>
      <el-form-item label="扫码次数">
        <el-input v-model='form.scanTotalTimes' disabled></el-input>
      </el-form-item>
      <el-form-item label="首次扫码门店">
        <el-input v-model='form.firstScanStoreName' disabled></el-input>
      </el-form-item>

       <el-form-item label="会员状态">
        <el-select v-model="form.state" placeholder="请选择">
          <el-option
            v-for="(item, index) in list"
            :key="index"
            :label="item.label"
            :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="来源渠道" prop="level">
         <el-select v-model="form.level" placeholder="请选择" disabled>
          <el-option
            v-for="(item, index) in channelList"
            :key="index"
            :label="item.label"
            :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属代理商">
        <!-- <el-select v-model="form.store.agentId" placeholder="请选择" disabled>
          <el-option
            v-for="(item, index) in agentList"
            :key="index"
            :label="item.label"
            :value="item.value"></el-option>
        </el-select> -->
        <el-input v-model='form.store.agentName' disabled></el-input>
      </el-form-item>
      <el-form-item label="注册手机号码">
        <el-input v-model='form.mobile'></el-input>
      </el-form-item>
      <el-form-item label="会员生日">
        <el-date-picker type="date" value-format="yyyy-MM-dd HH:mm:ss" v-model="form.birthday">
				</el-date-picker>
      </el-form-item>
      <el-form-item label="会员等级">
        <el-select v-model="form.level.levelId" placeholder="请选择">
          <el-option
            v-for="(item, index) in memberLevelList"
            :key="index"
            :label="item.label"
            :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="会员邮箱">
        <el-input v-model='form.email' disabled></el-input>
      </el-form-item>
       <el-form-item label="可用积分">
        <el-input v-model='form.remainValue'></el-input>
      </el-form-item>
      <el-form-item label="最后扫码时间">
        <el-input v-model='form.scanLastTime' disabled></el-input>
      </el-form-item>
      <el-form-item label="所属大区">
        <el-select v-model="form.store.regionId"
        @change="regionChangerHandler" placeholder="请选择">
          <el-option
            v-for="(item, index) in areaList"
            :key="index"
            :label="item.label"
            :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="活跃状态" prop="region">
         <el-select v-model="form.level" placeholder="请选择">
          <el-option
            v-for="(item, index) in list"
            :key="index"
            :label="item.label"
            :value="item.value"></el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="所属地区" prop="area">
         <el-select v-model="form.store.provinceId"  @change="provinceChangerHandler" placeholder="请选择省" class="w100">
          <el-option
            v-for="(item, index) in countList.provinceList"
            :key="index"
            :label="item.label"
            :value="item.value"></el-option>
        </el-select>
        <el-select v-model="form.store.cityId"  @change="cityChangerHandler" placeholder="请选择市" class="w100">
          <el-option
            v-for="(item, index) in countList.cityList"
            :key="index"
            :label="item.label"
            :value="item.value"></el-option>
        </el-select>
        <el-select v-model="form.store.countyId"  @change="countyChangerHandler" placeholder="请选择区" class="w100">
          <el-option
            v-for="(item, index) in countList.countList"
            :key="index"
            :label="item.label"
            :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属门店" prop="storeId">
         <el-select
            filterable
            v-model="form.store.storeId"
            @change="storeChangeHandler"
            placeholder="请选择">
          <el-option
            v-for="(item, index) in storeList"
            :key="index"
            :label="item.label"
            :value="item.value"></el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <!-- 操作按钮 -->
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" v-yxyEnter='submit'>保 存</el-button>
      <el-button @click='cancel'>取 消</el-button>
    </div>

  </div>
</template>

<script>
  import { member, common, basic } from '@/api';

  export default {
    data() {
      return {
        form: {
          store: {
            regionId: '',
            agentId: '',
            agentName: ''
          },
          level: {
            levelId: ''
          }
        },
        rules: {
          storeId: [
            { required: true, message: '请选择所属门店', trigger: 'change' },
          ]
        },
        areaList: [],
        agentList: [],
        memberLevelList: [],
        channelList: [],
        list: [
          {
            label: '正常',
            value: true
          },
          {
            label: '禁用',
            value: false
          }
        ],
        countList: {
          provinceList: [],
          provinceCode: '',
          cityList: [],
          cityCode: '',
          countList: [],
          countCode: ''
        },
        storeList: []
      };
    },
    filters: {
      sex(value) {
        return value ? '男' : '女';
      }
    },
    created() {
      this.getDetail();
      this.getRegionList();
      // this.getAgentList()
      this.getRuleType();
      this.getMemberLevelList();
    },
    methods: {
      // 提交
      submit() {
        this.$refs['userForm'].validate((valid) => {
          if (valid) {
            member.UpdateMember(this.form).then((res) => {
              if (res.data.code === 0) {
                this.$message({
                  type: 'success',
                  message: '修改成功'
                });
              }
            });
          }
        });
      },
      // 取消
      cancel() {
        this.$router.back(-1);
      },
      // 获取会员详情
      getDetail() {
        let memberId = this.$route.params.memberId;
        member.getMemberDetail(memberId).then((res) => {
          if (res.data.code === 0) {
            this.form = res.data.data;
            if (this.form.store) {
              this.form.storeId = this.form.store.storeId;
              this.getAreaList(this.form.store.regionId);
              this.getCityList(this.form.store.provinceId);
              this.getCountyList(this.form.store.cityId);
              this.getShopList();
            } else {
              this.form.store = {
                regionId: '',
                agentId: '',
                agentName: '',
                storeId: ''
              };
            }

          }
        });
      },
      // 获取会员等级列表
      getMemberLevelList() {
        member.getMemberLevelList().then((res) => {
          if (res.data.code === 0) {
            const list = res.data.data;
            this.memberLevelList = list.map((item) => ({
              label: item.name,
              value: item.levelId,
            }));
          }
        });
      },
      // 获取渠道列表
      getRuleType() {
        common.getChannelTypeList().then((res) => {
          if (res.data.code === 0) {
            const list = res.data.data;
            this.channelList = list.map((item) => ({
              label: item.channelName,
              value: item.channelId,
            }));
          }
        });
      },
      // 获取所属大区
      getRegionList() {
        common.getAreaList(0).then((res) => {
          if (res.data.code === 0) {
            const list = res.data.data;
            this.areaList = list.map((item) => ({
              label: item.areaName,
              value: item.areaId,
            }));
          }
        });
      },
      // 获取省
      getAreaList(areaId) {
        common.getAreaDetailList(areaId).then((res) => {
          if (res.data.code === 0) {
            const list = res.data.data;
            this.countList.provinceList = list.map((item) => ({
              label: item.areaName,
              value: item.areaId,
            }));
          }
        });
      },
      // 获取市
      getCityList(provinceId) {
        common.getAreaDetailList(provinceId).then((res) => {
          if (res.data.code === 0) {
            const list = res.data.data;
            this.countList.cityList = list.map((item) => ({
              label: item.areaName,
              value: item.areaId,
            }));
          }
        });
      },
      // 获取区
      getCountyList(cityId) {
        common.getAreaDetailList(cityId).then((res) => {
          if (res.data.code === 0) {
            const list = res.data.data;
            this.countList.countList = list.map((item) => ({
              label: item.areaName,
              value: item.areaId,
            }));
          }
        });
      },
      // 代理商列表
      getAgentList() {
        common.getAgentList().then((res) => {
          if (res.data.code === 0) {
            const list = res.data.data;
            this.agentList = list.map((item) => ({
              label: item.agentName,
              value: item.agentId,
            }));
          }
        });
      },
      // 门店列表
      getShopList() {
        let param = {
          regionId: this.form.store.regionId,
          provinceId: this.form.store.provinceId,
          cityId: this.form.store.cityId,
          countyId: this.form.store.countyId,
          pageIndex: 1,
          pageSize: 99
        };
        basic.getStoreList(param).then((res) => {
          if (res.data.code === 0) {
            const list = res.data.data.records;
            this.storeList = list.map((item) => ({
              label: item.storeName,
              value: item.storeId,
            }));
          }
        });
      },
      // 大区改变
      regionChangerHandler(val) {
        this.form.store.regionId = val;
        this.form.store.provinceId = '';
        this.form.store.cityId = '';
        this.form.store.countyId = '';
        this.form.store.storeId = '';
        this.form.storeId = '';
        this.getAreaList(this.form.store.regionId);
        this.getShopList();
      },
      // 省改变
      provinceChangerHandler(val) {
        this.form.store.provinceId = val;
        this.form.store.cityId = '';
        this.form.store.countyId = '';
        this.form.store.storeId = '';
        this.form.storeId = '';
        this.getCityList(this.form.store.provinceId);
        this.getShopList();
      },
      // 市改变
      cityChangerHandler(val) {
        this.form.store.cityId = val;
        this.form.store.countyId = '';
        this.form.store.storeId = '';
        this.form.storeId = '';
        this.getCountyList(this.form.store.cityId);
        this.getShopList();
      },
      // 区改变
      countyChangerHandler(val) {
        this.form.store.countyId = val;
        this.form.store.storeId = '';
        this.form.storeId = '';
        this.getShopList();
      },
      // 门店改变
      storeChangeHandler(val) {
        this.form.store.storeId = Number(val);
        this.form.storeId = val;
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .yxy-view-password {
    cursor: pointer;
  }
  .yxy-view-password:hover {
    color: #303133;
  }
  /* 部门输入框样式 */
  .department-input {
    -webkit-appearance: none;
    /* background-color: #f6f7fa; */
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 1;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
  }
  .department-input:hover {
    cursor: pointer;
  }

  /* 更改文档流方向 */
  .el-form {
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flex;
    display: -o-flex;
    display: flex;
    -webkit-flex-direction: column;
    -moz-flex-direction: column;
    -ms-flex-direction: column;
    -o-flex-direction: column;
    flex-direction: column;
    -webkit-flex-wrap: wrap;
    -moz-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    -o-flex-wrap: wrap;
    flex-wrap: wrap;
    height: 500px;
  }
  .el-form-item {
    width: 50%;
  }
  .form .el-input, .department-input {
    width: 300px;
  }

  /* 底部按钮居中 */
  .dialog-footer {
    text-align: center;
  }

  .tree-header {
    color: red;
  }
</style>
