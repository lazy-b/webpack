<template>
  <el-dialog title="编辑菜单" :visible.sync="dialogFormVisible" top="8vh" :close-on-click-modal='false'>
    <el-form ref="dataForm" :model="dataForm"  label-width="80px" style='width: 400px; margin-left:50px;'>
      <!--<el-form-item label="上级菜单" prop="pName">
        <el-input v-model="dataForm.pName" disabled></el-input>
      </el-form-item>-->
      <el-form-item label="菜单名称" prop="name" :rules="[{ required:true, message: '请输入菜单名称', trigger: 'blur'}]">
        <el-input v-model="dataForm.name" placeholder="请输入菜单名称"></el-input>
      </el-form-item>
      <el-form-item label="菜单类型" prop="type" :rules="[{ required:true, message: '请选择菜单类型', trigger: 'blur'}]">
        <el-radio v-model="dataForm.type" :label="0">目录</el-radio>
        <el-radio v-model="dataForm.type" :label="1">菜单</el-radio>
        <el-radio v-model="dataForm.type" :label="2">按钮</el-radio>
      </el-form-item>
      <el-form-item label="链接地址" prop="perms" :rules="[{ required:true, message: '请输入链接地址', trigger: 'blur'}]">
        <el-input v-model="dataForm.perms" placeholder="请输入链接地址"></el-input>
      </el-form-item>
      <!--<el-form-item label="授权" prop="perms">
        <el-input v-model="dataForm.perms" placeholder="请输入授权，多个用逗号分隔"></el-input>
      </el-form-item>-->
      <el-form-item label="排序号" prop="sort">
        <el-input v-model="dataForm.sort" placeholder="请输入排序号"></el-input>
      </el-form-item>
      <el-form-item label="是否可见" prop="visible" :rules="[{ required:true, message: '请选择是否可见', trigger: 'blur'}]">
        <el-radio v-model="dataForm.visible" :label="1">否</el-radio>
        <el-radio v-model="dataForm.visible" :label="2">是</el-radio>
      </el-form-item>
      <el-form-item label="图标" prop="icon">
        <el-input v-model="dataForm.icon" placeholder="请输入图标"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer text-center">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="update">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
  import { menu } from '@/api';
  export default {
    data() {
      return {
        dialogFormVisible: false,
        dataForm: {
          menuId: '',
          parentId: '',
          pName: '',
          type: '',
          name: '',
          url: '',
          perms: '',
          visible: '',
          icon: '',
          sort: ''
        }
      };
    },
    methods: {
      show(params) {
        this.dataForm.menuId = params.id;
        this.dataForm.parentId = params.parentId;
        this.dataForm.type = params.data.type;
        this.dataForm.name = params.label;
        this.dataForm.url = params.data.url;
        this.dataForm.perms = params.data.perms;
        this.dataForm.visible = params.data.visible ? 2 : 1;
        this.dataForm.icon = params.data.icon;
        this.dataForm.sort = params.data.sort;
        this.dialogFormVisible = true;
      },
      update() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            menu.editMenu(this.dataForm).then(response => {
              if (response.data.code === 0) {
                if (response.data.msg) {
                  this.$message({
                    message: response.data.msg,
                    type: 'success'
                  });
                }
                this.$emit('done');
                this.dialogFormVisible = false;
                // window.location.reload();
              } else {
                this.$message({
                  message: response.data.msg,
                  type: 'warning'
                });
              }
            });
          }
        });
      }
    }
  };
</script>
