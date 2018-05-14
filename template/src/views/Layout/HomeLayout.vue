<template>
  <!-- home专用布局页面 -->
  <div class="layout-app-wrapper">
    <router-view class="layout-app-header" name="appHeader"></router-view>
    <router-view class="layout-body-view" name="bodyView"></router-view>
  </div>
</template>

<script>
  export default {
    name: 'HomeLayout',
    components: {},
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
  .layout-body-view {
    flex: 1 0 auto;
  }
</style>