<template>
  <div>
    <div class="block__title block__title--mark ms-mt20">\{{ filterTitle }}</div>
    <section v-for="(el,index) in baseInfoFormList" :key="index" v-show="baseInfoTitle">
      <div v-if="el.show">
        <!--input-->
        <div class="ms-mt20 clearfix" v-if="el.inputType === 1">
          <div class="fl width-percent70">
            <label class="search-line__label">\{{el.name}}：</label>
            <div class="search-line__content">
              <el-input type="text" v-model="el.value" :placeholder="el.placeholder"></el-input>
            </div>
          </div>
          <div class="fr">
            <div class="search-line__btn">
              <el-button type="text" @click="del(el)"><i class="el-icon-delete"></i></el-button>
            </div>
          </div>
        </div>
        <!--input-->
        <div class="ms-mt20 clearfix" v-if="el.inputType === 8">
          <div class="fl width-percent70">
            <label class="search-line__label">\{{el.name}}：</label>
            <div class="search-line__content">
              <el-input type="tel" v-model="el.value" :placeholder="el.placeholder" :maxlength="11" @blur="phoneBlur(el.value)"></el-input>
            </div>
          </div>
          <div class="fl" v-show="errorMsg.phone">
            <span class="phone-err">请输入正确的手机号</span>
          </div>
          <div class="fr">
            <div class="search-line__btn">
              <el-button type="text" @click="del(el)"><i class="el-icon-delete"></i></el-button>
            </div>
          </div>
        </div>
        <!--checkbox-->
        <div class="ms-mt20 clearfix" v-else-if="el.inputType === 2">
          <div class="fl clearfix width-percent70">
            <label class="search-line__label fl mr5">\{{el.name}}：</label>
            <el-checkbox-group class="fl inline width-percent70" v-model="el.value" @change="checkChangeHandler">
              <el-checkbox v-for="it in el.option" :label="it.value" :key="it.value">\{{it.label}}</el-checkbox>
            </el-checkbox-group>
          </div>
          <div class="fr">
            <div class="search-line__btn">
              <el-button type="text" @click="del(el)"><i class="el-icon-delete"></i></el-button>

            </div>
          </div>
        </div>
        <!--radio-->
        <div class="ms-mt20 clearfix" v-else-if="el.inputType === 3">
          <div class="fl">
            <label class="search-line__label">\{{el.name}}：</label>
            <el-radio v-for="it in el.option" v-model="el.value" :label="it.value" :key="it.value">\{{it.label}}</el-radio>
          </div>
          <div class="fr">
            <div class="search-line__btn">
              <el-button type="text" @click="del(el)"><i class="el-icon-delete"></i></el-button>
            </div>
          </div>
        </div>

        <!--select-->
        <div class="ms-mt20 clearfix" v-else-if="el.inputType === 4">
          <div class="fl">
            <label class="search-line__label">\{{el.name}}：</label>
            <div class="inline">
              <el-select clearable filterable v-model="el.value" @change="selectChangeHandler" placeholder="请选择">
                <el-option v-for="(it, index) in el.list" :label="it.label" :value="it.value" :key="index"></el-option>
              </el-select>
            </div>
          </div>
          <div class="fr">
            <div class="search-line__btn">
              <el-button type="text" @click="del(el)"><i class="el-icon-delete"></i></el-button>
            </div>
          </div>
        </div>

        <!--数字范围-->
        <div class="ms-mt20 clearfix" v-else-if="el.inputType === 7">
          <div class="fl">
            <label class="search-line__label">\{{el.name}}：</label>
            <div class="search-line__input inline">
              <el-input type="number" v-model="el.value.startNum" :placeholder="el.placeholder[0]"></el-input>
            </div>
            <span>至</span>
            <div class="search-line__input inline">
              <el-input type="number" v-model="el.value.endNum" :placeholder="el.placeholder[1]"></el-input>
            </div>
          </div>
          <div class="fr">
            <div class="search-line__btn">
              <el-button type="text" @click="del(el)"><i class="el-icon-delete"></i></el-button>
            </div>
          </div>
        </div>

        <!--开始/结束时间-->
        <div class="ms-mt20 clearfix" v-else-if="el.inputType === 5">
          <div class="fl">
            <label class="search-line__label">\{{el.name}}：</label>
            <div class="inline">
              <template v-if="el.dataType === 1">
                  <el-date-picker type="date" value-format="yyyy-MM-dd" v-model="el.value.beginTime" placeholder="开始日期">
                </el-date-picker>
              </template>
              <template v-if="el.dataType === 2">
                <el-date-picker
                  type="datetime" value-format="yyyy-MM-dd HH:mm:ss" v-model="el.value.beginTime" placeholder="开始日期">
                </el-date-picker>
              </template>
              至
              <template v-if="el.dataType === 1">
                  <el-date-picker type="date" value-format="yyyy-MM-dd" v-model="el.value.endTime" placeholder="结束日期">
                </el-date-picker>
              </template>
               <template v-if="el.dataType === 2">
                 <el-date-picker type="datetime" value-format="yyyy-MM-dd HH:mm:ss" v-model="el.value.endTime" placeholder="结束日期">
              </el-date-picker>
              </template>
            </div>
          </div>
          <div class="fr">
            <div class="search-line__btn">
              <el-button type="text" @click="del(el)"><i class="el-icon-delete"></i></el-button>
            </div>
          </div>
        </div>
        <!--地区-->
        <div v-else-if="el.inputType === 6">
          <section v-for="(item, key) in el.value" :key="key">
            <div class="ms-mt20 clearfix">
              <div class="fl">
                <label class="search-line__label">\{{el.name}}：</label>
                <div class="inline">
                  <el-select clearable v-model="item.provinceAreaCode" @change="provinceCallBack(item.provinceAreaCode,el.value,key)" placeholder="--请选择省--">
                    <el-option v-for="it in el.provice" :label="it.areaName" :value="it.areaId" :key="it.areaId"></el-option>
                  </el-select>
                  <span class="space"></span>
                  <el-select clearable v-model="item.cityAreaCode" @change="cityCallBack(item.cityAreaCode,el.value,key)" placeholder="--请选择市--">
                    <el-option v-for="it in item.city" :label="it.areaName" :value="it.areaId" :key="it.areaId"></el-option>
                  </el-select>
                  <span class="space"></span>
                  <el-select clearable v-model="item.countyAreaCode" placeholder="--请选择区/县--">
                    <el-option v-for="it in item.area" :label="it.areaName" :value="it.areaId" :key="it.areaId"> </el-option>
                  </el-select>
                </div>
              </div>
              <div class="fr">
                <!-- <div class="search-line__btn" v-if="key==el.value.length - 1">
                  <el-button :plain="true" type="text" @click="add(el.value)"><i class="add-icon">+</i></el-button>
                  <el-button type="text" @click="multiLineDel(el.value,key,el)"><i class="el-icon-delete2"></i></el-button>
                </div> -->
                <div class="search-line__btn">
                  <el-button type="text" @click="del(el)"><i class="el-icon-delete"></i></el-button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
    <section class="no-option ms-mt20" v-show="!baseInfoTitle" >
      <span>点击上面选择筛选条件</span>
    </section>
  </div>
</template>

<script>
/**
* 动态筛选表单组件
* @desc 根据用户操作，自定义组合筛选条件，整合为一个表单
* @param {String} [filterTitle]    - 筛选主题（默认“基本信息”）
* @param {Boolean} [baseInfoTitle] - 是否有筛选的内容，ture显示筛选的表单，false显示默认提示框
* @param {Array} [baseInfoFormList] - 筛选的表单元素，item.show为true为显示，false为不显示
  item.inputType：1 input  2 checkbox  3 radio  4 select  5  开始/结束日期  6 地区   7 数字范围  8 带校验的输入框
* @param {Object} [errorMsg] - 错误提示信息
* @example 调用示例
*  <md-base-Info :baseInfoTitle="baseInfoTitle" :baseInfoFormList="baseInfoFormList" :errorMsg="errorMsg" 
    @del="del" @provinceChange="provinceChangeHandler"></md-base-Info>
*/
import { common } from '@/api';
  export default {
    name: 'BaseInfo',
    props: {
      filterTitle: {
        type: String,
        default: '基本信息'
      },
      baseInfoTitle: Boolean,
      baseInfoFormList: Array,
      errorMsg: Object
    },
    data() {
      return {

      };
    },
    mounted() {
      // this.getArea(0, 0, this.baseInfoFormList[11].value, 0);
      this.getSource();
    },
    methods: {
      // 单行条件删除
      del(obj) {
        this.$emit('del', [obj, 'baseInfo']);
      },
      // 有多行搜索条件删除
      multiLineDel(list, key, obj, msg) {
        if (key === 0) {
          this.del(obj);
        } else {
          list.splice(key, 1);
        }
      },
      // 添加点击的搜索条件
      add(list) {
        let that = this;
        let key = list.length;
        let obj = {
          city: [],
          area: [],
          provinceAreaCode: '',
          cityAreaCode: '',
          countyAreaCode: ''
        };
        list.push(obj);
        that.getArea(0, 0, list, key);

      },
      // 手机号检验
      phoneBlur(val) {
        let that = this;
        if (val !== '' && !(/^1[0-9]{10}$/.test(Number(val)))) {
          that.errorMsg.phone = true;
          setTimeout(() => {
            that.errorMsg.phone = false;
          }, 3000);
        } else {
          that.errorMsg.phone = false;
        }
      },
      // 省回调
      provinceCallBack(regionCode, list, key) {
        list[key].city = [];
        list[key].cityAreaCode = '';
        if (regionCode) {
          this.$emit('provinceChange', regionCode);
          this.getCityList(regionCode, list, key);
        // this.$emit('provinceCallBack', regionCode)
          // that.getArea(regionCode, 1, list, key);
        }
      },
      // 市回调
      cityCallBack(regionCode, list, key) {
        list[key].countyList = [];
        list[key].countyAreaCode = '';
        if (regionCode) {
          this.getCountyList(regionCode, list, key);
        // this.$emit('cityCallBack', regionCode)
          // that.getArea(regionCode, 2, list, key);
        }

      },
      // 获取省市区
      getArea(regionCode, type, list, key) {
        // var pm = {
        //   regionCode: regionCode || 0
        // };
        // that.$http.get(Api.common.getArea, {
        //   params: pm
        // }).then((rs) => {
        //   // rs.data = JSON.parse(rs.data);
        //   if(rs.data.code === 0) {
        //     var curLevel = type;
        //     if(curLevel == 0) {
        //       // 省
        //       that.baseInfoFormList[5].provice = rs.data.content.children;
        //       list[key].cityAreaCode = '';

        //     } else if(curLevel == 1) {
        //       // 市
        //       list[key].city = rs.data.content.children;
        //       list[key].countyAreaCode = '';
        //     } else if(curLevel == 2) {
        //       // 县、区
        //       list[key].area = rs.data.content.children;
        //     }
        //   } else {
        //     this.$message({
        //       showClose: true,
        //       message: rs.data.msg,
        //       type: 'error',
        //       duration: 3000
        //     });
        //   }
        // })
      },
      // 用户来源
      getSource() {
        // let that = this;
        // that.$http.get(Api.ccrm.getSource).then((rs) => {
        //   if(rs.data.code === 0) {
        //     that.baseInfoFormList[9].option = rs.data.data || [];
        //   }
        // })
      },
      checkChangeHandler() {
      // console.log(this.baseInfoFormList)
      },
      // 下拉数据改变
      selectChangeHandler() {
      // console.log(this.baseInfoFormList)
      },
      // 获取市
      getCityList(provinceId, cityList, key) {
        common.getAreaDetailList(provinceId).then((res) => {
          if (res.data.code === 0) {
            const list = res.data.data;
            cityList[key].city = list.map((item) => ({
              areaName: item.areaName,
              areaId: item.areaId,
            }));
          }
        });
      },
      // 获取区
      getCountyList(cityId, countyList, key) {
        common.getAreaDetailList(cityId).then((res) => {
          if (res.data.code === 0) {
            const list = res.data.data;
            countyList[key].area = list.map((item) => ({
              areaName: item.areaName,
              areaId: item.areaId,
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
.clearfix:after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden
}

.clearfix {
    *height: 1%;
    .fl{
      float: left;
    }
    .fr{
      float: right;
    }
}
.search-line__label {
    display: inline-block;
    width: 100px;
    text-align: right;
  }

  .search-line__content {
    display: inline-block;
    width: 50%;
  }

  .search-line__member-label {
    display: inline-block;
  }

  .inline {
    display: inline-block;
  }

  .search-line__label {
    display: inline-block;
    width: 100px;
    text-align: right;
  }

  .search-line__member-label {
    display: inline-block;
  }

  .width180 {
    width: 180px;
  }

  .width-percent70 {
    width: 70%
  }

  .mr5 {
    margin-right: 5px;
  }

  .el-checkbox+.el-checkbox {
    margin-left: 0;
  }

  .el-checkbox {
    display: inline-block;
    width: 30%;
    margin-right: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .el-date-editor.el-input {
    width: 180px;
  }

  .search-line__input {
    width: auto;
  }

  .space {
    display: inline-block;
    width: 23px;
    text-align: center;
  }

  .phone-err {
    margin-left: 20px;
    line-height: 30px;
    color: #f56c6c;
  }

  .el-tag {
    margin-right: 5px;
  }

  .el-checkbox {
    width: 20%;
  }

  .no-option {
    width: 100%;
    height: 150px;
    line-height: 150px;
    border: 1px solid #ccc;
    text-align: center;
    font-size: 24px;
  }
</style>
<style lang="scss">
// .el-input--suffix .el-input__inner {
//   padding-right: 0;
// }
</style>
