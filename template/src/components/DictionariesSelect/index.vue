<template>
  <el-select
    :value="value"
    :filterable='filterable'
    @change='changeHandler'
    :clearable='clearable'
    :placeholder='placeHolder'>
    <el-option
      v-for='item in options'
      :key='item.value'
      :label='item.label'
      :value='item.value'>
    </el-option>
  </el-select>
</template>

<script>
  // import map from './map';
  // import { dictionarySelects } from '@/api';
  import { setDictList, getDictList } from '@/utils';

  export default {
    name: 'YxyDicSelect',
    data() {
      return {
        // 候选值
        options: []
      };
    },
    props: {
      placeholder: {
        type: String
      },
      // 字典类型
      type: {
        type: String,
        required: true
      },
      // 是否可筛选
      filterable: {
        type: Boolean,
        default: true
      },
      // 是否可清除
      clearable: {
        type: Boolean,
        default: true
      },
      // 输入框显示值
      value: ''
    },
    computed: {
      placeHolder() {
        // let name = map[this.type];
        // name = name ? name : '';
        // return this.placeholder ? this.placeholder : ('请选择' + name);
        let placeHolder = '请选择';
        if (this.options.length > 0) {
          placeHolder += this.options[0].description;
        }

        return this.placeholder ? this.placeholder : placeHolder;
      }
    },
    methods: {
      /** 获取备选值 */
      getData() {
        const type = this.type;

        if (!type) {
          return;
        }
        this.options = getDictList(type);
      },
      /** 当前选中值改变处理程序 */
      changeHandler(val) {
        this.$emit('input', val);
        this.$emit('change', val);
      }
    },
    mounted() {
      this.$nextTick(function() {
        // 先请求数据字典,然后再请求数据
        setDictList(this.type).then(res => {
          this.getData();
        });
      });
    }
  };
</script>

<style scoped>

</style>
