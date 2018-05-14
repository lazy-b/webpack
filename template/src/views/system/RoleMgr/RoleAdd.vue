<template>
  <el-dialog title="新增角色" :visible.sync="dialogFormVisible" top="8vh" :close-on-click-modal='false'>
    <el-form ref="dataForm" :model="dataForm"  label-width="82px" style='width: 400px; margin-left:50px;'>
      <el-form-item label="角色名称" prop="roleName" :rules="[{ required:true, message: '请输入角色名称', trigger: 'blur'}]">
        <el-input v-model="dataForm.roleName" :maxlength="50" placeholder="请输入角色名称，最长50个字符"></el-input>
      </el-form-item>
      <!-- <el-form-item label="角色标识" prop="roleSign" :rules="[{ required:true, message: '请输入角色标识', trigger: 'blur'}]">
        <el-input v-model="dataForm.roleSign" placeholder="请输入角色标识"></el-input>
      </el-form-item> -->
      <el-form-item label="备注" prop="remark">
        <el-input type="textarea" :maxlength="200" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入备注，最长200个字符" v-model="dataForm.description"></el-input>
      </el-form-item>
      <el-form-item label="菜单权限"  prop="menuData" :rules="[{ required:true, validator: validatorHandler, trigger: 'blur'}]">
        <el-tree
          :props="props"
          :data="menuData"
          show-checkbox
          accordion
          @check-change="handleCheckChange"
          ref="tree">
        </el-tree>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer text-center">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
  import { role, menu } from '@/api';

  export default {
    data() {
      return {
        dialogFormVisible: false,
        dataForm: {
          roleName: '',
          menuIdList: [],
          description: '',
          menuData: []
        },
        menuData: [],
        props: {
          children: 'children',
          label: 'label',
          id: 'id',
          data: 'data'
        }
      };
    },
    mounted() {
      this.getMenuList();
    },
    methods: {
      show() {
        this.dialogFormVisible = true;
        this.dataForm = {
          roleName: '',
          roleSign: '',
          menuIdList: [],
          description: ''
        };
        this.$nextTick(() => {
          if (this.$refs['dataForm']) {
            this.$refs['dataForm'].clearValidate();
          }
        });
      },
      save() {
        this.setMenuList();
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            role.addRole(this.dataForm).then(response => {
              if (response.data.code === 0) {
                this.$message({
                  message: response.data.msg,
                  type: 'success',
                  duration: 1000
                });
                this.$emit('done');
                this.dialogFormVisible = false;
              } else {
                this.$message({
                  message: response.data.msg,
                  type: 'warning'
                });
              }
            });
          }
        });
      },
      // 获取菜单列表
      getMenuList() {
        menu.getMenuList().then(response => {
          if (response.data.code === 0) {
            this.menuData = response.data.data;
          }
        });
      },
      handleCheckChange(data, checked, indeterminate) {
        this.dataForm.menuData = data;
        // console.log(data, checked, indeterminate);
      },
      // 设置菜单id列表
      setMenuList() {
        let list = this.$refs['tree'].getCheckedNodes();
        this.dataForm.menuIdList = [];
        let item;
        for (let i = 0; i < list.length; i++) {
          item = list[i];
          this.dataForm.menuIdList.push(item.id);
        }
      },
      // 校验菜单权限
      validatorHandler(rule, value, callback) {
        let list = this.$refs['tree'].getCheckedNodes();
        //  console.log(list)
        if (list.length > 0) {
          callback();
        } else {
          callback(new Error('请选择菜单权限'));
        }
      }
    }
  };
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.el-form-item__content {
  margin-left: 82px!important;
}
</style>
