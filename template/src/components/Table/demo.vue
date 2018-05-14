<template>
  <div class="app-container">
    
    <yxy-table
      :total="total"
      :searchForm="searchForm"
      :hasSearcherLeft="true"
      :data="data"
      @getTableData="getTableData">
      <!-- 头部左侧插槽 -->
      <div slot="top-left" class="import-and-export">
        <batch-import @uploadFiles="uploadFiles" :template="template">
          <template slot-scope="props">
            <el-button type="primary" @click="props.slotProps.visible = true">批量导入</el-button>
          </template>
        </batch-import>
        <el-button>导出</el-button>
      </div>
      <!-- 头部右侧插槽 -->
      <el-form
        :inline="true"
        :model="searchFormPre"
        slot="top-right">
        <el-form-item label="门店">
          <el-input  placeholder="支持模糊查询" v-model="searchFormPre.store"></el-input>
        </el-form-item>
        <el-form-item>
          <!--<div v-if="searchForm">-->
          <el-button class="filter-item" type="primary" @click="doSearch">搜索</el-button>
          <el-button class="filter-item" @click="resetHandler">重置</el-button>
          <!--</div>-->
        </el-form-item>
      </el-form>
      
      <!-- 主表格插槽 -->
      <el-table
        slot="table"
        slot-scope="props"
        :data="props.data"
        border
        style="width: 100%">
        
        <!-- 展示数据 -->
        <el-table-column
          prop="userId"
          fixed
          label="单品"
          min-width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="单品名称"
          min-width="160">
        </el-table-column>
        <el-table-column
          prop="username"
          label="品类(BO三级)"
          min-width="160">
        </el-table-column>
        <el-table-column
          prop="employeeNumber"
          label="品类(BO二级)"
          min-width="160">
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="品牌名称"
          min-width="160">
        </el-table-column>
        <el-table-column
          prop="idCardno"
          label="公司名称"
          min-width="160">
        </el-table-column>
        
        <!-- 操作按钮 -->
        <el-table-column
          min-width="120"
          align="center"
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text">
              上移
            </el-button>
            <el-button
              size="mini"
              type="text">
              下移
            </el-button>
          </template>
        </el-table-column>
      
      </el-table>
    </yxy-table>
  </div>
</template>

<script>
  import BatchImport from '@/components/BatchImport';
  import YxyTable from '@/components/Table';
  import { users } from '@/api';
  
  export default {
    name: 'important',
    components: {
      BatchImport,
      YxyTable
    },
    directives: {},
    filters: {},
    mixins: {},
    props: {},
    data() {
      return {
        // 表格数据(通过请求获得的数据)
        data: [],
        // 数据总条数
        total: 0,
        // 搜索数据
        searchForm: {
        },
        // 由于searchForm发生改变会立即发起请求,故使用该对象做缓存
        searchFormPre: {
          store: ''
        },
        // 文件上传页面的下载模板配置
        template: {}
      };
    },
    computed: {},
    watch: {},
    created() {
  
    },
    mounted() {
      this.$nextTick(function() {
        this.getTableData();
      });
    },
    methods: {
      /** 获取表格数据处理程序 */
      getTableData(params) {
        users.getList(params).then((res) => {
          // 后台返回的数据
          const resData = res.data;
  
          // 获取数据成功则进行操作
          if (resData.code === 0) {
            const sourceData = resData.data;
  
            // 设置原始数据
            this.data = sourceData.dataList;
            // 设置数据总条数
            this.total = sourceData.totalCount;
          }
        }, (error) => {
          // debugger
          console.log(error);
        });
      },
      /** 搜索处理程序 */
      doSearch() {
        // 子组件监听传入的searchForm字段,发生变化则做请求
        // 执行深复制,防止一次处理之后两者值自动同步
        this.searchForm = JSON.parse(JSON.stringify(this.searchFormPre));
      },
      /** 重置处理程序 */
      resetHandler() {
        this.searchFormPre = {
          store: ''
        };
  
        this.doSearch();
      },
      /** 手动上传文件上传文件 @param fileList 需要上传的文件列表 */
      uploadFiles(fileList) {
        // doUpload
        console.log(fileList);
      }
    }
  };
</script>

<style scoped>
  .el-form-item {
    margin: 0 10px;
  }
</style>
