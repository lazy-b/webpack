/**
 * File: index.js
 * Project: yxy-admin
 * File Created: 2018-02-05 12:59:05 am
 * Author: lazy1993 (2280042554@qq.com)
 * -----
 * Last Modified: 2018-02-05 1:02:42 am
 * Modified By: lazy1993 (2280042554@qq.com>) (<<git>>)
 * -----
 * Copyright © 2017 - MeiCloud, MeiCloud
 */
export const pagination = {
  data() {
    return {
      // 用户列表分页信息
      pagination: {
        total: 0,
        pageSizes: [5, 10, 20, 50],
        pageSize: 10,
        currentPage: 1,
      },
    };
  },
  methods: {
    /**
       * 分页栏分页大小改变处理程序
       * @param  {Number} val 新的分页大小
       * @return {undefined}     暂时没有返回值
       */
    handleSizeChange(val) {
      this.pagination.pageSize = val;
      this.getData();
    },
    /**
       * 分页栏当前页码改变处理程序
       * @param  {Number} val 改变后的页码值
       * @return {undefined}     暂时没有返回值
       */
    currentChangeHandler(val) {
      this.pagination.currentPage = val;
      this.getData();
    },
    // 获取序号
    getTableIndex(val) {
      let pageNumber = (this.pagination.currentPage - 1) * this.pagination.pageSize;
      return pageNumber + val + 1;
    }
  }
};
