<template>
  <div class="login-container">
    <div class="login-container__header">
      <div class="header-logo">
        <!-- <img src="./img/logo.jpg" style="width: 182px;height: 50px"> -->
      </div>
    </div>
    <div class="login-container__main">
      <div class="login-container__form">
        <el-form autoComplete="on" :model="loginForm" :rules="rules" ref="loginForm" label-width="80px" class="login-containe__el-form">
          <h3 class="title">欢迎登录营销云SCRM系统</h3>
          <el-form-item prop="username" class="login-form-item">

            <el-autocomplete
              popper-class="my-autocomplete"
              class="login-input"
              v-model="loginForm.username"
              :fetch-suggestions="querySearch"
              placeholder="请输入登录用户名">
              <i
                :class="icon('person')"
                class="icon-left"
                slot="prefix">
              </i>
              <i
                :class="icon('circle-close-outline')"
                class="icon-right"
                @click.stop="clearUsername()"
                slot="suffix">
              </i>
              <template slot-scope="props">
                <span style="float: right;">
                  <el-button
                    type="text"
                    @click.stop="removeUsername(props.item)"
                    style="padding: 0 25px;">
                    删除
                  </el-button>
                </span>
                <div class="name">\{{ props.item.value }}</div>
              </template>
            </el-autocomplete>

          </el-form-item>

          <el-form-item prop="password" label="" class="login-form-item">
            <el-input
              name="password"
              :type="pwdType"
              class="login-pass-input"
              v-model="loginForm.password" placeholder="请输入登录密码">
              <i :class="icon('key')" slot="prefix" class="icon-left"></i>
              <i slot="suffix"  @click="showPwd" class="icon-right" :class="icon('view')"></i>
            </el-input>
          </el-form-item>
          <el-form-item class="login-form-item">
            <!-- <el-button v-yxyEnter="loginHandler" type="primary" style="width:100%;margin-bottom:30px;" :loading="loading" @click.stop="loginHandler">登录</el-button> -->
            <el-button @click="loginHandler" type="primary" style="width:100%;margin-bottom:30px;" :loading="loading">登&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="footer text-center"><span>Copyright @ 2018 Meicloud.All Rights Reserved.</span></div>
  </div>
</template>

<script>
  import { users } from '@/api';
  import { icon } from '@/icons';
  // import { checkUsername, checkPID, checkPassword } from "@/utils/validate";

  const checkPassword = (options) => (rule, value, callback) => {
    if (value === 'admin') {
      callback();
    } else {
      const message = options && options.message ? options.message : '密码必须为总长度为6的数字或字母的组合!';
      const urlregex = /^[a-zA-Z0-9]{6}$/;
      if (!urlregex.test(value)) {
        callback(new Error(message));
      } else {
        callback();
      }
    }
  };

  const checkUsername = (options) => (rule, value, callback) => {
    if (value === 'admin') {
      callback();
    } else {
      const message = options && options.message ? options.message : '用户名为总长度为6的数字或字母的组合!';
      const urlregex = /^[a-zA-Z0-9]{6}$/;

      if (!urlregex.test(value)) {
        callback(new Error(message));
      } else {
        callback();
      }
    }
  };

  export default {
    name: 'login',
    data() {
      return {
        // 登录表单
        loginForm: {
          username: '',
          password: ''
        },
        // 用户名输入建议候选列表
        usernameList: [],
        // 验证规则
        rules: {
          // 性别
          username: [
            { required: true, message: '请输入用户名', trigger: 'change' },
            { validator: checkUsername(), trigger: 'blur' }
          ],
          // 密码
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { validator: checkPassword(), trigger: 'blur' },
          ],
        },
        // 密码输入框的类型
        pwdType: 'password',
        loading: false
      };
    },
    // directives: {
    //   yxyEnter: {
    //     bind: function(el, binding, vnode) {
    //       // 解除绑定标识
    //       const href = window.location.href;
    //       document.addEventListener('keypress', (event) => {
    //         const newHref = window.location.href;

    //         if (href !== newHref) {
    //           document.removeEventListener('keypress', binding.value);

    //           return;
    //         }

    //         if (event.key === 'Enter') {
    //           binding.value();
    //         }
    //       });

    //       el.addEventListener('click', (event) => {
    //         binding.value();
    //         event.stopPropagation();
    //       })
    //     },
    //     unbind: function(el, binding, vnode) {
    //       document.removeEventListener('keypress', binding.value);
    //     }
    //   }
    // },
    methods: {
      icon,
      // 显示密码
      showPwd() {
        if (this.pwdType === 'password') {
          this.pwdType = '';
        } else {
          this.pwdType = 'password';
        }
      },
      // 登录处理程序
      loginHandler() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true;

            users.login(this.loginForm).then((res) => {
              if (res.data.code === 0) {
                this.$message({
                  type: 'success',
                  message: '登录成功'
                });

                users.getUserInfo().then((res) => {
                  if (res.data.code === 0) {
                    this.$store.dispatch('user/setUserInfo', res.data.data);
                  }
                });
                users.getMenu().then(res => {
                  if (res.data.data) {
                    this.$store.dispatch('user/setMenu', res.data.data);
                    this.jumpHandler();
                  }
                });
              }

              this.loading = false;
            }, () => {
              // 方便测试
              // console.log(err);

              this.loading = false;
            });
          } else {
            return false;
          }
        });
      },
      /** 登录后跳转处理程序 */
      jumpHandler() {
        this.$router.replace({ path: '/home' });
      },
      // 在该页面做数据清除工作
      clearAll() {

        // 清楚sessionStorage
        window.sessionStorage.clear();
      },
      // 获得本机存储的用户名
      getRemberUsername() {
        const usernameList = window.localStorage.getItem('usernameList');

        this.usernameList = JSON.parse(usernameList) ? JSON.parse(usernameList) : [];
      },
      // 设置存储的用户名
      setRemberUsername() {
        const usernameList = JSON.stringify(this.usernameList);

        window.localStorage.setItem('usernameList', usernameList);
      },
      // 删除记住的用户名
      removeUsername(item) {
        const usernameList = this.usernameList;

        usernameList.splice(usernameList.indexOf(item), 1);
        this.setRemberUsername();
      },
      // 记住用户名函数
      remberUsername() {
        const username = this.loginForm.username;
        const usernameList = this.usernameList;
        const exist = usernameList.some(item => {
          return item.value === username;
        });

        if (exist) {
          return;
        }

        usernameList.push({ value: username, time: +new Date() });
        this.setRemberUsername();
      },
      // 用户名输入建议过滤函数
      querySearch(queryString, cb) {
        const createFilter = queryString => username => (username.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        const usernameList = this.usernameList;
        const results = queryString ? usernameList.filter(createFilter(queryString)) : usernameList;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      // 清空用户名输入框
      clearUsername() {
        this.loginForm.username = '';
      },
      enterHandler() {
        // console.log(111);
      }
    },
    mounted() {
      this.$nextTick(function() {
        this.clearAll();
        this.getRemberUsername();
      });
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss" >
  /* 使表单居中 */
  .login-container {
    width: 100%;
    height: 100%;
    /*overflow: hidden;*/
    /*display: -webkit-inline-flex;
    display: -moz-inline-flex;
    display: -ms-inline-flex;
    display: -o-inline-flex;
    display: inline-flex;
    justify-content: center;
    -ms-align-items: center;
    align-items: center;*/
    .login-container__header {
      width: 100%;
      height: 76px;
      color: #fff;
      background-color: #fff;
      position: relative;
      margin-left: auto;
      margin-right: auto;
      top:0;
    }
    .header-logo{
      color: #666666;
      font-size:18px;
      font-family: HelveticaNeue Regular;
      padding-left: 100px;
      padding-top: 12px;
    }
    .title {
      text-align: center;
      padding: 10px 0;
      color: #666666;
    }
  }

  .login-container__main {
    min-height: 500px;
    background-color: #2d8ac7;
    position:relative;
  }
  .login-container__form {
    text-align: center;
    z-index:199;
    background-color: #fff;
    position: absolute;
    right: 100px;
    top:55px;
    .el-form .el-form-item {
      margin: 40px auto;
    }
    .el-button[type=button] {
    height: 40px;
    font-size: 16px;
}
  }
  .login-containe__el-form{
    width: 350px;
    height: 350px;
    margin: 0 auto;
    padding: 20px 20px;
  }
  .login-form-item{
    .el-autocomplete {
      width: 100%;
    }
    .el-form-item__content{
      margin-left: 30px!important;
    }
    .el-input__inner {
      height: 40px;
    }
    // .el-button {
      // padding: 12px 20px;
    // }
    i {
      font-size: 20px;
    }
    .icon-left {
      line-height: 40px;
    }
    /* 控制密码可见图标哦*/
    .icon-right {
      padding: 10px 20px;
      cursor: pointer;
    }

    .icon-right:hover {
      color: blue;
    }
  }
  .footer {
    padding-top:20px;
    color: #999;
    height: 60px;
    a {
      text-decoration: none;
      color: #959595;
    }
  }

  .login-input {
    margin-bottom: 5px;
  }

  .login-pass-input {
    margin-bottom: 10px;
  }

</style>



