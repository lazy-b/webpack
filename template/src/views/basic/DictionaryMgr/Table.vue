<template>
  <!-- 右侧表格部分 -->
  <div class="app-container">
    <div class="filter-container">
      <el-form label-width="80px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="字典名称">
              <el-input  placeholder="请输入字典名称" v-model="searchObject.value"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16" class="text-left">
            <el-button  class="filter-item" v-yxyEnter='searchHandler' icon="el-icon-search">查询</el-button>
            <el-button type="primary" class="filter-item" @click.stop='addHandler' icon="el-icon-plus">新增</el-button>
            <el-button type="danger" class="filter-item" @click.stop='deleteData' icon="el-icon-delete">批量删除</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
  <div class="yxy-table">
    <!-- 表格主体 -->
    <div class="yxy-main">
      <el-table
        :data='sourceData'
        border
        @selection-change='handleSelectionChange'
        style="width: 100%">

        <!-- 选择框 -->
        <el-table-column
          type="selection"
          align="center"
          width="40">
        </el-table-column>

        <!-- 展示数据 -->
        <el-table-column
          prop="id"
          align="center"
          label="ID"
          width="60">
        </el-table-column>
        <el-table-column
          prop="name"
          align="center"
          label="字典名称"
          width="160">
        </el-table-column>
        <el-table-column
          prop="value"
          align="center"
          label="数据值"
          width="160">
        </el-table-column>
        <el-table-column
          prop="parentId"
          align="center"
          label="上级ID"
          width="80">
        </el-table-column>
        <el-table-column
          prop="delFlag"
          align="center"
          label="状态"
          width="80">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.delFlag == 1 ? 'primary' : 'danger'"
              close-transition>\{{scope.row.delFlag == 1 ? '正常' : '已删'}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型"
          align="center"
          width="160">
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述"
          align="center"
          show-overflow-tooltip
          width="200">
        </el-table-column>
        <el-table-column
          prop="createBy"
          label="创建人"
          align="center"
          show-overflow-tooltip
          width="60">
        </el-table-column>
        <el-table-column
          prop="createDate"
          label="创建日期"
          :formatter='formatterData'
          align="center"
          show-overflow-tooltip
          width="120">
        </el-table-column>
        <el-table-column
          prop="updateBy"
          label="更新人"
          align="center"
          show-overflow-tooltip
          width="60">
        </el-table-column>
        <el-table-column
          prop="updateDate"
          label="更新日期"
          :formatter='formatterData'
          align="center"
          show-overflow-tooltip
          width="120">
        </el-table-column>
        <el-table-column
          prop="remarks"
          align="center"
          label="备注信息"
          show-overflow-tooltip
          width="200">
        </el-table-column>

        <!-- 操作按钮 -->
        <el-table-column
          min-width="200"
          fixed="right"
          align="center"
          label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click='handleEdit(scope.$index, scope.row)'>编辑</el-button>
            <el-button size="mini" type="text" @click='singleDelete(scope.row.id)'>删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 表格底部，主要是分页栏 -->
    <div class="footer">
     <div class="block text-right">
       <el-pagination
         @size-change='handleSizeChange'
         background
         @current-change='currentChangeHandler'
         :current-page='pagination.currentPage'
         :page-sizes='pagination.pageSizes'
         :page-size='pagination.pageSize'
         layout="total, sizes, prev, pager, next, jumper"
         :total='pagination.total'>
       </el-pagination>
     </div>
    </div>
  </div>
  </div>
</template>

<script>
  import { dictionaries } from '@/api';
  import { serialize } from '@/utils/serizlize';

  export default {
    props: {
      // 重新加载表格标识
      isReload: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      // 只要请求参数发生了改变，则发起数据请求
      // 避免在多个地方重复调用请求函数
      params: {
        handler(value, oldValue) {
          // 发起数据请求

          this.getData();
        },
        immediate: true,
        deep: true
      },
      // 值为真时再次发起请求数据请求
      isReload: {
        handler(value, oldValue) {
          if (value) {
            this.getData();
          }
        }
      }
    },
    data() {
      return {
        // 原始数据
        sourceData: [],
        // 多选框选中的值
        multipleSelection: [],

        // 分页信息
        pagination: {
          total: 0,
          pageSizes: [10, 20, 50, 100],
          pageSize: 20,
          currentPage: 1,
        },
        // 搜索参数
        searchObject: {
          type: 'keyword',
          value: ''
        },
        // 作为参数发送给后台的搜索参数
        searchForParams: {
          type: 'keyword',
          value: ''
        }
      };
    },
    computed: {
      /**
       * 请求的参数
       * @return {Object} 请求参数对象
       */
      params() {
        // 前端的index从1开始，后端从0开始
        const index = this.pagination.currentPage - 1;
        const size = this.pagination.pageSize;
        const searchType = this.searchForParams.type;
        const searchValue = this.searchForParams.value;
        const queryObject = {
          pageIndex: index,
          pageSize: size
        };

        if (searchValue) {
          queryObject[searchType] = searchValue;
        }

        return queryObject;
      }
    },
    methods: {
      /**
       * 获取数据
       * @return {undefined} undefined
       */
      getData() {
        const params = this.params;

        dictionaries.getList(params).then((res) => {
          // 后台返回的数据
          const resData = res.data;

          // 获取数据成功则进行操作
          if (resData.code === 0) {
            const sourceData = resData.data;

            // 设置原始数据
            this.sourceData = sourceData.dataList;
            // 设置数据总条数
            this.pagination.total = sourceData.totalCount;
          }
        }, (error) => {
          // debugger
          console.log(error);
        });
      },
      /**
       * 多选框选中处理事件
       * @param  {Array} val 选中的行数组
       * @return {undefined}     暂时没有返回值
       */
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      // 修改按钮处理程序，打开编辑弹窗
      handleEdit(index, row) {

        this.$emit('openDialog', row);
      },

      /**
       * 分页栏分页大小改变处理程序
       * @param  {Number} val 新的分页大小
       * @return {undefined}     暂时没有返回值
       */
      handleSizeChange(val) {
        this.pagination.pageSize = val;
      },
      /**
       * 分页栏当前页码改变处理程序
       * @param  {Number} val 改变后的页码值
       * @return {undefined}     暂时没有返回值
       */
      currentChangeHandler(val) {
        // if (this.sourceData.length > 0) {
        this.pagination.currentPage = val;
        // }
      },
      /**
       * 新增处理程序
       * 1、打开新增弹窗
       * 2、清除弹窗原有数据
       */
      addHandler() {
        this.$emit('openDialog');
      },
      /**
       * 删除
       * @return {undefinded} undefinded
       */
      deleteData() {
        const selections = this.multipleSelection;
        const len = this.multipleSelection.length;

        // 没有选择数据的时候提示并直接返回
        if (len === 0) {
          this.$message({
            type: 'warn',
            message: '请先选择一条数据'
          });

          return;
        }

        // 删除之前先做确认
        this.$confirm('此操作将删除' + len + '条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          closeOnClickModal: false
        }).then(() => {
          const dictIds = [];

          for (let i = 0; i < len; i++) {
            dictIds.push(selections[i].id);
          }

          this.deleteHandler(dictIds);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      /**
       * 单个删除
       * @return {undefinded} undefinded
       */
      singleDelete(id) {
        this.$confirm('此操作将删除该条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          closeOnClickModal: false
        }).then(() => {
          const dictIds = [id];

          this.deleteHandler(dictIds);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      /**
       * 删除处理程序
       * @return {undefinded} undefinded
       */
      deleteHandler(dictIds) {
        const data = {
          dictIds: dictIds
        };

        const postData = serialize(data);

        dictionaries.remove(postData).then((res) => {
          // 操作成功，做出提示并重新加载
          if (res.data.code === 0) {
            this.$message({
              type: 'success',
              message: '删除成功'
            });
            // 重新加载数据
            this.getData();
          } else {
            this.$message({
              type: 'error',
              message: '删除失败：' + res.data.msg
            });
          }
        });
      },

      /**
       * 查询处理程序
       * @return {undefinded} undefinded
       */
      searchHandler() {
        this.searchForParams.value = this.searchObject.value;
      },

      // 时间格式化函数
      formatterData(row, column, cellValue) {
        let result = '';

        if (cellValue) {
          const test = (cellValue + '').match(/(\d{4}-\d{2}-\d{2})(.*)/);

          result = test[1];
        }

        return result;
      },
    }
  };
</script>

<style scoped>
  .yxy-main {
    margin: 10px 0;
  }
</style>
