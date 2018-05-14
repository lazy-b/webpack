<template>
  <div class="ml15 mr15">
    <p>会员标签</p>
    <div class="nav">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="自定义标签" name="first">
          <label-list></label-list>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import labelList from './labelList'
export default {
  components: {
    labelList
  },
  data() {
    return {
      name: 'labelMgr',
      activeName: 'first'
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$nextTick(function() {})
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
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
</style>
