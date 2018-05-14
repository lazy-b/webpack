<template>
  <!-- 积分兑换列表 -->
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
      <el-button type="primary" class="ms-mb20" @click="addHandler">+新建</el-button>
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
          prop="productName"
          label="商品名称"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="productCode"
          label="商品编码"
          width="110">
        </el-table-column>
        <el-table-column
          prop="num"
          label="数量"
          width="100">
        </el-table-column>
        <el-table-column
          label="是否全额兑换"
          width="110">
          <template slot-scope="scope">
            \{{ scope.row.fullExchange ? '是' : '否' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="point"
          label="积分额度"
          width="100">
        </el-table-column>
        <el-table-column
          prop="additionalPrice"
          label="需加价"
          width="100">
        </el-table-column>
        <el-table-column
          prop="postage"
          label="邮费"
          width="100">
        </el-table-column>
        <el-table-column
          label="状态"
          width="60">
          <template slot-scope="scope">
            \{{ scope.row.state ? '正常' : '停用' }}
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
    name: 'PointsExchangeList',
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
            key: 'fullExchange',
            label: '全额兑换',
            queryType: 'select',
            list: [{
              value: true,
              name: '是',
            }, {
              value: false,
              name: '否',
            }]
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
            pointExchangeRuleId: 1, // number, 积分兑换规则ID
            channelId: 1, // number, 渠道ID
            channelName: '集团', // string, 适用渠道
            productName: '平底锅', // string, 商品名称
            productCode: '1222535627', // string, 商品编码
            num: 100, // number, 数量
            fullExchange: true, // boolean, 是否全额兑换
            point: 99, // number, 积分额度
            additionalPrice: 10, // number, 需加价
            postage: 10, // number, 邮费
            state: true // boolean, 状态
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
      /** 新建按钮处理程序 */
      addHandler() {
        this.$router.push({ name: 'pointExchangeRuleMgr' });
      },
      /** 编辑按钮处理程序 */
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
            pointExchangeRuleId: row.pointExchangeRuleId,
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