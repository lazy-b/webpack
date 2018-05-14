<template>
  <div>
    
    <!-- input类型 -->
    <div v-if="targetType === 'input'">
      <el-input :disabled="disabled" @input="inputHandler" v-bind="$props"></el-input>
    </div>
    
    <!-- inputNumber类型 -->
    <div v-if="targetType === 'inputNumber'">
      <!--<el-input-number :disabled="disabled" @input="inputHandler" v-bind="$props"></el-input-number>-->
      <!-- 将element-ui组件的源码复制一份过来,然后修改数据处理部分代码,实现只能输入整数 -->
      <yxy-input-number :disabled="disabled" @input="inputHandler" v-bind="$props"></yxy-input-number>
    </div>
  
    <!-- timePicker类型 -->
    <div v-if="targetType === 'timePicker'" class="timePicker">
      <el-time-picker :disabled="disabled" @input="inputHandler" v-bind="$props"></el-time-picker>
    </div>
  
    <!-- select类型 -->
    <div v-if="targetType === 'select'">
      <el-select :disabled="disabled" @input="inputHandler" v-bind="$props">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
  import YxyInputNumber from './input-number';
  
  export default {
    name: 'BatchImport',
    components: { YxyInputNumber },
    directives: {},
    filters: {},
    mixins: {},
    props: {
      /** ----- 通用props ------ */
      // 数据值
      value: {},
      // 表单项类型
      targetType: {
        type: String,
        default: 'input'
      },
      // 不同值对应不同操作
      action: {
        type: Number,
        default: 0
      },
      name: String,
      label: String,
      /** ----- 专用props ------ */
      // select
      options: {
        type: Array,
        default() {
          return [];
        }
      },
      // inputNumber
      step: {
        type: Number,
        default: 1
      },
      max: {
        type: Number,
        default: Infinity
      },
      min: {
        type: Number,
        default: -Infinity
      },
      controls: {
        type: Boolean,
        default: true
      },
      controlsPosition: {
        type: String,
        default: ''
      },
      debounce: {
        type: Number,
        default: 300
      },
    },
    data() {
      return {
        // 表单项修改前的值(为了取消编辑的时候恢复值)
        oldValue: '',
        // 表单状态
        disabled: true,
      };
    },
    computed: {},
    watch: {
      action: {
        handler(val, oldVal) {
          // 操作1:编辑;操作2:取消编辑;操作3:保存
          switch (val) {
          case 1:
            this.editHandler();
            break;
          case 2:
            this.cancelHandler();
            break;
          case 3:
            this.saveHandler();
            break;
            // default:
            // 没有default
          }
        }
      }
    },
    created() {
  
    },
    mounted() {
    },
    methods: {
      /** --------------- 说明 -------------  */
      /** 输入处理程序 */
      inputHandler(val) {
        this.$emit('input', val);
      },
      /** 编辑处理程序 */
      editHandler() {
        this.oldValue = this.value;
        this.disabled = false;
      },
      /** 取消处理程序 */
      cancelHandler() {
        // debugger
        this.disabled = true;
  
        this.$emit('input', this.oldValue);
      },
      /** 保存处理程序 */
      saveHandler() {
        this.disabled = true;
      },
    }
  };
</script>

<style scoped>
</style>

