<template>
  <div class="nav-container">
    <!-- logo以及切换角色、用户等 -->
    <div class="nav-header-top">
      <div class="nav-top-left">
        <img src="xxxx" alt="LOGO" class="nav-logo">
        <p class="nav-system-name">统一用户营销平台</p>
      </div>
      <div class="nav-top-right">
        <div class="nav-department">
          <i class="el-icon-question"></i>
          <el-select
            v-model="department"
            placeholder="请选择"
            class="ms-none-border-input"
          >
            <el-option
              v-for="item in departmentList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="nav-user">
          <i class="el-icon-question"></i>
          <!-- <el-select v-model="userAction" placeholder="请选择" class="ms-none-border-input">
            <el-option
              v-for="item in userActionList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select> -->
          <el-dropdown>
            <span class="el-dropdown-link">
              王楷基<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>黄金糕</el-dropdown-item>
              <el-dropdown-item>狮子头</el-dropdown-item>
              <el-dropdown-item>螺蛳粉</el-dropdown-item>
              <el-dropdown-item disabled>双皮奶</el-dropdown-item>
              <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <el-button>退出</el-button>
      </div>
    </div>
    <!-- 一级菜单 -->
    <div class="nav-header-bottom">
      <ul class="nav-bottom-ul">
        <li class="nav-bottom-li">
          <router-link to="/home" class="nav-item">
            <i class="el-icon-question"></i>首页
          </router-link>
        </li>
        <li class="nav-bottom-li">
          <router-link to="/home" class="nav-item">
            <i class="el-icon-question"></i>会员管理
          </router-link>
        </li>
        <li class="nav-bottom-li">
          <router-link to="/home" class="nav-item">
            <i class="el-icon-question"></i>会员服务
          </router-link>
        </li>
        <li class="nav-bottom-li">
          <router-link to="/home" class="nav-item">
            <i class="el-icon-question"></i>营销中心
          </router-link>
        </li>
        <li class="nav-bottom-li">
          <router-link to="/home" class="nav-item">
            <i class="el-icon-question"></i>数据分析
          </router-link>
        </li>
        <li class="nav-bottom-li">
          <router-link to="/home" class="nav-item">
            <i class="el-icon-question"></i>系统设置
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NavHeader',
    components: {},
    directives: {},
    filters: {},
    mixins: [],
    props: {},
    data() {
      return {
        // 部门
        departmentList: [{
          value: '选项1',
          label: '洗衣机事业部-国内营销部'
        }, {
          value: '选项2',
          label: '冰箱事业部-国内营销部'
        }, {
          value: '选项3',
          label: '空调事业部-国内营销部'
        }, {
          value: '选项4',
          label: '小家电事业部-国内营销部'
        }],
        department: '选项1',
        // 用户操作
        userActionList: [{
          value: '选项1',
          label: '王楷基'
        }, {
          value: '选项2',
          label: '退出'
        }],
        userAction: '选项1',
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
    },
  };
</script>

<style scoped>
  .nav-container {
    border-bottom: 1px solid #ccc;
    background-color: #ffffff;
    box-shadow: 0px 3px 7px 0px rgba(182, 217, 251, 0.35);
    margin-bottom: 1px;
  }
  .nav-header-top,
  .nav-bottom-ul {
    display: flex;
    flex-direction: row;
    height: 60px;
    line-height: 60px;
    padding: 0 30px;
  }
  .nav-header-top {
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
  }
  .nav-system-name {
    display: inline-block;
    padding: 0;
    margin: 0;
    margin-left: 20px;
  }
  .nav-user,
  .nav-department {
    display: inline-block;
  }
  .nav-user {
    margin: 0 20px;
  }

  /* 一级导航菜单 */
  .nav-bottom-ul {
    justify-content: center;
    padding: 0;
    margin: 0;
    font-size: 18px;
  }
  .nav-bottom-li {
    list-style: none;
    margin: 0 10px;
  }
  .nav-item {
    display: inline-block;
    padding: 0 20px;
  }
</style>