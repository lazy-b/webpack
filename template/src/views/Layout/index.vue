<template>
  <!-- 通用布局页面 -->
  <div class="layout-app-wrapper">
    <!-- 头部区（logo、一级菜单） -->
    <router-view class="layout-app-header" name="appHeader"></router-view>
    <div class="layout-app-main">
      <!-- 二级菜单区 -->
      <router-view class="layout-second-menu" name="secondMenu"></router-view>
      <!-- 主内容区 -->
      <div class="layout-body-wrapper">
        <router-view class="layout-body-header" name="bodyHeader"></router-view>
        <router-view class="layout-body-view" name="bodyView"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import NavHeader from './NavHeader';

  export default {
    name: 'Layout',
    components: { NavHeader },
    directives: {},
    filters: {},
    mixins: [],
    props: {},
    data() {
      return {};
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {
      this.$nextTick(function() {
      });
    },
    methods: {
      /** --------------- 说明 -------------  */
    },
  };
</script>

<style scoped>
  /* 整个页面 */
  .layout-app-wrapper {
    display: flex;
    height: 100%;
    flex-direction: column;
  }
  .layout-app-header {
    flex: none;
  }
  /* 主要内容区 */
  .layout-app-main {
    flex: 1 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  /* 二级菜单 */
  .layout-second-menu {
    background: #fff;
    min-width: 200px;
    flex: none;
  }
  /* 次级内容区 */
  .layout-body-wrapper {
    flex: auto;
    display: flex;
    flex-direction: column;
  }
  /* 只有存在侧边栏时，才有左右边距 */
  .layout-second-menu + .layout-body-wrapper {
    margin: 0 20px;
  }

  .layout-body-header {
    /* font-size: 18px;
    line-height: 2;
    font-weight: 700; */
    flex: none;
  }
  /* 页面显示主要内容区 */
  .layout-body-view {
    flex: 1 0 auto;
  }
</style>