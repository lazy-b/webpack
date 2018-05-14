<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="会员等级列表" name="first">
      <level-list></level-list>
    </el-tab-pane>
    <el-tab-pane label="成长值规则列表" name="second">
      <rule-list></rule-list>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
  import LevelList from './LevelList';
  import RuleList from './RuleList';

  export default {
    name: 'MemberLevel',
    components: { LevelList, RuleList },
    directives: {},
    filters: {},
    mixins: [],
    props: {},
    data() {
      return {
        activeName: 'first',
      };
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
      handleClick(tab, event) {
        // console.log(tab, event);
      },
    },
  };
</script>

<style scoped>

</style>
