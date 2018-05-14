<template>
  <div class="nav-main">
    <slot>
    <div class="fl" style="color: #000000;">
      \{{currentViewLabel}}
    </div>
    <div class="fr">
      <slot name="right"></slot>
    </div>
    </slot>
  </div>
</template>
<script>
  import { tRoute } from '@/lang/i18n';
  export default {
    name: 'pageNav',
    props: {
      title: { // 自定义标题
        type: String,
        default: ''
      }
    },
    data() {
      return {};
    },
    computed: {
      currentViewLabel() {
        if (this.title) {
          return this.title;
        }
        let route = this.$route;
        return this.tRoute(route.name);
      }
    },
    methods: {
      tRoute
    }
  };
</script>
<style lang="scss" scoped>
  .nav-main {
    padding-left: 20px;
    padding-right: 20px;
    height: 70px;
    line-height: 70px;
    background-color: #fff;
    border-bottom:1px solid #dbe1e5;
    font-size: 16px;
  }
</style>
