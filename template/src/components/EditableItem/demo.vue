<template>
  <div class="section">
    <editable-item
      class="w300"
      targetType="inputNumber"
      v-model="value"
      :action="action"
    ></editable-item>
    
    <span v-show="action !== 1">
      <el-button type="text" @click="editHandler('action')">修改</el-button>
    </span>
    <span v-show="action === 1">
      <el-button type="text"  @click="cancelHandler('action')">取消</el-button>
      <el-button type="text" @click="saveHandler('action')">保存</el-button>
    </span>
  </div>
</template>

<script>
  import { editableItem } from '@/mixins/common';
  
  export default {
    components: {
      // EditableItem
    },
    mixins: [ editableItem ],
    data() {
      return {
        value: 1,
        action: 0
      };
    },
    methods: {
      // /** 修改按钮操作程序 */
      // editHandler(tag) {
      //   this.changeActions(tag, 1);
      // },
      // /** 修改按钮操作程序 */
      // cancelHandler(tag) {
      //   this.changeActions(tag, 2);
      // },
      // /** 修改按钮操作程序 */
      // saveHandler(tag) {
      //   this.changeActions(tag, 3);
      // },
      // /** 改变表单状态处理程序 */
      // changeActions(tag, number) {
      //   const objArr = tag.split('.');
  
      //   switch(objArr.length) {
      //     case 1:
      //       this[objArr[0]] = number;
      //       break;
      //     case 2:
      //       this[objArr[0]][objArr[1]] = number;
      //       break;
      //     // default:
      //     // 没有default
      //   }
      // },
    }
  };
</script>

<style >

</style>
