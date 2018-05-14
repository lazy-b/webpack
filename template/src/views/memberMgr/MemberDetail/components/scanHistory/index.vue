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
          min-width="60">
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
          //   width: '150',
          //   align: 'center'
          // },
          {
            prop: 'productCode',
            label: '产品编号',
            align: 'center'
          },
          {
            prop: 'productName',
            label: '产品名称',
            width: '150',
            align: 'center'
          }, {
            prop: 'productPrice',
            label: '产品价格',
            width: '100',
            align: 'center'
          }, {
            prop: 'actualValue',
            label: '积分',
            width: '100',
            align: 'center'
          }, {
            prop: 'storeName',
            label: '扫码门店',
            width: '150',
            align: 'center'
          }, {
            prop: 'storeProvinceName',
            label: '扫码省',
            width: '100',
            align: 'center'
          }, {
            prop: 'storeCityName',
            label: '扫码市',
            width: '100',
            align: 'center'
          }, {
            prop: 'storeCountyName',
            label: '扫码区',
            width: '100',
            align: 'center'
          }],
        data: []
      }
    };
  },
  created() {
    this.getMemberScanList();
  },
  methods: {
    // 获取会员地址列表
    getMemberScanList() {
      let memberId = this.$route.params.memberId;
      let param = {
        memberId: memberId
      };
      member.getMemberScanList(param).then((res) => {
        if (res.data.code === 0) {
          const data = res.data.data;
          this.tableData.data = data.records;
          this.pagination.total = data.total;
        }
      });
    }
  }
};
</script>
