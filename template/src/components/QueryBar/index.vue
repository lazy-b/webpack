<template>
  <div>
    <ul class="query-container">
      <li v-for="(item, index) in queryArr" @click="setCurrent(item)" :key="index">
        <label :style="{'width': labelWidth+'px'}">\{{item.label}}</label>
        <div class="query-content" :style="{'width': item.queryType === 'dateRange' || item.queryType === 'date' && item.type === 'datetimerange' ? (+labelWidth + 10 + 300) +'px' : '150px'}">
          <el-input
            v-model="form[item.key]"
            v-if="item.queryType==='input'"
            v-bind="item"
            :maxlength="item.maxLength"
            placeholder="请输入"
            clearable
            @change="item.change"
            @blur="item.blur"
            @focus="item.focus"></el-input>
          <el-select
            v-model="form[item.key]"
            v-else-if="item.queryType==='select'"
            v-bind="item"
            clearable
            @change="item.change"
            @blur="item.blur"
            @focus="item.focus"
            @clear="item.clear">
            <el-option
              :label="i[item.labelKey||selectLabelKey]"
              :value="i[item.valueKey||selectValueKey]"
              v-for="i in item.list"
              :key="i[selectLabelKey]">
            </el-option>
          </el-select>
          <template v-else-if="item.queryType==='dateRange'">
            <template v-if="item.type === 'dataTime'">
              <el-date-picker
                v-model="form[item.list[0].key]"
                v-bind="item.list[0]"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择">
              </el-date-picker>
              <span class="pd10">至</span>
              <el-date-picker
                v-model="form[item.list[1].key]"
                v-bind="item.list[1]"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="请选择">
              </el-date-picker>
            </template>
            <template v-else>
              <el-date-picker
                v-model="form[item.list[0].key]"
                v-bind="item.list[0]"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="请选择">
              </el-date-picker>
              <span class="pd10">至</span>
              <el-date-picker
                v-model="form[item.list[1].key]"
                v-bind="item.list[1]"
                value-format="yyyy-MM-dd HH:mm:ss"
                placeholder="请选择">
              </el-date-picker>
            </template>
          </template>
          <yxy-dic-select
            v-model="form[item.key]"
            v-else-if="item.queryType==='dictSelect'"
            v-bind="item"
          ></yxy-dic-select>
          <template v-else-if="item.queryType==='numberRange'">
            <input-number
              v-model="form[item.list[0].key]"
              v-bind="item.list[0]"
              :controls="false">
            </input-number>
            <span class="pd10">至</span>
            <input-number
              v-model="form[item.list[1].key]"
              v-bind="item.list[1]"
              :controls="false">
            </input-number>
          </template>
          <template v-else-if="item.queryType==='tree'">
             <el-cascader placeholder="请选择" :options="item.list" :props="props" filterable change-on-select clearable :show-all-levels="false" @change="treeChangeHandler(item)" v-model="item.valueList"></el-cascader>
          </template>
        </div>
      </li>
    </ul>
    <div class="query-btn-container">
      <el-button type="primary" @click="query">查询</el-button>
      <el-button @click="reset">重置</el-button>
    </div>
  </div>

</template>
<script>
  import { serialize } from '@/utils/serizlize';
  import { deepClone } from '@/utils';
  import InputNumber from '@/components/EditableItem/input-number';
  export default {
    name: 'QueryBar',
    props: {
      queryList: {
        type: Array,
        required: true
      },
      labelWidth: {
        type: [Number, String],
        default: 80
      },
      selectLabelKey: {
        type: String,
        default: 'name'
      },
      selectValueKey: {
        type: String,
        default: 'value'
      },
      value: {
        type: Object
      }
    },
    data() {
      return {
        form: {},
        noop: function() {},
        current: {},
        props: {
          value: 'id'
        }
      };
    },
    components: {InputNumber},
    methods: {
      query() {
        this.$emit('query', serialize(this.form));
      },
      reset() {
        this.queryArr.forEach(item => {
          if (item.queryType === 'tree') {
            item.valueList = [];
          }
        });
        this.form = {};
        this.$emit('reset');
      },
      setCurrent(item) {
        this.current = item;
      },
      extend(target, source, extendKeyList = []) {
        extendKeyList.forEach((item) => {
          target[item] = source[item];
        });
        return target;
      },
      treeChangeHandler(val) {
        this.form[val.key] = val.valueList[val.valueList.length - 1];
      }
    },
    computed: {
      queryArr() {
        let vm = this;
        let result = deepClone(this.queryList);
        const extendKeyList = ['change', 'blur', 'focus', 'clear'];
        const getFun = (item) => {
          let funObj = this.extend({}, item, extendKeyList);
          for (let key in funObj) {
          // 级联选择值变化处理
            if (item.queryType === 'select' && key === 'change' && item.cascadeName) {
              let cascadeList = [];
              for (let query of this.queryList) {
                if (item.cascadeName === query.cascadeName && item.level < query.level) {
                  cascadeList.push(query.key);
                }
              }
              item[key] = function(value) {
                if (value === '') {
                  cascadeList.forEach((i) => {
                    vm.form[i] = '';
                  });
                }
                funObj[key] && funObj[key](value);
              };
            } else if (item.queryType === 'tree') {
              item[key] = [];
            } else {
              item[key] = function(value) {
                funObj[key] && funObj[key](value);
              };
            }
          }
        };
        for (let item of result) {
          if (!item.key) {
            if (item.list) {
              for (let li of item.list) {
                getFun(li);
              }
            }
          } else {
            getFun(item);
          }
        }
        return result;
      },
    },
    watch: {
      form: {
        handler(val) {
          this.$emit('query-data', serialize(val));
        },
        deep: true
      }
    }
  };
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .query-container {
    display: flex;
    flex-flow: row wrap;
    list-style: none;
    justify-content: space-around;
    margin: 0;
    padding: 0;
    li {
      display: flex;
      flex-flow: row nowrap;
      margin-bottom: 10px;
      label {
        line-height: 30px;
        text-align: right;
        margin-right: 10px;
      }
    }
    .query-content {
       width: 150px;
       display: flex;
       align-items: center;
    }
    .pd10{
      margin: 0 10px;
    }
  }

  .query-btn-container{
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
  }
</style>
