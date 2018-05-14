<template>
  <el-dialog title="新增任务" :visible.sync="dialogFormVisible" top="8vh" :close-on-click-modal='false'>
    <el-form ref="dataForm" :model="dataForm"  label-width="85px" style='width: 400px; margin-left:50px;'>
      <el-form-item label="任务名称" prop="jobName" :rules="[{ required:true, message: '请输入任务名称', trigger: 'blur'}]">
        <el-input v-model="dataForm.jobName" placeholder="请输入任务名称"></el-input>
      </el-form-item>
      <el-form-item label="任务分组" prop="jobGroup" :rules="[{ required:true, message: '请输入任务分组', trigger: 'blur'}]">
        <el-input v-model="dataForm.jobGroup" placeholder="请输入任务分组"></el-input>
      </el-form-item>
      <el-form-item label="任务类" prop="beanClass" :rules="[{ required:true, message: '请输入任务类', trigger: 'blur'}]">
        <el-input v-model="dataForm.beanClass" placeholder="请输入任务类"></el-input>
      </el-form-item>
      <el-form-item label="cron表达式" prop="cronExpression" :rules="[{ required:true, message: '请输入cron表达式', trigger: 'blur'}]">
        <el-input v-model="dataForm.cronExpression" placeholder="请输入cron表达式"></el-input>
      </el-form-item>
      <el-form-item label="是否同步" prop="isConcurrent" :rules="[{ required:true, message: '请选择是否同步', trigger: 'change'}]">
        <el-radio v-model="dataForm.isConcurrent" label="1">是</el-radio>
        <el-radio v-model="dataForm.isConcurrent" label="0">否</el-radio>
      </el-form-item>
      <el-form-item label="任务描述" prop="description">
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入任务描述" v-model="dataForm.description"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer text-center">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="save">提 交</el-button>
    </div>
  </el-dialog>
</template>
<script>
  import { job } from '@/api';
  export default {
    data() {
      return {
        dialogFormVisible: false,
        dataForm: {
          jobName: '',
          jobGroup: '',
          beanClass: '',
          cronExpression: '',
          description: '',
          isConcurrent: '1'
        }
      };
    },
    methods: {
      show() {
        this.resetForm();
        this.$nextTick(() => {
          if (this.$refs['dataForm']) {
            this.$refs['dataForm'].clearValidate();
          }
        });
        this.dialogFormVisible = true;
      },
      resetForm() {
        this.dataForm.jobName = '';
        this.dataForm.jobGroup = '';
        this.dataForm.beanClass = '';
        this.dataForm.cronExpression = '';
        this.dataForm.description = '';
      },
      save() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            job.addJob(this.dataForm).then(response => {
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
