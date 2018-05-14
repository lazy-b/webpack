<template>
  <!-- 积分规则列表 -->
  <div>
    <!-- 搜索 -->
    <el-card class="rule-list-query">
      <query-bar
        :query-list="queryList"
        @query="queryHandler"
        @reset="reset"
      ></query-bar>
    </el-card>
    <!-- 表格 -->
    <el-card class="rule-list-table">
      <div class="ms-mb20">
        <el-button @click="addGetPointRuleHandler" type="primary">+ 新建积分获取规则</el-button>
        <el-button @click="addExchangePointRuleHandler" type="primary">+ 新建积分消耗规则</el-button>
      </div>
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          type="index"
          label="序号"
          width="80">
        </el-table-column>
        <el-table-column
          prop="channelName"
          label="适用渠道"
          width="180">
        </el-table-column>
        <el-table-column
          prop="pointRuleTypeName"
          label="规则类型"
          width="180">
        </el-table-column>
        <el-table-column
          prop="bonus"
          label="获取积分"
          width="180">
        </el-table-column>
        <el-table-column
          prop="description"
          label="说明"
          min-width="180">
        </el-table-column>
        <el-table-column
          label="状态"
          width="60">
          <template slot-scope="scope">
            \{{ scope.row.enable ? '正常' : '停用' }}
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editHandler(scope.row)">编辑</el-button>
            <el-button type="text" size="small" @click="deleteHandler(scope.row)">删除</el-button>
            <el-button type="text" size="small" @click="toggleHandler(scope.row)">
              \{{ scope.row.enable ? '停用' : '启用'  }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-container ms-text-right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="currentChangeHandler"
          background
          small
          :current-page="pagination.currentPage"
          :page-size='pagination.pageSize'
          layout="total, sizes, prev, pager, next, jumper"
          :total='pagination.total'
        ></el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
  import QueryBar from '@/components/QueryBar';
  import { pagination } from '@/mixins/table';
  import { memberServices } from '@/api';

  export default {
    name: 'PointsRule',
    components: { QueryBar },
    directives: {},
    filters: {},
    mixins: [ pagination ],
    props: {},
    data() {
      return {
        // 搜索条件
        queryList: [
          {
            key: 'pointRuleTypeId',
            label: '规则类型',
            queryType: 'select',
            list: []
          },
          {
            key: 'channelId',
            label: '渠道类型',
            queryType: 'select',
            list: []
          },
          {
            key: 'enable',
            label: '状态',
            queryType: 'select',
            list: [{
              value: true,
              name: '启用',
            }, {
              value: false,
              name: '禁用',
            }]
          },
        ],
        // 列表数据
        tableData: [
          {
            pointRuleId: 1, // number, 积分规则ID
            channelId: 1, // number, 渠道ID
            channelName: '集团', // string, 适用渠道
            pointRuleTypeId: 1, // number, 规则类型ID
            pointRuleTypeName: '注册', // string, 规则类型
            bonus: 5, // number, 获取积分
            description: '描述内容', // string, 描述信息
            enable: true, // boolean, 状态
          },
        ],
      };
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {
      this.$nextTick(function() {
        this.getBasicPointRuleTypeList();
        this.getBasicChannelList();
        this.getData();
      });
    },
    methods: {
      /** --------------- 说明 -------------  */
      /** 获取成长值规则类型列表 */
      getBasicPointRuleTypeList() {
        memberServices.getBasicPointRuleTypeList().then(res => {
          if (res.data.code === 0) {
            this.queryList[0].list = res.data.data;
          }
        });
      },
      /** 获取渠道列表 */
      getBasicChannelList() {
        memberServices.getBasicChannelList().then(res => {
          if (res.data.code === 0) {
            // 渠道类型搜索下拉列表
            this.queryList[1].list = res.data.data;
          }
        });
      },
      // 查询
      queryHandler(form) {
        this.getData(form);
      },
      // 重置
      reset() {
        this.getData();
      },
      // 查询列表数据
      getData(form) {
        const pagination = this.pagination;
        const params = {
          ...form,
          pageIndex: pagination.currentPage, // 页码 number 从1开始
          pageSize: pagination.pageSize, // 页面大小 number
        };

        memberServices.getPointRuleList(params).then(res => {
          if (res.data.code === 0) {
            const data = res.data;
            this.pagination.total = data.total;
            this.tableData = data.records;
          }
        });
      },
    },
    /** 新建积分获取按钮处理程序 */
    addGetPointRuleHandler() {
      this.$router.push({ name: 'getPointRuleMgr' });
    },
    /** 新建积分消耗按钮处理程序 */
    addExchangePointRuleHandler() {
      this.$router.push({ name: 'pointExchangeRuleMgr' });
    },
    /** 编辑按钮处理程序TODO:如何确定是编辑获取规则还是消耗规则 */
    editHandler(row) {
      this.$router.push({
        name: 'pointExchangeRuleMgr',
        params: {
          pointExchangeRuleId: row.pointExchangeRuleId,
        },
      });
    },
    /** 删除按钮处理程序 */
    deleteHandler(row) {
      this.$confirm('此操作将删除该规则, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const data = {
          channelId: row.channelId,
          // TODO:列表和删除字段名不一致
          ruleTypeId: row.pointRuleTypeId,
        };
        this.deletePointExchangeRule(data);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    deletePointExchangeRule(data) {
      memberServices.deletePointExchangeRule(data).then(res => {
        if (res.data.code === 0) {
          this.$message({
            type: 'success',
            message: '删除规则成功',
          });
          this.getData();
        }
      });
    },
    /** 启用、停用按钮处理程序 */
    toggleHandler(row) {
      const data = {
        pointExchangeRuleId: row.pointExchangeRuleId,
      };
      memberServices.togglePointExchangeRule(data).then(res => {
        if (res.data.code === 0) {
          this.$message({
            type: 'success',
            message: res.data.msg,
          });
          this.getData();
        }
      });
    },
  };
</script>

<style scoped>
  /* .rule-list-query, */
  /* .rule-list-table { */
    /* padding: 10px 20px; */
    /* background: #fff; */
  /* } */

  .rule-list-query {
    margin: 20px 0;
    /* padding: 10px; */
  }
  /* .rule-list-table { */
    /* padding: 10px; */
  /* } */
</style>