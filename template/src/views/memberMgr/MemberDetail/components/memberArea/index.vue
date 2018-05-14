<template>
  <div class="table" v-show="true">
    <el-table
      :data="tableData.data"
      stripe
      border
      class="wp100">
      <el-table-column
          fixed
          label="序号"
          width="60">
          <template slot-scope="scope">
            <span>\{{ getTableIndex(scope.$index) }}</span>
          </template>
        </el-table-column>
      <el-table-column
        v-for="(item, index) in tableData.title"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        :align="item.align">
        <template slot-scope="scope">
            <template v-if="scope.column.property === 'receiverAddress'">
              <span>\{{!scope.row.provinceName ? '' : scope.row.provinceName + scope.row.cityName + scope.row.countyName}}</span>
            </template>
            <template v-else>
              <span>\{{scope.row[scope.column.property]}}</span>
            </template>
        </template>
      </el-table-column>
      <el-table-column
        width="100"
        label="状态"
        align="center">
        <template slot-scope="scope">
          \{{scope.row.defaultAddress? '默认' : '非默认'}}
        </template>
      </el-table-column>
    </el-table>

    <div class="footer">
      <div class="pagination-container text-right">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="currentChangeHandler"
          background
          small
          :current-page="pagination.currentPage"
          :page-size='pagination.pageSize'
          layout="total, sizes, prev, pager, next, jumper"
          :total='pagination.total'>
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { pagination } from '@/mixins/table';
import { member } from '@/api';
export default {
  mixins: [pagination],
  data() {
    return {
      tableData: {
        title: [
          // {
          //   prop: 'memberId',
          //   label: '序号',
          //   width: '50',
          //   align: 'center'
          // },
          {
            prop: 'receiverName',
            label: '收货人',
            width: '150',
            align: 'center'
          },
          {
            prop: 'receiverMobile',
            label: '联系电话',
            width: '150',
            align: 'center'
          }, {
            prop: 'receiverAddress',
            label: '所在地区',
            width: '200',
            align: 'center'
          }, {
            prop: 'detailAddress',
            label: '详细地址',
            align: 'center'
          }],
        data: []
      }
    };
  },
  created() {
    this.getMemberAdressList();
  },
  methods: {
    // 获取会员地址列表
    getMemberAdressList() {
      let memberId = this.$route.params.memberId;
      // let param = {
      //   memberId: memberId,
      //   pageIndex: this.pagination.currentPage,
      //   pageSize: this.pagination.pageSize
      // };
      member.getMemberAdressList(memberId).then((res) => {
        if (res.data.code === 0) {
          const data = res.data.data;
          this.tableData.data = data;
          // this.pagination.total = data.total
        }
      });
    }
  }
};
</script>
