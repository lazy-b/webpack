<template>
  <el-dialog title="编辑角色" :visible.sync="dialogFormVisible" top="8vh" :close-on-click-modal='false'>
    <el-form ref="dataForm" :model="dataForm"  label-width="82px" style='width: 400px; margin-left:50px;'>
      <el-form-item label="角色名称" prop="roleName" :rules="[{ required:true, message: '请输入角色名称', trigger: 'blur'}]">
        <el-input v-model="dataForm.roleName" :maxlength="50" placeholder="请输入角色名称，最长50个字符"></el-input>
      </el-form-item>
      <!-- <el-form-item label="角色标识" prop="roleSign" :rules="[{ required:true, message: '请输入角色标识', trigger: 'blur'}]">
        <el-input v-model="dataForm.roleSign" placeholder="请输入角色标识"></el-input>
      </el-form-item> -->
      <!--<el-form-item label="角色标识" prop="roleSign" :rules="[{ required:true, message: '请输入角色标识', trigger: 'blur'}]">
        <el-input v-model="dataForm.roleSign" placeholder="请输入角色标识"></el-input>
      </el-form-item>-->
      <!--<el-form-item label="角色范围" prop="scope" :rules="[{ required:true, message: '请选择角色范围', trigger: 'blur'}]">
        <el-select v-model="dataForm.scope" placeholder="请选择角色范围">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="角色类型" prop="type" :rules="[{ required:true, message: '请选择角色类型', trigger: 'blur'}]">
        <el-select v-model="dataForm.type" placeholder="请选择角色类型">
          <el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>-->
      <el-form-item label="备注" prop="remark">
        <el-input type="textarea" :maxlength="200" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容，最长200个字符" v-model="dataForm.description"></el-input>
      </el-form-item>
      <el-form-item label="菜单权限" prop="menuData" :rules="[{ required:true, validator: validatorHandler, trigger: 'blur'}]">
        <el-tree
          :props="props"
          :data="menuData"
          show-checkbox
          accordion
          node-key="id"
          :default-expanded-keys="menuKeyData"
          :default-checked-keys="dataForm.menuIdList"
          @check-change="handleCheckChange"
          ref="tree">
        </el-tree>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer text-center">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="update">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
  import { menu, role } from '@/api';
  export default {
    data() {
      return {
        dialogFormVisible: false,
        dataForm: {
          roleName: '',
          roleSign: this.roleSign,
          roleId: this.id,
          menuIdList: [],
          description: '',
          menuData: []
        },
        menuKeyData: [],
        menuData: [],
        props: {
          children: 'children',
          label: 'label',
          id: 'id',
          data: 'data'
        }
      };
    },
    methods: {
      show(form) {
        this.dialogFormVisible = true;
        this.dataForm.roleId = form.roleId;
        this.dataForm.roleName = form.roleName;
        this.dataForm.roleSign = form.roleSign;
        this.dataForm.description = form.description;
        this.getMenu(form.roleId);
        /* this.dataForm.scope = form.scope;
        this.dataForm.type = form.type; */
      },
      update() {
        this.setMenuList();
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            role.editRole(this.dataForm).then(response => {
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
      getMenuList(id) {
        menu.getMenuList().then(response => {
          if (response.data.code === 0) {
            this.menuData = response.data.data;
            this.menuData.forEach((item) => {
              for (let i = 0; i < this.dataForm.menuIdList.length; i++) {
                if (item.id === this.dataForm.menuIdList[i]) {
                  this.menuKeyData.push(item.id);
                }
              }
            });
          }
        });
      },
      // 获取角色菜单权限
      getMenu(id) {
        role.detailRole(id).then((res) => {
          if (res.data.code === 0) {
            this.dataForm.menuIdList = res.data.data.roleIdList;
            this.getMenuList(id);
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
