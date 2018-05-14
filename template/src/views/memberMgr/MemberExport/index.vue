<template>
  <div class="app-container">

    <div class="table" v-show="true">
      <el-table
        :data="tableData.data"
        stripe
        border
        class="wp100">
         <el-table-column
          fixed
          label="序号"
          width="100">
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
         <!-- 操作按钮 -->
        <el-table-column
          width="100"
          align="center"
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="text"
              v-if="scope.row.status === '已完成'"
              @click="download(scope.row.path)">
              下载
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- <div class="footer">
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
      </div> -->
    </div>

    <!-- <article class="mt20">
      <h2>页面说明：</h2>
      <div class="mb10">1. 导出的文件名格式：会员资料+导出日期（精确到秒）+登录账号的姓名；</div>
      <div class="mb10">2. 导出进度按百分比，按10个百分递增，例：0%，10%；</div>
      <div class="mb10">3. 状态：</div>
      <div class="ml40 mb10">进行中：表示文件还未生成，进度没到100%；</div>
      <div class="ml40 mb10">已生成：表示文件生成完成，进度已经100%；</div>
      <div class="ml40 mb10">生成失败：某些异常原因，导致不能生成，进度为100%的时候显示生成失败；</div>
      <div class="mb10">4. 创建人：登录的账号姓名+角色名称，例： 张三（渠道管理员）；</div>
      <div class="mb10">5. 创建时间：文件开始创建的时间；</div>
      <div class="mb10">6. 操作：状态为已生成，显示下载按钮，其他情况不显示；</div>
    </article> -->
  </div>
</template>
<script>
import { pagination } from '@/mixins/table';
import { member } from '@/api';
export default {
  mixins: [pagination],
  data() {
    return {
      form: null,
      tableData: {
        title: [
          {
            prop: 'filename',
            label: '文件名称',
            align: 'center'
          },
          {
            prop: 'progress',
            label: '导出进度',
            width: '100',
            align: 'center'
          }, {
            prop: 'status',
            label: '状态',
            width: '100',
            align: 'center'
          }, {
            prop: 'creatorName',
            label: '创建人',
            width: '150',
            align: 'center'
          }, {
            prop: 'createTime',
            label: '创建时间',
            width: '200',
            align: 'center'
          }],
        data: []
      }
    };
  },
  created() {
    this.getData();
  },
  methods: {
    // 查询
    queryHandler(form) {
      this.form = form;
      this.getData();
    },
    // 重置
    reset(form) {
      this.form = {};
      this.getData();
    },
    // 查询列表数据
    getData() {
      member.getMemberExportList().then((res) => {
        if (res.data.code === 0) {
          const data = res.data.data;
          this.tableData.data = data;
          // this.pagination.total = data.total
        }
      });
    },
    // 下载
    download(path) {
      // console.log(path)
      window.location.href = path;
    }
  }
};
</script>
