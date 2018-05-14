<template>
  <div class="pannel">
    <div class="pannel__title">
      <span>营销工具</span>
      <router-link to="/marketingTools/sms">&gt;短信应用</router-link>
      <span>&gt;\{{title}}</span>

    </div>
    <div class="pannel__content bg-white">
      <div class="notice">
        <em class="el-icon-warning warning--color"></em>
        当前发送主体为
        <span class=" pl20">【\{{form.orgName}}】</span>
      </div>

      <el-form size="small" class="full-form mt20" ref="form" :model="form" :rules="rules" label-position="right" label-width="220px">

        <el-form-item label="短信主题：" prop="title" required>
          <el-input type="text" v-model="form.title"></el-input>
          <span class="font12 font-grey">建议营销信息发送目标，如"热水器事业部双旦活动"</span>
        </el-form-item>

        <el-form-item label="主体名称：" required>
          \{{form.smsName}}
        </el-form-item>

        <el-form-item v-if="isEdit" label="短信内容：" required>
          \{{form.oldFile}}
          <p class="font12 font-grey">【温馨提示】：短信创建后不允许修改导入的文件，如需修改，请重新创建短信</p>
        </el-form-item>

        <el-form-item v-else label="短信内容：" prop="parsedFile" required>
          <el-button id="filePicker" type="primary" size="small">选择文件</el-button> \{{form.oldFile}}
          <span class="ml30 font12">
            <a target="_blank" href="http://cmms.midea.com/cmms-file/sms_p2p_template.xlsx" title="模板的第一行请删除">短信模板下载</a>
          </span>
          <p class="font12 font-grey">说明：短信内容超过59个字符，将按2条短信进行收费</p>
          <!-- 上传进度 -->
          <el-row v-show="uploadPm.progress>0">
            <el-progress :text-inside="true" :stroke-width="18" :percentage="uploadPm.progress*10" :status="uploadPm.progress==10?'success':''"></el-progress>
            <p>\{{uploadPm.statusDesc}}</p>
          </el-row>

        </el-form-item>

        <el-form-item label="短信后缀：" prop="author" required>
          回复TD退订
          <div class="sms-demo"> 示例
            <em class="sms-demo__icon el-icon-view"></em>
            <div class="bg-img sms-demo__img"></div>
          </div>
        </el-form-item>
        <el-form-item label="投放时间：" prop="zz_sendTime" required>
          <el-date-picker v-model="form.zz_sendTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
          <span class="font12 font-grey">短信投放时间点，建议避免用户休息时间</span>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">确定</el-button>
          <router-link to="/marketingTools/sms">
            <el-button>取消</el-button>
          </router-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
// import Api from 'js/constant.js'
// 文件上传
import WebUploader from 'webuploader'
import Util from './util'
import { sms } from '@/api/marketingCenter/sms';

export default {
  components: {},
  data() {
    return {
      title: '点对点短信',
      isEdit: false,
      submitUrl: sms.sendEvents,
      form: {
        couponId: '',
        // 1:批量；2:点对点;3:模板短信
        eventType: '2',
        id: '',
        oldFile: '',
        parsedFile: '',
        orgId: '',
        orgName: '',
        zz_sendTime: '',
        smsModuleId: '',
        smsName: '',
        smsSpid: '',
        title: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { max: 15, message: '最多输入15个字符', trigger: 'blur' }
        ],
        zz_sendTime: [
          {
            type: 'object',
            required: true,
            message: '请设置投放时间',
            trigger: 'change'
          }
        ]
      },

      uploadPm: {
        isUploading: false,
        progress: 0,
        statusDesc: ''
      }
    }
  },

  methods: {
    goBack() {
      this.$router.go(-1)
    },
    getOrgInfo() {
      // let pm = {teamId:global._teamId};
      this.$http.get(sms.getOrgMsg).then(rs => {
        if (0 === rs.data.code) {
          this.form.orgName = rs.data.data.orgName
          this.form.smsName = rs.data.data.smsName
          this.form.orgId = rs.data.data.orgId
          this.form.smsModuleId = rs.data.data.smsModuleId
          this.form.smsSpid = rs.data.data.smsSpid
          this.form.couponId = rs.data.data.couponId
        } else {
          this.$message({
            showClose: true,
            message: rs.data.msg,
            type: 'error',
            duration: 3000
          })
        }
      })
    },
    onSubmit() {
      if (!this.form.parsedFile || this.form.parsedFile.length === 0) {
        this.$message({
          showClose: true,
          message: '您尚未成功导入文件，请先导入再保存',
          type: 'warning',
          duration: 3000
        })
        return false
      }
      this.$refs.form.validate(valid => {
        if (valid) {
          let pm = Util.filterParam(this.form)
          if (this.isEdit) {
            let newPm = {}
            newPm.content = pm.content
            newPm.eventType = pm.eventType
            newPm.id = pm.id
            newPm.orgName = pm.orgName
            newPm.sendTime = pm.sendTime
            newPm.smsName = pm.smsName
            newPm.title = pm.title

            pm = newPm
          }
          this.$http.post(this.submitUrl, pm).then(rs => {
            if (0 === rs.data.code) {
              this.$message({
                showClose: true,
                message: '操作成功',
                type: 'success',
                duration: 3000
              })
              // 转到列表页
              this.$router.push({ name: 'smsList' })
            } else {
              this.$message({
                showClose: true,
                message: rs.data.msg,
                type: 'error',
                duration: 3000
              })
            }
          })
        } else {
          return
        }
      })
    },
    getEventDetail() {
      let pm = { id: this.form.id }
      this.$http.get(sms.getEventDetail, { params: pm }).then(rs => {
        if (0 === rs.data.code) {
          this.form.title = rs.data.data.title
          this.form.content = rs.data.data.content
          this.form.zz_sendTime = new Date(rs.data.data.processTime)
          this.form.oldFile = rs.data.data.oldFile
          this.form.parsedFile = rs.data.data.parseFile
        } else {
          this.$message({
            showClose: true,
            message: rs.data.msg,
            type: 'error',
            duration: 3000
          })
        }
      })
    }
  },
  mounted() {
    this.getOrgInfo()
    this.form.id = this.$route.query.id
    if (this.form.id) {
      this.submitUrl = sms.updateEvent
      this.isEdit = true
      this.getEventDetail()
    }

    var that = this

    let timer = null

    /* 文件上传 */
    var uploader = WebUploader.create({
      accept: {
        extensions: 'xlsx,xls',
        mimeTypes: 'application/xls,application/xlsx'
      },
      auto: true,
      server: sms.uploadSmsP2P,
      pick: '#filePicker'
    })
    uploader.on('beforeFileQueued', function(file) {
      if (file.ext != 'xlsx' && file.ext != 'xls') {
        that.$message({
          showClose: true,
          message: '不支持的文件类型',
          type: 'warning',
          duration: 3000
        })
        return false
      }
    })

    uploader.on('uploadBeforeSend', function(block, data) {
      data.smsName = that.form.smsName
    })

    // 文件被加入队列时
    uploader.on('fileQueued', function(file) {
      that.uploadPm.isUploading = true
      that.uploadPm.progress++
      that.uploadPm.statusDesc = '正在上传...'

      // 轮询后端文件是否处理完成

      let t = 0,
        st = new Date().getTime()
      timer = setInterval(function() {
        if (!that.uploadPm.isUploading) {
          // 上传完成
          clearInterval(timer)
          that.uploadPm.isUploading = false
          that.uploadPm.progress = 10
          that.uploadPm.statusDesc = '上传成功'
          console.log('上传成功,用时-' + (st - new Date().getTime()))
        } else {
          ++t
          that.uploadPm.progress = t > 9 ? 9 : t
          console.log('继续轮询,gogogo=' + t)
        }
      }, 1000)
    })

    // 后端通知成功接收到文件
    uploader.on('uploadSuccess', function(file, response) {
      let rs =
        typeof response._raw === 'string'
          ? JSON.parse(response._raw)
          : response._raw
      that.uploadPm.isUploading = false
      if (rs.code === 0 && rs.data.successNum > 0) {
        that.form.oldFile = rs.data.oldFile
        that.form.parsedFile = rs.data.parsedFile
        // 如果有错误   提示之
        if (rs.data.errorMsg) {
          that.$message({
            showClose: true,
            message:
              '成功' +
              rs.data.successNum +
              '条，失败' +
              rs.data.errorNum +
              '条。原因：' +
              rs.data.errorMsg,
            type: 'warning',
            duration: 3000
          })
        }
      } else {
        if (rs.data.errorMsg) {
          that.uploadPm.statusDesc = '上传失败，请按照模版上传'
          that.$message({
            showClose: true,
            message: rs.data.errorMsg,
            type: 'error',
            duration: 3000
          })
        } else if (rs.msg) {
          that.uploadPm.statusDesc = rs.msg
          that.$message({
            showClose: true,
            message: rs.msg,
            type: 'error',
            duration: 3000
          })
        } else {
          that.uploadPm.statusDesc = '上传失败'
        }
        clearInterval(timer)
      }
    })
    // 文件上传失败，显示上传出错。
    uploader.on('uploadError', function(file) {
      that.uploadPm.isUploading = false
      that.uploadPm.statusDesc = '上传失败'
      clearInterval(timer)
    })

    // let that = this;
    // // 是否修改
    // if(that.$route.query.id){
    //   that.title = "编辑图文";
    //   that.postUrl = Api.chgArticle;

    //   that.getItem(that.$route.query.id,()=>{

    //     editor.$txt.html(that.form.content );
    //   });
    // }
  }
}
</script>
<style lang="less" scoped>
@import './basic.less';
@import './style.less';
.notice {
  color: #999;
  background-color: #f4f5f9;
  padding: 10px;
}
.warning--color {
  color: @yellow;
}
.sms-demo {
  position: relative;
  font-size: 12px;
  color: #999;
  display: inline-block;
  margin-left: 20px;
  cursor: pointer;
  &__icon {
    color: @main-color;
  }
  &:hover {
    .sms-demo__img {
      visibility: visible;
      transition: visibility 1s;
    }
  }
  &__img {
    visibility: hidden;

    position: absolute;
    background-image: url(http://cmms.midea.com/s/platImgs/marketingTool/sms_demo_1.png);
    width: 200px;
    height: 355px;
    z-index: 1001;
    top: -65px;
    left: 45px;
  }
}
</style>
