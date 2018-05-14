<template>
  <el-dialog title="编辑部门" :visible.sync="dialogFormVisible" top="8vh" :close-on-click-modal='false'>
    <el-form ref="dataForm" :model="dataForm"  label-width="80px" style='width: 400px; margin-left:50px;'>
      <el-form-item label="上级部门" prop="parentName" v-if="hasParent">
        <el-input v-model="dataForm.parentName" disabled></el-input>
      </el-form-item>
      <el-form-item label="部门名称" prop="name" :rules="[{ required:true,  message: '请输入部门名称', trigger: 'change'}]">
        <el-input v-model="dataForm.name" placeholder="请输入部门名称，最长50字符"></el-input>
      </el-form-item>
      <!-- <el-form-item label="排序" prop="sort" :rules="[{ required:true,  message: '请输入部门排序', trigger: 'change'}]">
        <el-input v-model.number="dataForm.sort" placeholder="请输入部门排序"></el-input>
      </el-form-item>
      <el-form-item prop="enable">
        <el-switch
          v-model.number="dataForm.delFlag"
          :active-value="1"
          :inactive-value="-1"
          active-text="启用"
          inactive-text="停用">
        </el-switch>
      </el-form-item> -->
      <el-form-item label="部门描述" prop="description">
        <el-input v-model="dataForm.description" :maxlength="200" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入部门描述，最长200字符"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer text-center">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="update">修 改</el-button>
    </div>
  </el-dialog>
</template>
<script>
  import { dept } from '@/api';
  export default {
    data() {
      return {
        dialogFormVisible: false,
        hasParent: false,
        dataForm: {
          departmentId: '',
          parentId: '',
          parentName: '',
          name: '',
          sort: '',
          delFlag: '',
          description: ''
        }
      };
    },
    methods: {
      show(params) {

        this.dataForm.parentId = params.parentId;
        if (params.hasParent && params._parent) {
          this.hasParent = params.hasParent;
          this.dataForm.parentName = params._parent.label;
        }
        this.dataForm.name = params.label;
        this.dataForm.sort = params.sort;
        if (params.delFlag !== null && params.delFlag !== undefined) {
          this.dataForm.delFlag = params.delFlag;
        }
        this.dataForm.departmentId = params.id;
        this.dialogFormVisible = true;
        this.dataForm.description = params.data.description;
      },
      update() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            dept.editDept(this.dataForm).then(response => {
              if (response.data.code === 0) {
                if (response.data.msg) {
                  this.$message({
                    message: response.data.msg,
                    type: 'success'
                  });
                }
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
      }
    }
  };
</script>
