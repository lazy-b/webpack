<template>
  <!-- 主表格部分 -->
  <div>
    <!-- <page-nav></page-nav> -->
    <div class="app-container">
    <query-bar :query-list="queryList" @query="queryHandler" @reset="reset"></query-bar>

     <div class="button mt20 mb20">
      <el-button type="primary" @click="addHandler">新增</el-button>
    </div>

    <!-- 表格主体 -->
    <div class="table">
        <!-- @selection-change="handleSelectionChange" -->
      <el-table
        :data="sourceData"
        border
        style="width: 100%">

        <!-- 选择框 -->
            <!--         <el-table-column
          type="selection"
          fixed
          align="center"
          width="40">
        </el-table-column> -->

        <!-- 展示数据 -->
        <el-table-column
          fixed
          label="序号"
          min-width="60">
          <template slot-scope="scope">
            <span>\{{ getTableIndex(scope.$index) }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="nickname"
          label="姓名"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="username"
          label="用户名"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="userCode"
          label="员工编号"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别"
          min-width="60">
          <template slot-scope="scope">
            <span>\{{ scope.row.sex? '男' : '女' }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="roleName"
          label="角色"
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="departmentName"
          label="部门"
          show-overflow-tooltip
          min-width="160">
        </el-table-column>
        <el-table-column
          label="状态"
          min-width="160">
          <template slot-scope="scope">
            <span>\{{ scope.row.status? '正常' : '禁用' }}</span>
          </template>
        </el-table-column>
        <!-- 操作按钮 -->
        <el-table-column
          min-width="250"
          align="center"
          fixed="right"
          label="操作">
          <template slot-scope="scope">
            <!-- <el-button
              size="mini"
              type="text"
              @click="editRoles(scope.row.userId)">
              编辑角色
            </el-button> -->
            <el-button
              size="mini"
              type="text"
              @click="editHandler(scope.$index, scope.row)">
              编辑用户
            </el-button>
            <el-button
              size="mini"
              type="text"
              @click="updatePassword(scope.row)">
              修改密码
            </el-button>
          </template>
        </el-table-column>

        <!-- 修改角色 -->
        <role-transfer
          :userId='userIdForEditRoles'
          @closeDialog='closeEditRolesDialog'
          :dialogFormVisible='editRolesDialogVisible'>
        </role-transfer>

        <!-- 修改密码 -->
        <el-dialog
          title="修改密码"
          append-to-body
          :close-on-click-modal='false'
          :close-on-press-escape='false'
          :visible.sync='dialogFormVisible'>
          <el-form :model='updatePasswordForm' ref="passwords" :rules='rules'>
            <el-form-item label="用户名" label-width="120px">
              \{{updatePasswordForm.username}}
            </el-form-item>
            <el-form-item label="新密码" label-width="120px" prop="password">
              <el-input v-model='updatePasswordForm.password' type="password" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" label-width="120px" prop="newPassword2">
              <el-input v-model='updatePasswordForm.newPassword2' type="password" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click='dialogFormVisible = false'>取 消</el-button>
            <el-button type="primary" @click='updatePasswordHandler'>确 定</el-button>
          </div>
        </el-dialog>

      </el-table>
    </div>

    <!-- 表格底部，主要是分页栏 -->
    <div class="footer">
     <div class="pagination-container text-right">
       <el-pagination
         @size-change="handleSizeChange"
         @current-change="currentChangeHandler"
         background
         :current-page="pagination.currentPage"
         :page-sizes='pagination.pageSizes'
         :page-size='pagination.pageSize'
         layout="total, sizes, prev, pager, next, jumper"
         :total='pagination.total'>
       </el-pagination>
     </div>
    </div>
    </div>
  </div>
</template>

<script>
  import { users, role, dept } from '@/api';
  import RoleTransfer from './RoleTransfer';
  import { checkPassword } from '@/utils/validate';
  // import { pagination } from '@/mixins/table'

  export default {
    components: { RoleTransfer },
    // mixins: [pagination],
    // props: {
    //   // 部门id
    //   departmentId: {
    //     type: String,
    //     default: ''
    //   },
    //   // 重新加载表格标识
    //   isReload: {
    //     type: Boolean,
    //     default: false
    //   }
    // },
    watch: {
      // 只要请求参数发生了改变，则发起数据请求
      // 避免在多个地方重复调用请求函数
      params: {
        handler(value, oldValue) {
          // 发起数据请求
          this.getData();
        },
        immediate: true,
        deep: true
      },
      // 值为真时再次发起请求数据请求
      isReload: {
        handler(value, oldValue) {
          if (value) {
            this.getData();
          }
        }
      }
    },
    data() {
      // 密码
      const checkpassword = (rule, value, callback) => {
        if (this.updatePasswordForm.newPassword2 !== '') {
          this.$refs.passwords.validateField('newPassword2');
        }
        callback();
      };
      // 确认密码
      const checkNewPassword2 = (rule, value, callback) => {
        if (value !== this.updatePasswordForm.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        // 原始数据
        sourceData: [],
        // 多选框选中的值
        multipleSelection: [],
        // 状态筛选数组
        statusFilters: [
          { text: '正常', value: 1 },
          { text: '禁用', value: 0 }
        ],
        // 分页信息
        pagination: {
          total: 0,
          pageSizes: [10, 20, 50, 100],
          pageSize: 10,
          currentPage: 1,
        },
        // 搜索参数
        searchObject: {
          type: 'name',
          value: ''
        },
        // 作为参数发送给后台的搜索参数
        searchForParams: {
          type: 'name',
          value: ''
        },
        // 重置密码的弹窗
        updatePasswordForm: {
          oldPassword: '',
          password: '',
          newPassword2: '',
          username: ''
        },
        // 修改密码弹窗可见性
        dialogFormVisible: false,
        // 修改用户角色弹窗可见性
        editRolesDialogVisible: false,
        // 被编辑角色的用户id
        userIdForEditRoles: -1,
        // 验证规则
        rules: {
          oldPassword: [
            { required: true, message: '旧密码不能为空', trigger: 'blur' },
          ],
          // 密码
          password: [
            { required: true, message: '新密码不能为空', trigger: 'blur' },
            { validator: checkpassword, trigger: 'blur' },
            { validator: checkPassword(), trigger: 'blur' },
          ],
          // 确认密码
          newPassword2: [
            { required: true, message: '确认密码不能为空', trigger: 'blur' },
            { validator: checkNewPassword2, trigger: 'blur' }
          ],
        },
        form: null,
        queryList: [
          {
            key: 'nickname',
            label: '姓名',
            queryType: 'input'
          },
          {
            key: 'username',
            label: '用户名',
            queryType: 'input'
          },
          // {
          //   key: 'identification',
          //   label: '身份证',
          //   queryType: 'input'
          // },
          {
            key: 'roleId',
            label: '角色',
            queryType: 'select',
            list: []
          },
          {
            key: 'departmentId',
            label: '部门',
            queryType: 'tree',
            valueList: [],
            list: []
          }
        ],
      };
    },
    computed: {
      /**
       * 请求的参数
       * 根据外部传入的departmentId、页面内的分页信息确定
       * @return {Object} 请求参数对象
       */
      params() {
        // 前端的index从1开始，后端从0开始
        const index = this.pagination.currentPage - 1;
        const size = this.pagination.pageSize;
        // const id = this.departmentId;
        const searchType = this.searchForParams.type;
        const searchValue = this.searchForParams.value;
        const queryObject = {};

        // 根节点或者没有选择节点时不传deptId字段（后端要求）  //  诡异代码
        // if (id && id != -1) {
        //   queryObject.deptId = id;
        // }

        if (searchValue) {
          queryObject[searchType] = searchValue;
        }

        const queryString = JSON.stringify(queryObject);

        return {
          pageIndex: index,
          pageSize: size,
          query: queryString
        };
      }
    },
    mounted() {
      // 获取角色列表
      this.getRoleList();
      // 获取部门树
      this.getDeptList();
    },
    methods: {
      /**
       * 获取数据
       * @return {undefined} undefined
       */
      getData() {
        const params = this.form;
        console.log(params);
        users.getList(params).then((res) => {
          // 后台返回的数据
          const resData = res.data;

          // 获取数据成功则进行操作
          if (resData.code === 0) {
            const sourceData = resData.data;

            // 设置原始数据
            this.sourceData = sourceData.records;
            // 设置数据总条数
            this.pagination.total = sourceData.total;
          }
        }, (error) => {
          // debugger
          console.log(error);
        });
      },
      /**
       * 筛选状态
       * @param  {String} value 目标值
       * @param  {Object} row   某一行的数据
       * @return {Boolean}      该数据是否通过筛选
       */
      filterStatus(value, row) {
        return row.status === value;
      },
      /**
       * 多选框选中处理事件
       * @param  {Array} val 选中的行数组
       * @return {undefined}     暂时没有返回值
       */
      // handleSelectionChange(val) {
      //   this.multipleSelection = val;
      // },
      /**
       * 编辑处理程序
       * 1、导航到编辑用户页面
       */
      editHandler(index, row) {
        const params = {
          userId: row.userId
        };

        this.$router.push({ name: '编辑用户', params: params });
      },

      /**
       * 分页栏分页大小改变处理程序
       * @param  {Number} val 新的分页大小
       * @return {undefined}     暂时没有返回值
       */
      handleSizeChange(val) {
        this.pagination.pageSize = val;
      },
      /**
       * 分页栏当前页码改变处理程序
       * @param  {Number} val 改变后的页码值
       * @return {undefined}     暂时没有返回值
       */
      currentChangeHandler(val) {
        // if (this.sourceData.length > 0) {
        this.pagination.currentPage = val;
        // }
      },
      /**
       * 新增处理程序
       * 1、导航到新增用户页面
       */
      addHandler() {
        this.$router.push({ name: '新增用户' });
      },

      /**
       * 重置用户密码
       * 1.设置被重置密码的用户id
       * 2.打开重置密码的弹窗
       * @return {undefinded} undefinded
       */
      updatePassword(row) {
        console.log(row);
        this.updatePasswordForm.username = row.username;
        this.updatePasswordForm.oldPassword = '';
        this.$nextTick(() => {
          if (this.$refs['passwords']) {
            this.$refs['passwords'].resetFields();
          }
        });
        this.dialogFormVisible = true;
      },
      /**
       * 确认重置密码
       * 1.发起重置密码请求
       * @return {undefinded} undefinded
       */
      updatePasswordHandler() {
        this.$refs['passwords'].validate((valid) => {
          if (valid) {
            let param = {
              username: this.updatePasswordForm.username,
              password: this.updatePasswordForm.password
            };
            users.updatePassword(param).then((res) => {
              if (res.data.code === 0) {
                this.$message({
                  type: 'success',
                  message: '修改密码成功'
                });

                this.dialogFormVisible = false;
              } else {
                this.$message({
                  type: 'error',
                  message: '修改密码失败：' + res.data.msg
                });
              }
            });
          } else {
            return false;
          }
        });
      },
      /**
       * 查询处理程序
       * @return {undefinded} undefinded
       */
      searchHandler() {
        this.searchForParams.value = this.searchObject.value;
      },
      // 查询
      queryHandler(form) {
        console.log(form);
        this.form = form;
        this.getData();
      },
      // 重置
      reset(form) {
        this.form = {};
        this.getData();
      },
      // 修改用户角色处理程序
      // 设置用户id并打开弹窗
      editRoles(userId) {
        this.userIdForEditRoles = userId;

        this.editRolesDialogVisible = true;
      },
      // 关闭修改用户弹窗
      closeEditRolesDialog() {
        this.editRolesDialogVisible = false;
      },
      // 时间格式化函数
      formatterData(row, column, cellValue) {
        let result = '';

        if (cellValue) {
          const test = (cellValue + '').match(/(\d{4}-\d{2}-\d{2})(.*)/);

          result = test[1];
        }

        return result;
      },
      // 部门格式化函数
      formatterDept(row, column, cellValue) {

        return cellValue;
      },
      // 获取角色树
      getRoleList() {
        role.fetchList().then((res) => {
          if (res.data.code === 0) {
            const list = res.data.data.records;
            this.queryList[2].list = list.map((item) => ({
              name: item.roleName,
              value: item.roleId,
            }));
          }
        });
      },
      // 获取数据列表
      getDeptList() {
        dept.getDeptTree().then(response => {
          let tree = JSON.stringify(response.data.data);
          tree = tree.replace(/,"children":\[\]/g, '');
          this.queryList[3].list = JSON.parse(tree);
        });
      },
      // 获取序号
      getTableIndex(val) {
        let pageNumber = (this.pagination.currentPage - 1) * this.pagination.pageSize;
        return pageNumber + val + 1;
      }
    }
  };
</script>

<style scoped>
  .yxy-header {
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flex;
    display: -o-flex;
    display: flex;
    -webkit-flex-direction: row;
    -moz-flex-direction: row;
    -ms-flex-direction: row;
    -o-flex-direction: row;
    flex-direction: row;
    justify-content: space-between;
  }

  .header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    align-items: center;
    vertical-align: center;
    /* margin-bottom: 10px; */
  }

  .yxy-main {
    margin: 10px 0;
  }
</style>
