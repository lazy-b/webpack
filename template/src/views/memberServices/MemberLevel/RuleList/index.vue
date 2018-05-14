<template>
  <!-- 成长值列表 -->
  <div class="xxx-container">
    <!-- 搜索 -->
    <el-card class="rule-list-query">
      <query-bar
        :query-list="queryList"
        @query="queryHandler"
        @reset="reset"
      ></query-bar>
    </el-card>
    <el-button class="ms-wp100 ms-mb20" @click="addLevelHandler">+创建</el-button>
    <!-- 表格 -->
    <el-card class="rule-list-table">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="growRuleId"
          align="center"
          label="序号"
          width="50">
        </el-table-column>
        <el-table-column
          prop="growRuleTypeName"
          label="规则类型"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="channelName"
          label="适用渠道"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="bonus"
          label="获取成长值"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="limit"
          label="获取限制"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="description"
          label="说明"
          min-width="180">
        </el-table-column>
        <el-table-column
          label="状态"
          align="center"
          width="60">
          <template slot-scope="scope">
            \{{ scope.row.enable ? '正常' : '停用' }}
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          align="center"
          width="160">
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
    name: 'RuleList',
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
            key: 'growRuleTypeId',
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
            'growRuleId': 1, // number, 序号
            'growRuleTypeId': 1, // number, 规则类型ID
            'growRuleTypeName': '注册', // string, 规则类型
            'channelId': 1, // number, 渠道ID
            'channelName': '集团', // string, 适用渠道
            'bonus': 20, // number, 获取成长值
            'limit': '1次', // string, 获取限制
            'description': '说明内容', // string, 说明
            'enable': true, // boolean, 状态
          },
        ],
      };
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {
      this.$nextTick(function() {
        this.getBasicChannelList();
        this.getBasicGrowRuleTypeList();
        this.getData();
      });
    },
    methods: {
      /** --------------- 说明 -------------  */
      /** 获取渠道列表 */
      getBasicChannelList() {
        memberServices.getBasicChannelList().then(res => {
          if (res.data.code === 0) {
            // 渠道类型搜索下拉列表
            this.queryList[1].list = res.data.data;
          }
        });
      },
      /** 获取成长值规则类型列表 */
      getBasicGrowRuleTypeList() {
        memberServices.getBasicGrowRuleTypeList().then(res => {
          if (res.data.code === 0) {
            this.queryList[0].list = res.data.data;
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

        memberServices.getMemberRuleList(params).then(res => {
          if (res.data.code === 0) {
            const data = res.data;
            this.pagination.total = data.total;
            this.tableData = data.records;
          }
        });
      },
      /** 新建按钮处理程序 */
      addLevelHandler() {
        this.$router.push({ name: 'memberRuleMgr' });
      },
      /** 编辑按钮处理程序 */
      editHandler(row) {
        this.$router.push({
          name: 'memberRuleMgr',
          params: {
            channelId: row.channelId,
            growRuleTypeId: row.growRuleTypeId,
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
            growRuleTypeId: row.growRuleTypeId,
          };
          this.deleteMemberGrowRule(data);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      deleteMemberGrowRule(data) {
        memberServices.deleteMemberGrowRule(data).then(res => {
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
          channelId: row.channelId,
          growRuleTypeId: row.growRuleTypeId,
        };
        memberServices.toggleMemberGrowRule(data).then(res => {
          if (res.data.code === 0) {
            this.$message({
              type: 'success',
              message: res.data.msg,
            });
            this.getData();
          }
        });
      },
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
