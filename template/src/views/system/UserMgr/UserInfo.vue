<!-- 用户管理编辑-》新增、修改页面 -->
<template>
  <div class="app-container">
    <!-- <h2 class="text-center">\{{ title }}</h2> -->
      <!-- inline -->
    <el-form
      class="form"
      ref="userForm"
      :rules='rules'
      :model='form'
      label-width="120px">

      <!-- 表单项 -->
      <el-form-item label="姓名" prop="nickname">
        <el-input v-model='form.nickname' :maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input v-model='form.username' :disabled='isEdit' placeholder="6-20位数字或字母组成"></el-input>
      </el-form-item>
      <el-form-item label="密码" v-if='!isEdit' prop="password">
        <el-input type="password" v-model='form.password' placeholder="6-20位数字或字母组成"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" v-if='!isEdit' prop="checkPassword">
        <el-input type="password" v-model='form.checkPassword' placeholder="6-20位数字或字母组成"></el-input>
      </el-form-item>
      <el-form-item label="员工编号">
        <el-input v-model='form.userCode' :maxlength="50"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model='form.mobile'></el-input>
      </el-form-item>
      <el-form-item label="生日" prop="birthday">
        <el-date-picker
          v-model='form.birthday'
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
       <el-form-item label="角色" prop="roleId" required>
        <el-select v-model="form.roleId" placeholder="请选择角色">
          <el-option
            v-for="(item, index) in roleList"
            :key="index"
            :label="item.roleName"
            :value="item.roleId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="部门" prop="deptIdList">
        <el-cascader placeholder="请选择" :options="departmentTree" :props="props" filterable change-on-select clearable v-model="form.deptIdList" @change="cascaderChangeHandler"></el-cascader>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model='form.email'></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="form.sex">
          <el-radio :label="true">男</el-radio>
          <el-radio :label="false">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="家庭住址">
        <el-input v-model='form.address' :maxlength="200"></el-input>
      </el-form-item>
      <el-form-item label="入职日期" prop="createTime">
        <el-date-picker
          v-model='form.createTime'
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="状态">
        <el-switch
          :active-value='switchValue.active'
          :inactive-value='switchValue.inactive'
          v-model='form.status'>
        </el-switch>
        <span>
          \{{form.status === true ? "正常" : "禁用"}}
        </span>
      </el-form-item>
    </el-form>

    <!-- 操作按钮 -->
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" v-yxyEnter='submit'>提 交</el-button>
      <el-button @click='cancel()'>取 消</el-button>
    </div>

    <!-- 选择部门弹窗 -->
    <div class="department-dialog">
      <el-dialog
        center
        title="选择部门"
        append-to-body
        width="30%"
        :close-on-click-modal='false'
        :close-on-press-escape='false'
        :visible.sync='visible'>

          <!-- 树形控件部分 -->
          <div>
            <div class="tree-header">
              <el-input
                placeholder="输入部门进行过滤"
                v-model="filterText">
              </el-input>
              <P v-if='showTips' class="text-center">不能同时选择上级部门和下级部门</P>
            </div>

            <el-tree
              class="filter-tree"
              node-key="id"
              :highlight-current='true'
              :data='departmentTree'
              :props='propsMap'
              :indent='40'
              accordion
              :default-expanded-keys='defaultExpandedKeys'
              :default-checked-keys='defaultCheckedKeys'
              @check-change='checkHandler'
              show-checkbox
              check-strictly
              :filter-node-method='filterNode'
              ref="departmentsTree">
            </el-tree>
          </div>

          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click='setDepartments'>确 定</el-button>
            <el-button @click='visible = false'>取 消</el-button>
          </div>

      </el-dialog>
    </div>

  </div>
</template>

<script>
  import { users, dept, role } from '@/api';
  import { serialize } from '@/utils/serizlize';
  import { checkUsername, checkPID, checkMobile, checkPassword } from '@/utils/validate';
  // import { findCheckedParents, findCheckedChildren } from '@/utils/treeHandler';

  export default {
    data() {
      // 密码
      const validatePass = (rule, value, callback) => {
        if (this.checkPassword !== '') {
          this.$refs.userForm.validateField('checkPassword');
        }
        callback();
      };
      // 确认密码
      const validateCheckPass = (rule, value, callback) => {
        if (value !== this.form.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        title: '新增用户',
        // 用户id
        userId: -1,
        // 被编辑用户的信息
        defaultValue: {},
        roleList: [],
        // 部门树
        departmentTree: [],
        // 字段映射对象
        propsMap: {
          children: 'children',
          label: 'label'
        },
        // 部门弹窗可见性
        visible: false,
        // 部门树过滤字段
        filterText: '',
        // 部门显示的字段（只做显示作用）
        departmentValue: '',
        // 默认选中的节点
        defaultExpandedKeys: [],
        // 默认选中的节点
        defaultCheckedKeys: [],
        // 切换用户状态映射对象
        switchValue: {
          active: true,
          inactive: false
        },
        props: {
          value: 'id'
        },
        // 显示提示信息
        showTips: false,
        // 用户信息表单
        form: {
          // 用户id（标识字段）
          userId: '',
          // 生日
          birthday: '',
          // （必填）部门（数组）
          deptIdList: [],
          // （必填）邮箱
          email: '',
          // 员工编号
          userCode: '',
          // 入职日期
          createTime: '',
          // 家庭住址
          address: '',
          // 身份证号（必填）
          idCardno: '',
          // （必填）手机
          mobile: '',
          // （必填）用户真实姓名
          name: '',
          // （必填）密码
          password: '',
          // 确认密码，必须放在form表单字段中，否则验证规则不起作用
          checkPassword: '',
          //  （必填）性别（男M 女F）
          sex: '',
          // （必填）用户状态（0:禁用，1:正常）
          status: true,
          // （必填）登录用户名
          username: '',
          // 角色id
          roleId: '',
          // 部门id
          departmentId: ''
        },
        // 验证规则
        rules: {
          // 姓名
          nickname: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
          ],
          // 性别
          // sex: [
          //   { required: true, message: '请选择性别', trigger: 'change' },
          // ],
          // 密码
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { validator: checkPassword(), trigger: 'blur' },
            { validator: validatePass, trigger: 'blur' }
          ],
          // 确认密码
          checkPassword: [
            { required: true, message: '请再次输入密码', trigger: 'blur' },
            { validator: checkPassword(), trigger: 'blur' },
            { validator: validateCheckPass, trigger: 'blur' }
          ],
          // 用户名只能包含数字/字母/下划线/横杠
          username: [
            { required: true, message: '必须填写用户名', trigger: 'blur' },
            { validator: checkUsername(), trigger: 'blur' }
          ],
          roleId: [
            { required: true, message: '请输入角色', trigger: 'blur' }
          ],
          // 身份证号
          idCardno: [
            { required: true, message: '必须填写身份证号', trigger: 'blur' },
            { validator: checkPID(), trigger: 'blur' }
          ],
          // 邮箱
          email: [
            { required: true, message: '必须填写邮箱', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
          ],
          // 手机号
          mobile: [
            { required: true, message: '必须填写手机号', trigger: 'blur' },
            { validator: checkMobile(), trigger: 'blur' }
          ],
          // 部门
          deptIdList: [
            { type: 'array', required: true, message: '请至少选择一个部门', trigger: 'change' }
          ]
        }
      };
    },
    watch: {
      // 过滤部门树
      filterText(val) {
        this.$refs.departmentsTree.filter(val);
      }
    },
    computed: {
      isEdit() {
        return this.userId !== -1;
      }
    },
    methods: {
      // 获取被编辑用户信息
      getUserInfo(userId) {
        const params = {
          userId: userId
        };

        users.getUserById(params).then(res => {
          const userInfo = res.data.data;
          const form = this.form;

          // 赋值
          for (let item in userInfo) {
            if (userInfo.hasOwnProperty(item)) {
              // 空值继续循环
              if (userInfo[item] === null) {
                continue;
              }

              // 部门赋初值
              if (item === 'deptList') {
                const checkedKeys = [];
                const checkedValues = [];

                userInfo[item].forEach(item => {
                  checkedKeys.push(item.deptId);
                  checkedValues.push(item.deptName);
                });

                // 赋初值且在部门树中选中、展开
                this.defaultCheckedKeys = checkedKeys;

                // 用户信息中部门使用数字进行存储
                // 部门信息返回的部门树是字符串，
                // 暂时使用hack，将数字、字符串均存入
                const expandedKeys = checkedKeys;
                expandedKeys.forEach(item => {
                  expandedKeys.push(item + '');
                });

                this.defaultExpandedKeys = expandedKeys;
                // this.defaultExpandedKeys = checkedKeys;
                this.form.deptIdList = checkedKeys;
                // 表单展示值
                this.departmentValue = checkedValues.join(',');
                continue;
              }

              form[item] = userInfo[item];
            }
          }

          form.roleId = userInfo.roleList[0].roleId;
          form.deptIdList = userInfo.departmentList;

        });
      },
      // 获取部门树
      getDepartmentTree() {
        dept.getDeptTree().then(res => {
          if (res.data.code === 0) {
            let tree = JSON.stringify(res.data.data);
            tree = tree.replace(/,"children":\[\]/g, '');
            this.departmentTree = JSON.parse(tree);
          }
        });
      },
      // 保存数据操作（修改或者新增）
      submit() {
        this.$refs.userForm.validate(result => {

          if (result) {
            const formData = serialize(this.form);
            // this.userId === -1发起添加操作，否则修改操作
            if (this.userId === -1) {
              // 调用父组件的添加操作，发起添加请求
              this.save(formData);
            } else {
              this.update(formData);
            }
            // 调用父组件的添加操作，发起添加请求
          }/* else {
            this.$message({
              type: 'info',
              message: '数据验证失败，请检查数据！！'
            });
          } */
        });
      },
      // 保存
      save(formData) {
        users.save(formData).then((res) => {

          // 保存成功则弹出提示并关闭弹窗
          if (res.data.code === 0) {
            this.$message({
              type: 'success',
              message: '保存成功'
            });

            // 跳回用户管理页面
            this.$router.replace('/system/userManager');
          } else {
            this.$message({
              type: 'error',
              message: '保存失败' + res.data.msg
            });
          }
        }, () => {
          // debugger
          // console.log(error)
        });
      },
      cancel() {
        // 跳回用户管理页面
        this.$router.replace('/system/userManager');
        this.visible = false;
      },
      // 修改
      update(formData) {
        users.update(formData).then((res) => {

          // 保存成功则弹出提示并关闭弹窗
          if (res.data.code === 0) {
            this.$message({
              type: 'success',
              message: '修改成功'
            });

            // 跳回用户管理页面
            this.$router.replace('/system/userManager');
          } else {
            this.$message({
              type: 'error',
              message: '修改失败' + res.data.msg
            });
          }
        }, () => {
          // debugger
          // console.log(error)
        });
      },
      // 单击选择部门输入框
      showDepartment() {
        this.filterText = '';
        this.visible = true;
      },
      // 用户选择部门处理函数
      setDepartments() {
        // 选中的节点
        const nodeList = this.$refs.departmentsTree.getCheckedNodes();

        const idList = [];
        const labelList = [];
        nodeList.forEach(item => {
          idList.push(item.id);
          labelList.push(item.label);
        });

        this.form.deptIdList = idList;
        this.departmentValue = labelList.join(',');
        this.$nextTick(() => {
          this.$refs.userForm.validateField('deptIdList');
        });
        this.visible = false;
      },
      // 过滤部门树函数
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      // // 部门树点击处理函数
      // checkHandler(obj, boolean) {
      //   // 如果选中该节点，则进行判断
      //   if(boolean) {
      //     const departmentTree = this.departmentTree;
      //     const keysList = this.$refs.departmentsTree.getCheckedKeys();

      //     // 获取被选中的父节点和子节点
      //     const checkedParents = findCheckedParents(obj, departmentTree, keysList);
      //     const checkedChildren = findCheckedChildren(obj, keysList);
      //     const checkedNodes = checkedParents.concat(checkedChildren);

      //     // 如果以前选中了父节点，则取消选中
      //     if (checkedNodes.length > 0) {
      //       this.showTips = true;

      //       checkedNodes.forEach(item => {
      //         this.$refs.departmentsTree.setChecked(item, false);
      //       });
      //     }
      //   }
      // },
      // 部门树点击处理函数(新逻辑,只能单选)
      checkHandler(obj, boolean) {
        // 如果选中该节点，则进行判断
        if (boolean) {
          // const departmentTree = this.departmentTree;
          const checkedNodeList = this.$refs.departmentsTree.getCheckedNodes();

          // 取消其他节点的选中状态
          checkedNodeList.forEach(item => {
            if (item.id !== obj.id) {
              this.$refs.departmentsTree.setChecked(item, false);
            }
          });
        }
      },
      // 获取角色树
      getRoleList() {
        role.fetchList().then((res) => {
          if (res.data.code === 0) {
            this.roleList = res.data.data.records;
          }
        });
      },
      // 部门树改变设置部门id
      cascaderChangeHandler(val) {
        console.log(val);
        this.form.departmentId = val[val.length - 1];
      }
    },
    mounted() {
      this.$nextTick(function() {
        // 获取部门树
        this.getDepartmentTree();

        // 获取角色列表
        this.getRoleList();

        // 如果传了用户id参数则获取用户信息
        const userId = this.$route.params.userId;

        if (userId) {
          this.userId = userId;
        }

        if (userId) {
          this.title = '编辑用户';
          this.getUserInfo(userId);
        }
      });
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .yxy-view-password {
    cursor: pointer;
  }
  .yxy-view-password:hover {
    color: #303133;
  }
  /* 部门输入框样式 */
  .department-input {
    -webkit-appearance: none;
    /* background-color: #f6f7fa; */
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 1;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    transition: border-color .2s cubic-bezier(.645,.045,.355,1);
    width: 100%;
  }
  .department-input:hover {
    cursor: pointer;
  }

  /* 更改文档流方向 */
  .el-form {
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flex;
    display: -o-flex;
    display: flex;
    -webkit-flex-direction: column;
    -moz-flex-direction: column;
    -ms-flex-direction: column;
    -o-flex-direction: column;
    flex-direction: column;
    -webkit-flex-wrap: wrap;
    -moz-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    -o-flex-wrap: wrap;
    flex-wrap: wrap;
    height: 350px;
  }
  .el-form-item {
    width: 50%;
  }
  .form .el-input, .department-input {
    width: 300px;
  }

  /* 底部按钮居中 */
  .dialog-footer {
    text-align: center;
  }

  .tree-header {
    color: red;
  }
</style>
