<template>
  <article>
    <el-button class="ms-wp100" @click="addLevelHandler">+创建</el-button>
    <!-- <el-card class="channel-item" shadow="hover"> -->
    <el-card class="channel-item" v-for="(channel, cIndex) in tableData" :key="cIndex">
      <div slot="header" class="clearfix">
        <span>\{{ channel.channelName }}</span>
        <el-button type="text" class="ms-fr ms-no-padding" @click="editLevelHandler(channel.channelId)">
          <i class="el-icon-edit"></i>编辑
        </el-button>
      </div>
      <el-table
        :data="channel.list"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="sort"
          label="序号"
          align="center"
          width="50">
        </el-table-column>
        <el-table-column
          prop="label"
          label="等级"
          min-width="80">
        </el-table-column>
        <el-table-column
          prop="name"
          label="名称"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="growRange"
          label="成长值"
          min-width="100">
        </el-table-column>
        <!-- <el-table-column
          prop="address"
          label="消费金额">
        </el-table-column> -->
      </el-table>
    </el-card>
  </article>
</template>

<script>
  import { memberServices } from '@/api';

  export default {
    name: 'LevelList',
    components: {},
    directives: {},
    filters: {},
    mixins: [],
    props: {},
    data() {
      return {
        // 会员等级列表
        tableData: [
          {
            'channelId': 1, // number, 渠道ID
            'channelName': '集团', // string, 渠道名称
            'list': [
              {
                'sort': 1, // number, 序号
                'channelId': 1, // number, 渠道ID
                'label': 'V1', // string, 等级
                'name': '默默无闻', // string, 名称
                'growRange': '0-99' // string, 成长值
              },
              {
                'sort': 2, // number, 序号
                'channelId': 1, // number, 渠道ID
                'label': 'V2', // string, 等级
                'name': '崭露头角', // string, 名称
                'growRange': '100-499' // string, 成长值
              },
              // ... 同一渠道的多条等级信息
            ]
          },
          // ... 多个渠道的等级信息
        ]
      };
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {
      this.$nextTick(function() {
        this.getData();
      });
    },
    methods: {
      /** --------------- 说明 -------------  */
      /** 获取会员等级列表 */
      getData() {
        memberServices.getMemberLevelList().then(res => {
          if (res.data.code === 0) {
            this.tableData = res.data.data;
            // debugger
          }
        });
      },
      /** 添加按钮处理程序 */
      addLevelHandler() {
        this.$router.push({ name: 'memberLevelMgr' });
      },
      /** 添加按钮处理程序 */
      editLevelHandler(id) {
        this.$router.push({ name: 'memberLevelMgr', params: { channelId: id } });
      },
    },
  };
</script>

<style scoped>
  .channel-item {
    margin: 20px 0;
  }
</style>