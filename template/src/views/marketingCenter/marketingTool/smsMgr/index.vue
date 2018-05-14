<template>
  <div class="container">
    <div class="trans-header ms-pl20 border-bottom">
      <el-form :inline="true" :model="searchForm" class="demo-form-inline" size='small'>
        <el-form-item label="短信名称">
          <el-input v-model="searchForm.title" :maxlength="20" type="text"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.status" placeholder="请选择状态">
            <el-option v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click='getList'>搜索</el-button>
          <el-button @click='resetSearch'>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-row class="ms-mt20 ms-ml20">
      <el-button size="small" type="primary" @click="toAdd(1)">新建批量短信</el-button>
      <el-button size="small" type="primary" @click="toAdd(2)">新建点对点短信</el-button>
    </el-row>
    <!-- table begin -->
    <div class="ms-mt20 ms-text-center">
      <el-table :data="searchResult.list" size='small' style="width: 100%" v-loading="searchResult.isLoading">
        <el-table-column label="短信类型" width="100">
          <template scope="scope">
            \{{scope.row.eventType | eventType}}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="title" label="短信名称" min-width="120">
        </el-table-column>
        <el-table-column align="center" label="投放" min-width="150">
          <template scope="scope">
            <div>
              <span class="font-grey">总数:</span>\{{scope.row.parseOkCount + scope.row.parseFailedCount}}
              <span class="font-grey pl10">失败数:</span>\{{scope.row.parseFailedCount}}
            </div>
            <time class="font-grey">\{{scope.row.processTime | Time}}</time>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="creatorName" label="创建人" min-width="140">
          <template scope="scope">
            <div>\{{scope.row.creatorName}}</div>
            <time class="font-grey">\{{scope.row.createTime|Time}}</time>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="status" label="状态" width="120">
          <template scope="scope">
            \{{scope.row.status|eventStatus}}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" min-width="100">
          <template scope="scope">
            <el-button v-if="scope.row.status === 1" type="text" size="small" @click="toDel(scope.$index)">删除</el-button>
            <el-button v-if="scope.row.status === 1" type="text" size="small" @click="toEdit(scope.$index)">编辑</el-button>
            <el-button type="text" size="small" @click="toDetail(scope.$index)">详情</el-button>
            <el-button v-if="scope.row.status === 4" type="text" size="small" @click="toCountChart(scope.$index)">效果</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="ms-text-right ms-mt10">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="searchForm.pageIndex" :page-sizes="[10,20,50]" :page-size="searchForm.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="searchResult.total">
      </el-pagination>
    </div>
    <!-- table end -->
  </div>

</template>

<script>
import Action from './action'
import { sms } from '@/api/marketingCenter/sms'
let eventTypeRoute = {
  1: 'editSmsBatch',
  2: 'editSmsP2P',
  3: 'smsEditTemplate'
}
export default {
  data() {
    return {
      orgName: '',
      searchForm: {
        pageIndex: 1,
        pageSize: 10,

        title: '',
        status: ''
      },
      searchResult: {
        isLoading: false,
        list: [{}, {}],
        total: 0
      },
      isLoading: false,
      // 搜索时不需要删除选项
      statusList: [
        {
          value: '',
          label: '全部'
        },
        {
          value: 1,
          label: '未发送'
        },
        {
          value: 2,
          label: '正在处理'
        },
        {
          value: 3,
          label: '已投递，但有失败，需要再处理'
        },
        {
          value: 4,
          label: '已投递'
        },
        {
          value: 6,
          label: '投递失败'
        }
      ]
    }
  },
  computed: {},
  watch: {},
  created() {
    Action.init(this)
  },
  mounted() {
    this.$nextTick(function() {
      this.getList()
    })
  },
  methods: {
    ...Action,
    toAdd(type) {
      let routeName = eventTypeRoute[type]
      this.$router.push({
        name: routeName
      })
    },
    toDel(index) {
      let that = this
      this.$confirm('确定删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        closeOnClickModal: false,
        type: 'warning'
      })
        .then(() => {
          this.doDel(this.searchResult.list[index].id, () => {
            that.getList()
            // that.searchResult.list.splice(1, index);
          })
        })
        .catch(() => {})
    },
    doDel(id, cb) {
      let pm = {}
      pm.id = id
      sms.doDel(pm).then(rs => {
        if (rs.data.code === 0) {
          this.$message({
            showClose: true,
            message: '操作成功',
            type: 'success',
            duration: 3000
          })
          cb()
        } else {
          this.$message({
            showClose: true,
            message: rs.data.msg,
            type: 'error',
            duration: 3000
          })
        }
      })
    }
  },
  filters: {
    eventType: function(value) {
      let rs = ''
      if (value === 1) {
        rs = '批量短信'
      } else if (value === 2) {
        rs = '点对点短信'
      } else if (value === 3) {
        rs = '模板短信'
      }
      return rs
    },
    eventStatus: function(value) {
      let statusMap = {
        1: '未发送',
        2: '正在处理',
        3: '已投递，但有失败，需要再处理',
        4: '已投递',
        5: '删除',
        6: '投递失败'
      }
      return statusMap[value]
    }
  }
}
</script>
<style scoped lang='scss'>
.w250 {
  width: 250px;
}
</style>
