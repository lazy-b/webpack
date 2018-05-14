<template>
  <div>
    <el-table
      ref="elTable"
      :key='tableKey'
      :data="list"
      v-loading="listLoading"
      element-loading-text="加载中..."
      :border="border"
      :fit="fit"
      :stripe="stripe"
      :show-header="showHeader"
      :empty-text="emptyText"
      :max-height="maxHeight"
      :height="height"
      :highlight-current-row="highlightCurrentRow"
      @selection-change="_handleSelectionChange"
      @cell-click="_handleCellClick"
      @row-click="_handleRowClick"
      @header-click="_handleHeaderClick"
      style="width: 100%">
      <el-table-column v-if="showNumber" fixed="left" align="center" label="序号" width="65" type="index"></el-table-column>
      <el-table-column v-if="showCheckBox" fixed="left" align="center" width="65" type="selection"></el-table-column>
      <slot></slot>
    </el-table>
    <div v-show="!listLoading" class="pagination-container text-right" v-if="list.length>0">
      <el-pagination
        background
        @size-change="_handleSizeChange"
        @current-change="_handleCurrentChange"
        :page-count="pageCount"
        :current-page.sync="page"
        :page-sizes="[10,20,30, 50]"
        :page-size="listQuery.pageSize"
        layout="total,sizes, prev, pager, next,jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'pageTable',
    props: {
      fit: { // 列的宽度是否自撑开，参考eleemnt-ui table
        type: Boolean,
        default: true
      },
      border: { // 是否带有纵向边框，参考eleemnt-ui table
        type: Boolean,
        default: false
      },
      stripe: { // 是否为斑马纹 table，参考eleemnt-ui table
        type: Boolean,
        default: false
      },
      highlightCurrentRow: { // 是否要高亮当前行，参考eleemnt-ui table
        type: Boolean,
        default: false
      },
      showHeader: { // 是否显示表头，参考eleemnt-ui table
        type: Boolean,
        default: true
      },
      emptyText: { // 空数据时显示的文本内容，参考eleemnt-ui table
        type: String,
        default: '暂无数据'
      },
      defaultSort: { // 默认的排序列的prop和顺序，参考eleemnt-ui table
        type: Object,
        default: () => {
          return {};
        }
      },
      height: [String, Number], // 参考eleemnt-ui table
      maxHeight: [String, Number], // 参考eleemnt-ui table
      showNumber: { // 是否显示序号
        type: Boolean,
        default: false
      },
      showCheckBox: { // 是否显示复选框
        type: Boolean,
        default: false
      },
      params: { // 参数
        type: Object,
        default: () => {
          return {};
        }
      },
      pageSize: {
        type: Number,
        default: 20
      },
      dataFun: Function // 获取列表方法
    },
    data() {
      return {
        tableKey: 0,
        listLoading: true,
        list: [],
        pageCount: null,
        page: 1,
        total: null,
        listQuery: {
          pageIndex: 0,
          pageSize: this.pageSize
        }
      };
    },
    methods: {
      _getList(filters) { // 查询
        this.listLoading = true;
        this.listQuery = {...this.params, ...this.listQuery, ...filters};
        this.dataFun(this.listQuery).then(response => {
          this.list = response.data.data.records;
          this.total = response.data.data.total;
          this.pageCount = response.data.data.total;
          this.listLoading = false;
        });
      },
      _handleSizeChange(size) { // 分页
        this.listQuery.pageSize = size;
        this._getList();
      },
      _handleCurrentChange(currentPage) { // 分页
        this.page = currentPage;
        this.listQuery.pageIndex = currentPage - 1;
        this._getList();
      },
      _handleSelectionChange(selection) { // 勾选
        this.$emit('selection-change', selection);
      },
      _handleCellClick(row, column, cell, event) { // cell点击
        this.$emit('cell-click', row, column, cell, event);
      },
      _handleRowClick(row, event, column) { // row点击
        this.$emit('row-click', row, event, column);
      },
      _handleHeaderClick(column, event) { // header点击
        this.$emit('header-click', column, event);
      },
      clearSelection(selection) { // 清楚勾选
        this.$refs['elTable'].clearSelection(selection);
      },
      reload(filters) { // 重新加载
        this.listQuery = {
          pageIndex: 0,
          pageSize: this.pageSize
        };// 原来的还有其他查询条件
        this.page = 1;
        this._getList(filters);
      },
    },
    mounted() {
      this._getList();
    }
  };
</script>
