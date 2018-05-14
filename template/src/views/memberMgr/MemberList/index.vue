<template>
  <div class="app-container">
    <div>
      <div class="block__title block__title--mark ms-mb10">选择查询条件</div>
      <el-tabs type="border-card" @tab-click="flicterTapClick" v-model="activeName">
        <el-tab-pane name="baseInfo" label="基本信息">
          <div>
            <template >
              <div :class="{'tab-txt': true,'condition-select': el.select}" v-for="(el, index) in baseInfoList" :key="index" v-if="!el.hidden" @click="conditionClick(el.id,'baseInfo')">
                \{{el.value}}
                <div class="tab-txt--selected" v-show="el.select"></div>
                <i class="tab-txt__selected-icon" v-show="el.select">&radic;</i>
              </div>
            </template>
          </div>
        </el-tab-pane>
        <el-tab-pane :disabled="true" name="seniorFilter" label="高级筛选">
          <div>
          </div>
        </el-tab-pane>
        <el-tab-pane :disabled="true" name="membetTag" label="会员标签">
          <div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!--基本信息搜索条件-->
    <md-base-Info :filterTitle="filterTitle" :baseInfoTitle="baseInfoTitle" :baseInfoFormList="baseInfoFormList" 
    :errorMsg="errorMsg" @del="del" @provinceChange="provinceChangeHandler"></md-base-Info>
    <div class="ms-mt20 ms-mb20 text-center">
      <el-button class="letter-spacing" type="primary" v-show="isLoading != true" @click="queryHandler">查询</el-button>
      <el-button disabled="disabled" v-show="isLoading == true">查询中...</el-button>
      <el-button class="letter-spacing" @click="resetForm">重置</el-button>
    </div>

    <div class="table" v-show="true">
      <el-table
        :data="tableData.data"
        stripe
        border
        class="wp100">
        <el-table-column
          type="selection"
          width="50">
        </el-table-column>
        <el-table-column
          v-for="(item, index) in tableData.title"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :align="item.align">
          <template slot-scope="scope">
              <template v-if="scope.column.property === 'detailAddress'">
                <span>\{{!scope.row.provinceName ? '' : scope.row.provinceName + scope.row.cityName + scope.row.countyName}}</span>
              </template>
              <template v-else>
                <span>\{{scope.row[scope.column.property]}}</span>
              </template>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          align="center">
          <template slot-scope="scope">
           <el-button
              size="mini"
              type="text"
              @click="gotoDetail(scope.row.memberId)">
              详情
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="footer">
        <div class="pagination-container text-right">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="currentChangeHandler"
            background
            small
            :current-page="pagination.currentPage"
            :page-size='pagination.pageSize'
            layout="total, sizes, prev, pager, next, jumper"
            :total='pagination.total'>
          </el-pagination>
        </div>
      </div>
    </div>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="80"
      :before-close="handleClose">
      <template v-if="isGotoExportDialog">
        <span>文件生成中...是否跳转到导出进度查询页面？</span>
      </template>
      <template v-else>
        <span>是否导出查询数据？</span>
      </template>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="circomHandler">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import mdBaseInfo from '@/views/components/Member/components/baseInfo.vue';
import { pagination } from '@/mixins/table';
import { member, common } from '@/api';
export default {
  mixins: [pagination],
  components: {
    'mdBaseInfo': mdBaseInfo
  },
  data() {
    return {
      activeName: 'baseInfo',
      filterTitle: '基本信息',  // 筛选主题
      // 基本信息tab内容
      baseInfoList: [{
        id: 0,
        value: '手机号',
        select: true
      }, {
        id: 1,
        value: '姓名',
        select: false
      }, {
        id: 2,
        value: '性别',
        select: false
      }, {
        id: 3,
        value: '会员等级',
        select: false
      }, {
        id: 4,
        value: '生日',
        select: false
      }, {
        id: 5,
        value: '可用积分',
        select: false
      }, {
        id: 6,
        value: '所属大区',
        select: false
      }, {
        id: 7,
        value: '所属地区',
        select: false
      }, {
        id: 8,
        value: '所属代理商',
        select: false
      }, {
        id: 9,
        value: '所属店铺',
        select: false
      }, {
        id: 10,
        value: '关注公众号',
        select: false
      }, {
        id: 11,
        value: '注册时间',
        select: false
      }, {
        id: 12,
        value: '会员来源',
        select: false
      }, {
        id: 13,
        value: '会员状态',
        select: false
      }],
      // 基本信息查询条件
      baseInfoFormList: [
        {
          name: '手机号',
          id: 0,
          placeholder: '请输入手机号',
          value: '',
          show: true,
          inputType: 8
        }, {
          name: '姓名',
          id: 1,
          placeholder: '请输入姓名',
          value: '',
          show: false,
          inputType: 1 // 1 input  2 checkbox  3 radio  4 select  5  开始/结束日期  6 地区   7 数字范围  8 带校验的输入框
        }, {
          name: '性别',
          id: 2,
          value: '',
          show: false,
          inputType: 3,
          option: [
            {
              label: '男',
              value: 1
            },
            {
              label: '女',
              value: 2
            },
            {
              label: '未知',
              value: 0
            }
          ]
        }, {
          name: '会员等级',
          id: 3,
          value: '',
          list: [],
          show: false,
          inputType: 4
        }, {
          name: '生日',
          id: 4,
          value: {
            beginTime: '',
            endTime: '',
          },
          dataType: 1,
          show: false,
          inputType: 5
        },
        {
          name: '可用积分',
          id: 5,
          placeholder: ['最小积分', '最大积分'],
          value: {
            startNum: '',
            endNum: ''
          },
          show: false,
          inputType: 7
        },
        {
          name: '所属大区',
          id: 6,
          value: '',
          show: false,
          list: [],
          inputType: 4
        },
        {
          name: '所属地区',
          id: 7,
          provice: [],
          value: [{
            city: [],
            area: [],
            provinceAreaCode: '',
            cityAreaCode: '',
            countyAreaCode: ''
          }],
          show: false,
          inputType: 6
        },
        {
          name: '所属代理商',
          id: 8,
          value: '',
          show: false,
          list: [],
          inputType: 4
        }, 
        {
          name: '所属店铺',
          placeholder: '请输入所属店铺',
          id: 9,
          value: '',
          show: false,
          inputType: 1
        },
        {
          name: '关注公众号',
          id: 10,
          value: '',
          show: false,
          inputType: 3,
          option: [
            {
              label: '公众号A',
              value: 1
            },
            {
              label: '公众号B',
              value: 2
            }
          ]
        }, 
        {
          name: '注册时间',
          id: 11,
          value: {
            beginTime: '',
            endTime: '',
          },
          dataType: 1,
          show: false,
          inputType: 5
        }, 
        {
          name: '会员来源',
          id: 12,
          value: '',
          show: false,
          inputType: 2,
          option: [
            {
              label: '美的公众号',
              value: 1
            },
            {
              label: '美的APP',
              value: 2
            }
          ]
        }, 
        {
          name: '会员状态',
          id: 13,
          value: '',
          show: false,
          inputType: 3,
          option: [
            {
              label: '正常',
              value: 1
            },
            {
              label: '冻结',
              value: 2
            }
          ]
        }
      ],
      baseInfoTitle: true,
      form: {},
      // 错误提示信息
      errorMsg: {
        phone: false
      },
      dialogVisible: false,
      isLoading: false,
      isGotoExportDialog: false,
      tableData: {
        title: [
          {
            prop: 'name',
            label: '姓名',
            align: 'center',
            width: '100',
          },
          {
            prop: 'account',
            label: '会员账号',
            align: 'center',
            width: '100',
          },
          {
            prop: 'mobile',
            label: '手机号',
            width: '100',
            align: 'center'
          }, 
          {
            prop: 'grade',
            label: '会员等级',
            width: '100',
            align: 'center'
          }, 
          {
            prop: 'regionName',
            label: '大区',
            width: '100',
            align: 'center'
          },
          {
            prop: 'store',
            label: '所属门店',
            width: '150',
            align: 'center'
          },
          {
            prop: 'registerChannelName',
            label: '会员来源',
            width: '100',
            align: 'center'
          }, 
          {
            prop: 'registerTime',
            label: '注册时间',
            width: '100',
            align: 'center'
          }, 
          {
            prop: 'integral',
            label: '可用积分',
            width: '100',
            align: 'center'
          }
        ],
        data: []
      }
    };
  },
  created() {
    this.getMemberLevelList();
    this.getRuleType();
    this.getRegionList();
    this.getAreaList();
    this.getAgentList();
    this.getData();
  },
  methods: {
    // tap，切换筛选主题
    flicterTapClick(val) {
      this.filterTitle = val.label
    },
    // 查看会员详情
    gotoDetail(val) {
      this.$router.push({
        path: 'memberDetail/' + val
      });
    },
    // 点击搜索条件
    conditionClick(id, msg) {
      this.baseInfoFormList.forEach((item, index) => {
        if (item.id === id) {
          item.show = true;
          if (!this.baseInfoTitle) {
            this.baseInfoTitle = true;
          }
        }
      });
      this.baseInfoList[id].select = true;
    },
    // 删除搜索条件
    del(arr) {
      arr[0].show = false;
      this.baseInfoList[arr[0].id].select = false;
      this.baseInfoTitleIsShow();
      this.resetSingleOption(arr[0]);
    },
    baseInfoTitleIsShow() {
      for (let i = 0; i < this.baseInfoFormList.length; i++) {
        if (this.baseInfoFormList[i].show === true) {
          return false;
        }
      }
      this.baseInfoTitle = false;
    },
    // 隐藏搜索选项时重置该选项的值
    resetSingleOption(obj) {
      if (obj.inputType === 1 || obj.inputType === 3 || obj.inputType === 8 || obj.inputType === 4) {
        obj.value = '';
      } else if (obj.inputType === 2) {
        obj.value = [];
      } else if (obj.inputType === 5) {
        obj.value.beginTime = '';
        obj.value.endTime = '';
      } else if (obj.inputType === 6) {
        obj.value.forEach((item) => {
          item.city = [];
          item.area = [];
          item.provinceAreaCode = '';
          item.cityAreaCode = '';
          item.countyAreaCode = '';
        });
        this.getAgentList();
      } else if (obj.inputType === 7) {
        obj.value = {
          startNum: '',
          endNum: ''
        };
      }
    },
    // 查询
    queryHandler(form) {
      this.getData();
    },
    // 重置数据
    resetForm() {
      this.baseInfoFormList.forEach((item) => {
        this.del([item]);
      });
      member.getMemberList({}).then((res) => {
        if (res.data.code === 0) {
          const data = res.data.data;
          this.tableData.data = data.records;
          this.pagination.total = data.total;
        }
      });
    },
    // 查询数据参数
    getparams() {
      let param = {
        nickname: this.baseInfoFormList[2].value,
        ageEnd: this.baseInfoFormList[4].value.endNum,
        ageStart: this.baseInfoFormList[4].value.startNum,
        birthdayEnd: this.baseInfoFormList[3].value.endTime ? this.baseInfoFormList[3].value.endTime + ' 00:00:00' : null,
        birthdayStart: this.baseInfoFormList[3].value.beginTime ? this.baseInfoFormList[3].value.beginTime + ' 00:00:00' : null,
        cityId: this.baseInfoFormList[11].value[0].cityAreaCode,
        countyId: this.baseInfoFormList[11].value[0].countyAreaCode,
        grandPointEnd: this.baseInfoFormList[6].value.endNum,
        grandPointStart: this.baseInfoFormList[6].value.startNum,
        levelIdList: this.baseInfoFormList[5].value,
        mobile: this.baseInfoFormList[1].value,
        name: this.baseInfoFormList[0].value,
        pageIndex: this.pagination.currentPage,
        pageSize: this.pagination.pageSize,
        regionId: this.baseInfoFormList[10].value,
        storeAgentId: this.baseInfoFormList[12].value,
        provinceId: this.baseInfoFormList[11].value[0].provinceAreaCode,
        remainPointEnd: this.baseInfoFormList[7].value.endNum,
        remainPointStart: this.baseInfoFormList[7].value.startNum,
        scanTimesEnd: Number(this.baseInfoFormList[8].value.endNum),
        scanTimesStart: Number(this.baseInfoFormList[8].value.startNum)
      };
      // console.log(param)
      for (let i in param) {
        /* eslint-disable eqeqeq */
        if (param[i] == '') {
          param[i] = null;
        }
      }
      return param;
    },
    // 查询数据
    getData() {
      let param = this.getparams();
      member.getMemberList(param).then((res) => {
        if (res.data.code === 0) {
          const data = res.data.data;
          this.tableData.data = data.records;
          this.pagination.total = data.total;
        }
      });
    },
    // 导出
    exportHandler() {
      this.dialogVisible = true;
    },
    // 关闭弹窗
    handleClose() {
      this.dialogVisible = false;
      this.isGotoExportDialog = false;
    },
    // 确定弹窗
    circomHandler() {
      this.dialogVisible = false;
      if (!this.isGotoExportDialog) {
        let param = this.getparams();
        member.getMemberExport(param).then((res) => {
          if (res.data.code === 0) {
            this.$message({
              type: 'success',
              message: '导出成功'
            });
            this.isGotoExportDialog = true;
            this.dialogVisible = true;
          }
        });
      } else {
        this.isGotoExportDialog = false;
        this.$router.push({ name: '会员导出进度查询' });
      }
    },
    // 导出进度查询
    exportListHandler() {
      this.$router.push({ name: '会员导出进度查询' });
    },
    // 获取会员等级列表
    getMemberLevelList() {
      member.getMemberLevelList().then((res) => {
        if (res.data.code === 0) {
          const list = res.data.data;
          this.baseInfoFormList[5].option = list.map((item) => ({
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
          this.baseInfoFormList[9].list = list.map((item) => ({
            label: item.channelName,
            value: item.channelId,
          }));
        }
      });
    },
    // 获取所属大区
    getRegionList() {
      common.getAreaList(0).then((res) => {
        if (res && res.data.code === 0) {
          const list = res.data.data;
          this.baseInfoFormList[10].list = list.map((item) => ({
            label: item.areaName,
            value: item.areaId,
          }));
        }
      });
    },
    // 获取省
    getAreaList() {
      common.getAreaList(1).then((res) => {
        if (res && res.data.code === 0) {
          const list = res.data.data;
          this.baseInfoFormList[11].provice = list.map((item) => ({
            areaName: item.areaName,
            areaId: item.areaId,
          }));
          // let vo = list[0]
          // this.baseInfoFormList[11].value[0].provinceAreaCode = vo.areaId
          // this.getCityList(vo.areaId)
        }
      });
    },
    // 获取市
    getCityList(provinceId) {
      common.getAreaDetailList(provinceId).then((res) => {
        if (res && res.data.code === 0) {
          const list = res.data.data;
          this.baseInfoFormList[11].value[0].city = list.map((item) => ({
            areaName: item.areaName,
            areaId: item.areaId,
          }));
          let vo = list[0];
          this.baseInfoFormList[11].value[0].cityAreaCode = vo.areaId;
          this.getCountyList(vo.areaId);
        }
      });
    },
    // 获取区
    getCountyList(cityId) {
      common.getAreaDetailList(cityId).then((res) => {
        if (res && res.data.code === 0) {
          const list = res.data.data;
          this.baseInfoFormList[11].value[0].area = list.map((item) => ({
            areaName: item.areaName,
            areaId: item.areaId,
          }));
          let vo = list[0];
          this.baseInfoFormList[11].value[0].countyAreaCode = vo.areaId;
        }
      });
    },
    // 代理商列表
    getAgentList() {
      common.getAgentList(null).then((res) => {
        if (res && res.data.code === 0) {
          const list = res.data.data;
          this.baseInfoFormList[12].list = list.map((item) => ({
            label: item.agentName,
            value: item.agentId,
          }));
        }
      });
    },
    // 省改变回调
    provinceChangeHandler(regionCode) {
      common.getAgentList({parentId: regionCode}).then((res) => {
        if (res && res.data.code === 0) {
          const list = res.data.data;
          this.baseInfoFormList[12].list = list.map((item) => ({
            label: item.agentName,
            value: item.agentId,
          }));
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.block__title {
  overflow: hidden;
  font-size: 14px;
  color: #121212;
  &--mark::before {
      content: '';
      border-left: 3px solid #3aa2eb;
      padding-right: 5px;
  }
}
.tab-txt {
  position: relative;
  display: inline-block;
  padding: 5px 15px;
  margin: 5px;
  border: 1px solid #fff;
  background-color: #f2f2f2;
  cursor: pointer;
}

.tab-txt:hover {
  border: 1px solid #3aa2eb;
}

.tab-txt--selected {
  position: absolute;
  right: 0px;
  bottom: 0px;
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-bottom: 15px solid #3aa2eb;
}

.tab-txt__selected-icon {
    font-size: 12px;
    position: absolute;
    right: 0px;
    bottom: -2px;
    z-index: 20;
    color: #fff;
}

.condition-select {
  border: 1px solid #3aa2eb;
}
</style>
