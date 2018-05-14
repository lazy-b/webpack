<template>
  <div>
    <!-- <page-nav></page-nav> -->
    <div class="app-container pannel__content">
      <div v-if="isAddDic" class="add-block">
        <div class="add-block-title">\{{dicTitle}}</div>
        <el-form :inline="true" ref="dicForm" :model="dicForm" label-position="right" label-width="100px">
          <el-form-item label="名称 ：" prop="name" :rules="[
            { required: true, message: '请输入名称'},
            { max: 30, message: '最多输入30个字符', trigger: 'blur'}
          ]">
            <el-input placeholder="" v-model="dicForm.name"></el-input>

          </el-form-item>
          <el-form-item label="值：" prop="item" :rules="[
            { required: true, message: '请输入值'},
            { max: 30, message: '最多输入30个字符', trigger: 'blur'}
          ]">
            <el-input placeholder="" v-model="dicForm.item"></el-input>

          </el-form-item>

          <el-form-item>
            <el-button type="primary" size="small" @click="doUpdateDic">保存</el-button>
            <el-button size="small" @click="cancelDic">取消</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div v-if="isAddDicVal" class="add-block">
        <div class="add-block-title">\{{dicValTitle}}</div>
        <el-form :inline="true" ref="dicValForm" :model="dicValForm" label-position="right" label-width="100px">
          <el-form-item label="键 ：" prop="label" :rules="[
            { required: true, message: '请输入键名'},
            { max: 30, message: '最多输入30个字符', trigger: 'blur'}
          ]">
            <el-input placeholder="" v-model="dicValForm.label"></el-input>

          </el-form-item>
          <el-form-item label="值：" prop="value" :rules="[
            { required: true, message: '请输入值'},
            { max: 30, message: '最多输入30个字符', trigger: 'blur'}
          ]">
            <el-input placeholder="" v-model="dicValForm.value"></el-input>

          </el-form-item>

          <el-form-item>
            <el-button type="primary" size="small" @click="doUpdateDicVal">保存</el-button>
            <el-button size="small" @click="cancelDicVal">取消</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div>
        <el-row :gutter="20" class="mt20">
          <el-col :span="8">
            <div class="clearfix">
              <div class="table-head fl">
                字典项列表
              </div>
            </div>
            <div class="mt10 list-head">
              <el-input placeholder="请输入搜索条件" v-model="searchParam" @focus="showSearchIcon">
                <el-button slot="append" icon="el-icon-search" title="查询" class="append-btn" @click="search('click')" v-if="picSearch"></el-button>
                <el-button slot="append" icon="el-icon-close" class="append-btn" title="重置" @click="search('reset')" v-else></el-button>
              </el-input>
              <!--<div class="pic-plus" title="添加字典" @click="updateDic">
                <i class="el-icon-plus"></i>
              </div>-->
            </div>
            <div class="dic-list y-scroll">
              <div class="dic-row" v-for="item in dicList" :key="item.dictKeyId" :class="{selRow:item.dictKeyId == currentDicId}">
                <!-- <div class="dic-row-edit" title="修改" @click="updateDic(item)">
                  <i class="el-icon-edit"></i>
                </div> -->
                <span class="dic-row-name" @click="getDicVal(item)">\{{item.name}}</span>
                <span class="fr dic-row-sel" :class="{noSelIcon:item.dictKeyId !== currentDicId}"><i class="el-icon-check"></i></span>
              </div>
            </div>
          </el-col>
          <el-col :span="16">
            <div class="clearfix">
              <div class="table-head fl">
                \{{selDic.name}}
              </div>
            </div>

            <div class="mt10">
              <el-table :data="dicValList" class="wp100">
                <el-table-column align="center" prop="item" label="字典项">
                </el-table-column>
                <el-table-column align="center" prop="label" label="键">
                </el-table-column>
                <el-table-column align="center" prop="value" label="值">
                </el-table-column>
                <!-- <el-table-column align="center" label="操作">
                  <template slot-scope="scope"> -->
                    <!-- <el-button type="text" size="small" @click="isEnabled(scope.row)" v-if="!scope.row.enabled">启用</el-button>
                    <el-button type="text" size="small" @click="isEnabled(scope.row)" v-else>禁用</el-button> -->
                    <!-- <el-button type="text" size="small" @click="updateDicVal(scope.row)">修改</el-button>
                  </template>
                </el-table-column> -->
              </el-table>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>

  </div>
</template>
<script>
  import { dictionaries } from '@/api';

  export default {
    data() {
      return {
        currentDicId: 0, // 当前所选字典键值id
        isAddDic: false,
        searchParam: '',
        picSearch: true,
        dicList: [],
        dicTitle: '',
        dicValList: [],
        // 新增/修改字典键值
        dicForm: {
          id: '',
          name: '',
          value: ''
        },
        // 所选键值
        selDic: {
          name: '',
          item: ''
        },
        selDicPagation: {
          pageIndex: 1,
          pageSize: 9999,
          total: 0
        },
        isAddDicVal: false,
        dicValForm: {
          id: '',
          name: '',
          value: '',
          key: ''
        },
        dicValTitle: '',
        dicValPagation: {
          pageIndex: 1,
          pageSize: 10,
          total: 0
        }
      };
    },

    methods: {
      showSearchIcon() {
        this.picSearch = true;
      },
      // 搜索字典项
      search(str) {
        let that = this;
        if (str === 'reset') {
          that.searchParam = '';
          that.picSearch = true;
          that.getDicList();
        } else if (str === 'click' && that.searchParam) {
          that.picSearch = false;
          that.getDicList();
        }
      },
      // 获取字典项列表
      getDicList() {
        let data = {
          search: this.searchParam,
          pageIndex: this.dicValPagation.pageIndex,
          pageSize: this.dicValPagation.pageSize
        };
        dictionaries.getKeyList(data).then((res) => {
          if (res.data.code === 0) {
            let data = res.data.data;
            this.dicValPagation.total = data.total;
            this.dicList = data.records;
            if (this.dicList.length > 0) {
              this.currentDicId = this.dicList[0].dictKeyId;
              this.selDic = this.dicList[0];
              this.getDicValList();
            } else {
              this.dicValList = [];
            }
          }
        });
      },
      //  修改字典项
      updateDic(item) {
        let that = this;
        if (item.dictKeyId) {
          that.dicForm = item;
          that.dicTitle = '修改字典项';
        } else {
          that.resetDic();
          that.dicTitle = '新增字典项';
        }
        that.isAddDic = true;
        that.isAddDicVal = false;
        that.cancelDicVal();
      },
      // 新增/编辑字典项
      doUpdateDic() {
        this.$refs.dicForm.validate((valid) => {
          if (valid) {
            this.selDic = this.dicForm;
            dictionaries.updateKey(this.selDic).then((res) => {
              if (res.data.code === 0) {
                this.$message({
                  type: 'success',
                  message: '修改字典项'
                });
                this.getDicList();
              }
            });
          }
        });
      },
      // 取消字典项
      cancelDic() {
        this.isAddDic = false;
        this.resetDic();
      },
      // 重置字典项
      resetDic() {
        this.dicForm = {
          id: '',
          name: '',
          value: ''
        };
      },
      // 点击字典键
      getDicVal(item) {
        this.currentDicId = item.dictKeyId;
        this.selDic = item;
        this.isAddDicVal = false;
        this.getDicValList();
      },
      // 获取字典值列表
      getDicValList() {
        let data = {
          pageIndex: this.selDicPagation.pageIndex,
          pageSize: this.selDicPagation.pageSize
        };
        dictionaries.getValueList(this.selDic.item, data).then((res) => {
          if (res.data.code === 0) {
            this.dicValList = res.data.data.records;
          }
        });
      },
      // 启用/禁用
      isEnabled(row) {
      },
      // 选择键值
      updateDicVal(item) {
        let that = this;
        if (item.dictValueId) {
          that.dicValForm = item;
          that.dicValForm.dictValueId = String(item.dictValueId);
          that.dicValTitle = '修改键值';
        } else {
          that.resetDicVal();
          that.dicValTitle = '新增键值';
        }
        that.isAddDicVal = true;
        that.isAddDic = false;
        that.cancelDic();
      },

      // 保存键值
      doUpdateDicVal() {
        this.$refs.dicValForm.validate((valid) => {
          if (valid) {
            dictionaries.updateValue(this.dicValForm).then((res) => {
              if (res.data.code === 0) {
                this.$message({
                  type: 'success',
                  message: '修改字典值'
                });
                this.getDicValList();
              }
            });
          }
        });
      },
      cancelDicVal() {
        this.isAddDicVal = false;
        // this.resetDicVal();
      },
      resetDicVal() {
        this.dicValForm = {
          id: '',
          name: '',
          value: '',
          key: ''
        };
      },
    },
    mounted() {
      this.getDicList();
    }
  };
</script>
<style lang="scss" scoped>
  .pannel__title {
    height: 75px;
    line-height: 75px;
    font-size: 16px;
    color: rgb(18, 18, 18);
    padding: 0px 35px;
    background: linear-gradient(rgb(239, 241, 243), rgb(255, 255, 255)) rgb(249, 249, 249);
  }

  .add-block {
    background-color: #efefef;
    padding: 10px;
    margin-top: 10px;
    &-title {
      font-size: 16px;
    }
  }

  .list-title {
    padding: 3px 0px;
    font-size: 14px;
    color: #666;
  }

  .list-head {
    width: 100%;
    height: 40px;
    border: 1px solid #EAEEFB;
    border-bottom: 0;
    .el-input-group {
      margin: 5px 0 0 5px;
      width: 80%;
    }
    .pic-plus {
      float: right;
      margin-top: 10px;
      height: 20px;
      padding: 0 5px 0 5px;
      cursor: pointer;
    }
  }

  .table-head {
    color: #333;
    font-size: 14px;
  }

  .dic-list {
    border: 1px solid #EAEEFB;
    color: #666;
    border-bottom: 0;
    .dic-row {
      height: 30px;
      border-bottom: 1px solid #EAEEFB;
      &-edit {
        display: inline-block;
        padding: 0 5px 0 5px;
        cursor: pointer;
      }
      &-name {
        display: inline-block;
        width: 80%;
        line-height: 30px;
        margin-left: 5px;
        cursor: pointer;
      }
      &-sel {
        margin: 5px 5px 0 0;
      }
      &:hover {
        background-color: #f4f5f9;
      }
    }
  }

  .y-scroll {
    max-height: 500px;
    overflow-y: auto;
    width: 100%;
  }

  .selRow {
    background-color: #f4f5f9;
  }

  .noSelIcon {
    display: none;
  }

  .dic-row-sel {
    margin-top: 10px;
  }

  .add-block-title {
    color: #333;
    margin-bottom: 20px;
  }
</style>
