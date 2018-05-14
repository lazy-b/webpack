<template>
  <div class="ml15 mr15">
    <p>会员分组</p>
    <!-- <div>
      重点运营分组
    </div> -->
    <div>

    </div>
    <div class="content_middle">
      <p>分组列表</p>
      <div>
        <el-button type="primary" size="small">创建分组</el-button>
      </div>
    </div>
    <div class="ms-relative">
      <el-form :inline="true" size="small"  class="demo-form-inline ms-absolute from-positon">
        <el-form-item label="">
          <el-input v-model="groupName" :maxlength="30" placeholder="请输入分组名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click='search'>查询</el-button>
        </el-form-item>
      </el-form>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="我的分组" name="first">
          <group-list :name='groupNames'></group-list>
        </el-tab-pane>
        <el-tab-pane label="所有分组" name="second">
          <groupList></groupList>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import groupList from './groupList';
export default {
  components: {
    groupList
  },
  data() {
    return {
      name: 'userGroup',
      activeName: 'first',
      groupName: '',
      groupNames: '',
      form: {

      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    search() {
      this.groupNames = this.groupName;

    },
    handleClick(tab, event) {

    }
  }
}
</script>

<style lang='scss'>
.el-tabs__header {
  position: relative;
  padding: 15px 0 0 20px;
  border-radius: 6px 6px 0 0;
  background: #fff;
  margin: 0;
}
.container {
  padding: 30px 0;
  background: #fff;
}
.border-bottom {
  border-bottom: 1px solid #eee;
}
.content_middle {
  display: flex;
  justify-content: space-between;
}
.from-positon{
  z-index: 1000;
  top: 13px;
  right: 13px;
}
</style>
