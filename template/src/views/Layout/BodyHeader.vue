<template>
  <h1 class="body-title-h1">会员矩阵列表---\{{ bodyTitle }}</h1>
</template>

<script>
  export default {
    name: 'BodyTitle',
    components: {},
    directives: {},
    filters: {},
    mixins: [],
    props: {},
    data() {
      return {};
    },
    computed: {
      bodyTitle() {
        return this.$route.meta.label;
      }
    },
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
  .body-title-h1 {
    font-size: 18px;
    line-height: 2;
    font-weight: 700;
  }
</style>