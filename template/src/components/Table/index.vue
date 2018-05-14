<template>
  <div>
    
    <!-- 顶部信息->搜索等 -->
    <div class="header">
      <!-- title和左侧部分不能同时存在 -->
      <div class="title h3" v-if="title">\{{ title }}</div>
      <div v-else><slot name="top-left"></slot></div>
      <!-- 右侧 -->
      <div><slot name="top-right"></slot> </div>
    </div>
    
    <!-- 留个接口扩展 -->
    <div><slot></slot></div>
    
    <!-- 主表格,使用父组件模板 -->
    <div class="main">
        <slot name="table" :data="data"></slot>
    </div>
    
    <!-- 页码 -->
    <div class="footer" v-if="hasPagination">
      <div class="pagination-container text-right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="currentChangeHandler"
          background
          small
          :current-page="pagination.currentPage"
          :page-sizes='pagination.pageSizes'
          :page-size='pagination.pageSize'
          layout="total, sizes, prev, pager, next, jumper"
          :total='total'>
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'index',
    props: {
      // 表格数据
      data: {
        type: Array,
        default() {
          return [];
        }
      },
      // 数据总条数
      total: {
        type: Number,
        default: 0
      },
      // 是否需要分页栏
      hasPagination: {
        type: Boolean,
        default: true
      },
      // table页面标题
      title: {
        type: String
      },
      // 是否需要搜索框
      hasSearcher: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        // 分页
        pagination: {
          pageSizes: [10, 20, 50, 100],
          pageSize: 10,
          currentPage: 1,
        }
      };
    },
    methods: {
      /** ------------------ 数据 ------------------  */
      /** 获取表格数据 */
      getTableData() {
        this.$emit('getTableData');
      },
      /** 分页栏分页大小改变处理程序 */
      handleSizeChange(val) {
        this.pagination.pageSize = val;
        this.getTableData();
      },
      /** 分页栏当前页码改变处理程序 */
      currentChangeHandler(val) {
        this.pagination.currentPage = val;
        this.getTableData();
      },
      /** 搜索处理程序 */
      searchHandler() {
        this.getTableData();
      }
    }
  };
</script>

<style scoped>
  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    vertical-align: center;
    margin-bottom: 10px;
  }
</style>
