<template>
  <el-dialog title="新增部门" :visible.sync="dialogFormVisible" top="8vh" :close-on-click-modal='false'>
    <el-form ref="dataForm" :model="dataForm"  label-width="80px" style='width: 400px; margin-left:50px;'>
      <el-form-item label="上级部门" prop="parentIds" v-if="!editFlag">
        <el-cascader placeholder="选择上级部门" :options="cascaderOptions" :props="props" filterable change-on-select clearable v-model="dataForm.parentIds"></el-cascader>
      </el-form-item>
      <el-form-item label="上级部门" v-else>
        <el-input v-model="dataForm.parentName" disabled></el-input>
      </el-form-item>
      <el-form-item label="部门名称" prop="name" :rules="[{ required:true,  message: '请输入部门名称', trigger: 'change'}]">
        <el-input v-model="dataForm.name" :maxlength="50" placeholder="请输入部门名称，最长50字符"></el-input>
      </el-form-item>
      <!-- <el-form-item label="排序" prop="sort" :rules="[{ required:true,  message: '请输入部门排序', trigger: 'change'}]">
        <el-input v-model.number="dataForm.sort" placeholder="请输入部门排序"></el-input>
      </el-form-item> -->
      <el-form-item label="部门描述" prop="description">
        <el-input v-model="dataForm.description" :maxlength="200" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入部门描述，最长200字符"></el-input>
      </el-form-item>
      <!--<el-form-item label="状态" prop="delFlag">
        <el-switch
          v-model.number="dataForm.delFlag"
          active-value="1"
          inactive-value="0"
          active-text="正常"
          inactive-text="禁用">
        </el-switch>
      </el-form-item>-->
    </el-form>
    <div slot="footer" class="dialog-footer text-center">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
  import { dept } from '@/api';
  export default {
    data() {
      return {
        dialogFormVisible: false,
        editFlag: false,
        dataForm: {
          parentId: '',
          parentIds: [],
          name: '',
          sort: '',
          parentName: '',
          delFlag: '1',
          description: ''
        },
        cascaderOptions: [],
        props: {
          value: 'id'
        }
      };
    },
    methods: {
      show(params) {
        this.dataForm.parentIds = [];
        this.dataForm.parentId = null;
        this.dataForm.name = '';
        this.dataForm.sort = '';
        this.dataForm.delFlag = '1';
        this.dataForm.description = '';
        this.editFlag = false;
        if (params) {
          this.dataForm.parentId = params.id;
          this.dataForm.parentName = params.label;
          this.editFlag = true;
        } else {
          dept.getDeptTree().then(response => {
            let tree = JSON.stringify(response.data.data);
            tree = tree.replace(/,"children":\[\]/g, '');
            this.cascaderOptions = JSON.parse(tree);
          });
        }
        this.$nextTick(() => {
          if (this.$refs['dataForm']) {
            this.$refs['dataForm'].clearValidate();
          }
        });
        this.dialogFormVisible = true;
      },
      save() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            if (!this.editFlag) {
              // if (this.dataForm.parentId) {
              this.dataForm.parentId = Number(this.dataForm.parentIds[this.dataForm.parentIds.length - 1]);
              // } else {
              //   this.dataForm.parentId = 0;
              // }
            }
            dept.addDept(this.dataForm).then(response => {
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
      }
    }
  };
</script>
