<template>
  <el-dialog title="新增菜单" :visible.sync="dialogFormVisible" top="8vh" :close-on-click-modal='false'>
    <el-form ref="dataForm" :model="dataForm"  label-width="80px" style='width: 400px; margin-left:50px;'>
      <el-form-item label="上级菜单" prop="pName">
        <el-input v-model="dataForm.pName" disabled></el-input>
      </el-form-item>
      <el-form-item label="菜单类型" prop="type" :rules="[{ required:true, message: '请选择菜单类型', trigger: 'change'}]">
        <el-radio v-model="dataForm.type" :label="0">目录</el-radio>
        <el-radio v-model="dataForm.type" :label="1">菜单</el-radio>
        <el-radio v-model="dataForm.type" :label="2">按钮</el-radio>
      </el-form-item>
      <el-form-item label="菜单名称" prop="name" :rules="[{ required:true, message: '请输入菜单名称', trigger: 'change'}]">
        <el-input v-model="dataForm.name" placeholder="请输入菜单名称"></el-input>
      </el-form-item>
      <el-form-item label="链接地址" prop="perms" :rules="[{ required:true, message: '请输入链接地址', trigger: 'change'}]">
        <el-input v-model="dataForm.perms" placeholder="请输入链接地址"></el-input>
      </el-form-item>
      <!--<el-form-item label="授权" prop="perms">
        <el-input v-model="dataForm.perms" placeholder="请输入授权，多个用逗号分隔"></el-input>
      </el-form-item>-->
      <el-form-item label="排序号" prop="sort">
        <el-input v-model="dataForm.sort" placeholder="请输入排序号"></el-input>
      </el-form-item>
      <el-form-item label="是否可见" prop="visible" :rules="[{ required:true, message: '请选择是否可见', trigger: 'change'}]">
        <el-radio v-model="dataForm.visible" :label="1">否</el-radio>
        <el-radio v-model="dataForm.visible" :label="2">是</el-radio>
      </el-form-item>
      <el-form-item label="图标" prop="icon">
        <el-input v-model="dataForm.icon" placeholder="请输入图标"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer text-center">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
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
          parentId: null,
          pName: '',
          type: '',
          sort: '',
          name: '',
          url: '',
          perms: '',
          visible: '',
          icon: ''
        }
      };
    },
    methods: {
      show(params) {
        this.resetForm();
        if (params) {
          this.dataForm.parentId = params.id;
          this.dataForm.pName = params.label;
        } else {
          this.dataForm.pName = '根目录';
        }
        this.$nextTick(() => {
          if (this.$refs['dataForm']) {
            this.$refs['dataForm'].clearValidate();
          }
        });
        this.dialogFormVisible = true;
      },
      resetForm() {
        this.dataForm.parentId = null;
        this.dataForm.type = '';
        this.dataForm.name = '';
        this.dataForm.url = '';
        this.dataForm.perms = '';
        this.dataForm.visible = '';
        this.dataForm.icon = '';
      },
      save() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            menu.addMenu(this.dataForm).then(response => {
              if (response.data.code === 0) {
                this.$message({
                  message: response.data.msg,
                  type: 'success',
                  duration: 1000
                });
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
