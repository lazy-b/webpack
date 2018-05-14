<template>
  <div class="ml15 mr15">
    <p>新建标签</p>
    <div class="label-content">
      <p>新增自定义标签</p>
      <div>
        <el-form ref="form" :model="form" label-width="80px" size="small" class="demo-dynamic">
          <el-form-item :label="'标签名称'" v-for="(item,index) in form.domains" :prop="'domains.' + index + '.name'" :key="index" :rules="{
      required: true, message: '标签名不能为空', trigger: 'blur'
    }" class="w350">
            <div class='ms-flex'>
              <el-input :maxlength="20" v-model="item.name" placeholder="请输入标签名称，最长二十个字"></el-input>
              &nbsp;
              <i class="el-icon-circle-plus fz20" @click='addDomain' v-if='index===form.domains.length-1&&form.domains.length<10'></i>
              <i @click="removeDomain(index)" class="el-icon-remove fz20 ms-ml15" v-if='(form.domains.length>1&&index<form.domains.length-1) || form.domains.length===10'></i>
            </div>
          </el-form-item>
          <el-form-item label="可见范围">
            <el-checkbox v-model="form.range">本账号</el-checkbox>
            <!-- <el-radio v-model="form.range" label="1">本账号</el-radio> -->
          </el-form-item>
          <div class="ms-text-left ms-pl15">
            <el-button type="primary" @click="addLabel" size="small">确定</el-button>
            <el-button size="small" @click="readyBack">取消</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { vip } from '@/api/marketingCenter/vip'
export default {
  data() {
    return {
      tagName: [],
      form: {
        domains: [
          {
            name: ''
          }
        ],
        range: ''
      }
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    this.$nextTick(function() {})
  },
  methods: {
    readyBack() {
      this.$router.push('/appMain/labelMgr');
    },
    addLabel() {
      // 新建标签
      this.$refs.form.validate(valid => {
        if (valid) {
          this.tagName = []
          for (let i in this.form.domains) {
            this.tagName.push(this.form.domains[i].name)
          }
          vip.memberSave(this.tagName).then(res => {
            if (res.data.code === 0) {
              this.$message({
                message: res.data.msg,
                type: 'success'
              })
            }
          })
        }
      })
    },
    removeDomain(index) {
      this.form.domains.splice(index, 1)
    },
    addDomain() {
      this.form.domains.push({
        name: ''
      })
    }
  }
}
</script>

<style lang='scss'>
.label-content {
  border-radius: 6px;
  background: #fff;
  padding: 20px;
}
.w350 {
  width: 350px;
}
.fz20 {
  font-size: 20px;
  color: #409eff;
  &:hover {
    cursor: pointer;
  }
}
</style>
