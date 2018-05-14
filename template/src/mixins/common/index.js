/**
 * File: index.js
 * Project: yxy-admin
 * File Created: 2018-02-05 12:59:05 am
 * Author: lazy1993 (2280042554@qq.com)
 * -----
 * Last Modified: 2018-02-05 10:49:25 am
 * Modified By: lazy1993 (2280042554@qq.com>) (<<git>>)
 * -----
 * Copyright © 2017 - MeiCloud, MeiCloud
 */
import EditableItem from '@/components/EditableItem';

export const editableItem = {
  components: {
    EditableItem
  },
  methods: {
    /** 修改按钮操作程序 */
    editHandler(tag) {
      this.changeActions(tag, 1);
    },
    /** 修改按钮操作程序 */
    cancelHandler(tag) {
      this.changeActions(tag, 2);
    },
    /** 修改按钮操作程序 */
    saveHandler(tag) {
      this.changeActions(tag, 3);
    },
    /** 改变表单状态处理程序 */
    changeActions(tag, number) {
      const objArr = tag.split('.');

      switch (objArr.length) {
      case 1:
        this[objArr[0]] = number;
        break;
      case 2:
        this[objArr[0]][objArr[1]] = number;
        break;
        // default:
        // 没有default
      }
    },
  }
};
