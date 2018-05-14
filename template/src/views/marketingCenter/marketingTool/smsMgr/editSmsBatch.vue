<template>
  <div class="pannel">
    <div class="pannel__content bg-white">
      <div class="notice mt10 ">
        <em class="el-icon-warning warning--color"></em> 当前发送主体为
        <span class=" pl20">【\{{form.orgName}}】</span>
      </div>

      <el-form size='small' class="full-form mt20" ref="form" :model="form" :rules="rules" label-position="right" label-width="220px">

        <el-form-item label="短信主题：" prop="title" required>
          <el-input type="text" v-model="form.title"></el-input>
          <span class="font12 font-grey">建议营销信息发送目标，如"热水器事业部双旦活动"</span>
        </el-form-item>

        <el-form-item label="主体名称：" required>
          \{{form.smsName}}
        </el-form-item>

        <el-form-item v-if="isEdit" label="目标用户：" prop="_userDataType" required>
          \{{form.oldFile}}
          <p class="font12 font-grey">【温馨提示】：短信创建后不允许修改导入的文件，如需修改，请重新创建短信</p>
        </el-form-item>
        <template v-else>
          <el-form-item label="目标用户：" prop="_userDataType" required>
            <el-radio-group v-model="form._userDataType" @change="userDataChange">
              <el-radio label="option1">本地上传</el-radio>
              <el-radio label="option2">大数据取数</el-radio>
              <!-- <el-radio label="option3">我的筛选</el-radio> -->
            </el-radio-group>

          </el-form-item>

          <el-form-item v-show="form._userDataType == 'option2'" label="大数据取数：" prop="_fileName" required>
            <div class="inline width400">
              <el-input type="text" v-model="form._fileName" placeholder="请输入文件名"></el-input>
            </div>
            <el-button type="primary" @click.prevent="getUserForBatch()">确 认</el-button>
            <p class="font12" v-if="form.parsedFile">导入成功</p>
            <!--<el-button v-if="!form.parsedFile" slot="append" ">确认</el-button><el-button v-else slot="append"> <em class="el-icon-check color--success"></em> </el-button>-->
          </el-form-item>

          <el-form-item v-show="form._userDataType == 'option1'" label="本地上传：" prop="parsedFile" required>
            <el-button id="filePicker" type="primary" size="small">选择文件</el-button>
            <span class="ml30 font12">
              <a target="_blank" href="http://cmms.midea.com/cmms-file/sms_batch_template.xlsx">短信模板下载</a>
            </span>
            <p class="font12 font-grey line-height24">注意：手机号固定在A列，不可重复，格式正确，必须1开头，11位数字。变量取第一行B1单元格开始及之后非空的列名</p>
            <!-- 上传进度 -->
            <el-row v-show="uploadPm.progress>0">
              <el-progress :text-inside="true" :stroke-width="18" :percentage="uploadPm.progress*10" :status="uploadPm.status"></el-progress>
              <p>\{{uploadPm.statusDesc}}</p>
            </el-row>

          </el-form-item>
        </template>
        <el-form-item label="短信内容：" prop="content" required>
          <div class="flex">
            <div>
              <div class="textareaHeader">
                <span>签名：\{{form.smsName}}</span>
              </div>
              <el-input type="textarea" ref="smsContent" :rows="6" class="smsContent" v-model.trim="form.content" placeholder="目标用户来源于本地上传时：填入短信内容模板，变量用【Excel表里的列名】表示，变量名必须是用“#”框住的字符串，如：#会员姓名#，文件中除第一列之外的列名必须作为变量写入短信内容，右侧预览">
              </el-input>
            </div>
            <div class="ml10 previewDiv">
              <div class="arrow_box">
                <div class="preview">
                  【\{{form.smsName}}】\{{form.content}}
                  <span>&nbsp;\{{form.suffix}}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="flex mt10 mb30">
            <div>如需插入短链接：</div>
            <el-button type="primary" @click="showDialogHandler">选择短链接</el-button>
          </div>
          <p class="font12 font-grey">说明：短信内容超过60个字符，将按2条短信进行收费</p>
        </el-form-item>

        <el-form-item label="短信测试：" prop="_phones">
          <div class="flex-div">
            <el-input type="text" class="flex-input" v-model="form._phones" placeholder="请输入手机号码，多个手机号时请用分号隔开">
            </el-input>
            <el-button type="primary" class="flex-btn" :disabled="isSendPhone" @click.prevent="sendSmsTest">\{{sendPhoneName}}</el-button>
          </div>
        </el-form-item>

        <el-form-item label="短信后缀：" prop="author" required>
          \{{form.suffix}}
          <div class="sms-demo"> 示例
            <em class="sms-demo__icon el-icon-view"></em>
            <div class="bg-img sms-demo__img"></div>
          </div>
        </el-form-item>
        <el-form-item label="投放时间：" prop="zz_sendTime" :rules="sendTimeRule" required>
          <el-radio-group v-model="form._sendTimeStatus" @change="sendTimeChange">
            <el-radio label="0">立即发送</el-radio>
            <el-radio label="1">定时发送
              <div class="inline">
                <el-date-picker v-model="form.zz_sendTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
              </div>
            </el-radio>
          </el-radio-group>
          <p class="font12 font-grey">注意：短信投放时间点，建议避免用户休息时间</p>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">确定</el-button>
          <router-link to="/marketingTools/sms">
            <el-button>取消</el-button>
          </router-link>
        </el-form-item>
      </el-form>

    </div>
    <!-- <e-shortLinkDialog :dialogVisible="shortLinkdialogVisible" @shortLinkGetData="setShortLinkHandler" @shortLinkClose="closeDialogHandler"></e-shortLinkDialog> -->

  </div>
</template>
<script>
// import Api from '@/'
// 文件上传
import WebUploader from 'webuploader';
import { sms } from '@/api/marketingCenter/sms';
import Util from './util';
// import ShortLinkDialog from 'src/components/shortLinkDialog/index'
// import batchFilterDialog from '../../msgMgr/batchSend/batchFilterDialog.vue';
export default {
  // components: {
  //     batchFilterDialog
  // },
  data() {
    return {
      title: '批量短信',
      isEdit: false,
      submitUrl: sms.sendEvents,
      shortLink: null, // 返回短链接数据
      shortLinkdialogVisible: false, // 是否显示获取短链接弹窗
      isSendPhone: false,
      sendPhoneTimeIndex: 0,
      sendPhoneName: '发送测试短信',
      form: {
        couponId: '',
        // 1:批量；2:点对点;3:模板短信
        eventType: '1',
        id: '',
        // name  :'',
        oldFile: '',
        parsedFile: '',
        variables: '', // 上传文件列名
        orgId: '',
        orgName: '',
        _sendTimeStatus: '0',
        zz_sendTime: '',
        smsModuleId: '',
        smsName: '',
        smsSpid: '',
        title: '',
        content: '',
        shortLinkId: null, // 短链接id
        suffix: '回复TD退订',
        _userDataType: 'option1',
        _fileName: '',
        _phones: ''
      },
      rules: {
        title: [
          {
            required: true,
            message: '请输入标题',
            trigger: 'blur'
          },
          {
            max: 15,
            message: '最多输入15个字符',
            trigger: 'blur'
          }
        ],
        content: [
          {
            required: true,
            message: '请输入短信内容',
            trigger: 'blur'
          },
          {
            max: 250,
            message: '最多输入250个字符',
            trigger: 'blur'
          }
        ],
        _phones: [
          {
            validator: this.checkPhones,
            trigger: 'blur'
          }
        ]
        //
        // 'parsedFile':[{ required: true, message: '您尚未导入文件，请先导入再保存', trigger: 'change' }],
      },
      uploadPm: {
        isUploading: false,
        progress: 0,
        status: 'success',
        statusDesc: ''
      },
      filter: {
        dialog: false
      }
    };
  },
  computed: {
    sendTimeRule() {
      let sendTimeStatus = this.form._sendTimeStatus;
      return [
        {
          validator: this.checkSendTime,
          param: sendTimeStatus,
          trigger: 'change'
        }
      ];
    }
  },
  methods: {
    sendTimeChange(val) {
      if (val === '0') {
        this.form.zz_sendTime = '';
      }
    },
    // 投放时间校验
    checkSendTime(rule, value, callback) {
      if (rule.param === '1' && !value) {
        callback(new Error('请选择投放时间'));
      } else {
        callback();
      }
    },
    goBack() {
      this.$router.go(-1);
    },
    getOrgInfo() {
      sms.getOrgInfo().then(rs => {
        if (rs.data.code === 0) {
          this.form.orgName = rs.data.data.orgName;
          this.form.smsName = rs.data.data.smsName;
          this.form.orgId = rs.data.data.orgId;
          this.form.smsModuleId = rs.data.data.smsModuleId;
          this.form.smsSpid = rs.data.data.smsSpid;
          this.form.couponId = rs.data.data.couponId;
        } else {
          this.$message({
            showClose: true,
            message: rs.data.msg,
            type: 'error',
            duration: 3000
          });
        }
      });
    },
    // 取用户规则变化时，重置相关数据
    userDataChange(newVal) {
      this.form.oldFile = '';
      this.form.parsedFile = '';
      if (newVal === 'option1') {
        this.uploadPm.progress = 0;
      } else {
        this.form._fileName = '';
      }
    },
    getFilterId(id) {
      if (id) {
        this.filterId = id;
      } else {
        this.filterId = '0';
      }
    },
    // 从大数据获取发送目标用户文件
    getUserForBatch() {
      if (!this.form._fileName) {
        this.$message({
          showClose: true,
          message: '请输入文件名',
          type: 'warning',
          duration: 3000
        });
        return false;
      }
      this.form.parsedFile = '';
      this.form.variables = '';
      let pm = {
        fileName: this.form._fileName
      };
      this.$http.post(sms.getUserForBatch, pm).then(rs => {
        if (rs.data.code === 0) {
          this.form.oldFile = rs.data.data.oldFile;
          this.form.parsedFile = rs.data.data.parsedFile;
          this.form.variables = rs.data.data.variables;
        } else {
          this.$message({
            showClose: true,
            message: rs.data.msg,
            type: 'error',
            duration: 3000
          });
        }
      });
    },
    // 发送测试短信-todo
    sendSmsTest() {
      if (
        !this.form.parsedFile ||
        this.form.parsedFile.length === 0 ||
        this.uploadPm.status === 'exception'
      ) {
        this.$message({
          showClose: true,
          message: '您尚未成功导入文件，请先导入再保存',
          type: 'warning',
          duration: 3000
        });
        return false;
      }
      this.$refs.form.validate(valid => {
        if (valid) {
          // 测试手机号校验
          this.form._phones = this.form._phones.replace(/\s/g, '');
          if (!this.form._phones || !/^([\d]+;?)*$/.test(this.form._phones)) {
            this.$message({
              showClose: true,
              message: '请输入手机号码，多个手机号时请用分号隔开',
              type: 'warning',
              duration: 3000
            });
            return false;
          }
          let isValid = true;
          this.$refs.form.validateField('content', msg => {
            isValid = !(msg.length > 0);
          });
          this.$refs.form.validateField('_phones', msg => {
            isValid = !(msg.length > 0);
          });
          if (!isValid) {
            return false;
          }

          // 提交发送请求
          let pm = {};
          pm.content = this.form.content;
          pm.phones = this.form._phones;
          pm.smsModuleId = this.form.smsModuleId;
          pm.smsSpid = this.form.smsSpid;

          this.$http.post(sms.testSmsSend, pm).then(rs => {
            if (rs.data.code === 0) {
              this.$message({
                showClose: true,
                message: '发送成功',
                type: 'success',
                duration: 3000
              });
              this.countDownSendTime();
            } else {
              this.$message({
                showClose: true,
                message: rs.data.msg,
                type: 'error',
                duration: 3000
              });
            }
          });
        } else {
        }
      });
    },
    onSubmit() {
      if (
        !this.form.parsedFile ||
        this.form.parsedFile.length === 0 ||
        this.uploadPm.status === 'exception'
      ) {
        this.$message({
          showClose: true,
          message: '您尚未成功导入文件，请先导入再保存',
          type: 'warning',
          duration: 3000
        });
        return false;
      }
      this.$refs.form.validate(valid => {
        if (valid) {
          let pm = Util.filterParam(this.form);
          if (this.isEdit) {
            let newPm = {};
            newPm.content = pm.content;
            newPm.eventType = pm.eventType;
            newPm.id = pm.id;
            newPm.orgName = pm.orgName;
            newPm.suffix = pm.suffix;
            newPm.sendTime = pm.sendTime;
            newPm.smsName = pm.smsName;
            newPm.title = pm.title;
            if (pm.shortLinkId) {
              newPm.shortLinkId = pm.shortLinkId;
            }

            pm = newPm;
          }

          // 是否立即发送
          if (this.form._sendTimeStatus === '0') {
            pm.sendTime = new Date().getTime() + 30000;
          }

          this.$http.post(this.submitUrl, pm).then(rs => {
            if (rs.data.code === 0) {
              this.$message({
                showClose: true,
                message: '操作成功',
                type: 'success',
                duration: 3000
              });
              // 转到列表页
              this.$router.push({
                name: 'smsList'
              });
            } else {
              this.$message({
                showClose: true,
                message: rs.data.msg,
                type: 'error',
                duration: 3000
              });
            }
          });
        } else {
        }
      });
    },
    editInit() {
      let pm = {
        id: this.form.id
      };
      this.$http
        .get(sms.getEventDetail, {
          params: pm
        })
        .then(rs => {
          if (rs.data.code === 0) {
            let data = rs.data.data;
            this.form.title = data.title;
            this.form.content = data.content;
            this.form.oldFile = data.oldFile;
            this.form.parsedFile = data.parseFile;
            //						this.form.suffix = data.suffix;
            if (data.hasOwnProperty('shortLinkId')) {
              this.form.shortLinkId = data.shortLinkId;
            }

            // 是否立即发送
            let surplusTime = data.processTime - new Date().getTime();

            if (surplusTime < 30000) {
              this.form._sendTimeStatus = '0';
              this.form.zz_sendTime = '';
            } else {
              this.form._sendTimeStatus = '1';
              this.form.zz_sendTime = new Date(data.processTime);
            }
          } else {
            this.$message({
              showClose: true,
              message: rs.data.msg,
              type: 'error',
              duration: 3000
            });
          }
        });
    },
    // 显示短链接弹窗
    showDialogHandler() {
      this.shortLinkdialogVisible = true;
    },
    // 插入短链接
    setShortLinkHandler(data) {
      this.shortLinkdialogVisible = false;
      this.shortLink = data;
      if (this.shortLink) {
        if (window.getSelection) {
          let cursurPosition = this.$refs.smsContent.$refs.textarea
            .selectionStart;
          // console.log('cursurPosition',cursurPosition)
          let len = this.form.content.length || 0;
          if (len > 0) {
            let str1 = this.form.content.substring(0, cursurPosition);
            let str2 = this.form.content.substring(cursurPosition, len);
            this.form.content =
              str1 + ' ' + this.shortLink.shortUrl + ' ' + str2;
          } else {
            this.form.content =
              this.form.content + ' ' + this.shortLink.shortUrl;
          }
        } else {
          this.form.content = this.form.content + ' ' + this.shortLink.shortUrl;
        }
        this.form.shortLinkId = data.id;
        this.shortLink = null;
        this.$refs.form.validateField('content');
      }
    },
    // 关闭短链接弹窗
    closeDialogHandler() {
      this.shortLinkdialogVisible = false;
      this.shortLink = null;
    },
    // 测试手机号码校验
    checkPhones(rule, value, callback) {
      if (value) {
        let hasSemicoionIndex = value.indexOf(';');
        if (hasSemicoionIndex === -1) {
          if (!/^1(3|4|5|7|8)\d{9}$/.test(value)) {
            callback(new Error('请输入正确格式的电话号码'));
          } else {
            callback();
          }
        } else {
          let list = String(value).split(';');

          if (list.length > 0 && list.length < 4) {
            if (this.checkPhoneNumber(list)) {
              callback(new Error('请输入正确格式的电话号码'));
            } else {
              callback();
            }
          } else {
            callback(new Error('最多输入三个手机号码'));
          }
        }
      } else {
        callback();
      }
    },
    checkPhoneNumber(list) {
      let len = list.length;
      let item;
      let flag = false;

      while (len--) {
        item = list[len];
        if (!/^1(3|4|5|7|8)\d{9}$/.test(item)) {
          flag = true;
        }
      }
      return flag;
    },
    countDownSendTime() {
      this.isSendPhone = true;
      let index = 60;
      this.sendPhoneTimeIndex = setInterval(() => {
        index--;
        this.sendPhoneName = '剩余' + index + '秒';
        if (index <= 0) {
          this.isSendPhone = false;
          this.sendPhoneName = '发送测试短信';
          clearInterval(this.sendPhoneTimeIndex);
        }
      }, 1000);
    }
  },
  mounted() {
    this.getOrgInfo();
    if (this.$route.query.id) {
      this.submitUrl = sms.updateEvent;
      this.isEdit = true;
      this.form.id = this.$route.query.id;
      this.editInit();
    }
    var that = this;
    let timer = null;
    /* 文件上传 */
    var uploader = WebUploader.create({
      accept: {
        extensions: 'xlsx,xls',
        mimeTypes: 'application/xls,application/xlsx'
      },
      auto: true,
      server: sms.uploadSmsBatch,
      pick: '#filePicker',
      duplicate: true
    });
    uploader.on('beforeFileQueued', function(file) {
      if (file.ext != 'xlsx' && file.ext != 'xls') {
        that.$message({
          showClose: true,
          message: '不支持的文件类型',
          type: 'warning',
          duration: 3000
        });
        return false;
      }
    });
    // 文件被加入队列时
    uploader.on('fileQueued', function(file) {
      that.uploadPm.progress = 0;
      that.uploadPm.isUploading = true;
      that.uploadPm.progress++;
      that.uploadPm.statusDesc = '正在上传...';

      // 轮询后端文件是否处理完成
      let t = 0,
        st = new Date().getTime();
      timer = setInterval(function() {
        if (!that.uploadPm.isUploading) {
          // 上传完成
          clearInterval(timer);
          console.log('上传完成,用时-' + (st - new Date().getTime()));
          // 展示到列表里
          // that.searchResult.list.unshift(res.data.data);
        } else {
          ++t;
          that.uploadPm.progress = t > 9 ? 9 : t;
          console.log('继续轮询,gogogo=' + t);
        }
      }, 1000);
    });

    // 后端通知成功接收到文件
    uploader.on('uploadSuccess', function(file, response) {
      let rs =
        typeof response._raw === 'string' ?
          JSON.parse(response._raw) :
          response._raw;
      that.uploadPm.isUploading = false;
      that.uploadPm.progress = 10;
      if (rs.code === 0) {
        if (rs.data.errorNum === 0) {
          that.uploadPm.status = 'success';
          that.form.oldFile = rs.data.oldFile;
          that.form.parsedFile = rs.data.parsedFile;
          that.uploadPm.statusDesc = '上传成功';
          that.form.variables = rs.data.variables; // 上传文件列名，原样传给服务端
        } else {
          that.uploadPm.status = 'exception';
          that.uploadPm.statusDesc = '上传失败，原因：' + rs.data.errorMsg;
        }
      } else {
        that.uploadPm.status = 'exception';
        that.uploadPm.statusDesc = '上传失败，原因：' + rs.msg;
      }
    });
    // 文件上传失败，显示上传出错。
    uploader.on('uploadError', function(file) {
      that.uploadPm.isUploading = false;
      that.uploadPm.progress = 10;
      that.uploadPm.status = 'exception';
      that.uploadPm.statusDesc = '上传失败，请按照模版上传';
    });

    // let that = this;
    // // 是否修改
    // if(that.$route.query.id){
    //   that.title = "编辑图文";
    //   that.postUrl = Api.chgArticle;

    //   that.getItem(that.$route.query.id,()=>{

    //     editor.$txt.html(that.form.content );
    //   });
    // }
  },
  components: {
    // 'e-shortLinkDialog': ShortLinkDialog
  }
};
</script>
<style lang="less" scoped>
@import './basic.less';
@import './style.less';
.full-form {
  width: 800px;
}

.notice {
  color: #999;
  background-color: #f4f5f9;
  padding: 10px;
}

.warning--color {
  color: @yellow;
}

.flex-div {
  display: flex;
  align-items: center;
  .flex-btn {
    height: 30px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
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

.textareaHeader {
  display: block;
  width: 438px;
  height: 35px;
  line-height: 35px;
  font-size: 12px;
  border: 1px solid rgb(191, 203, 217);
  border-bottom: none;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  padding: 0 20px;
}

.smsContent {
  display: block;
  width: 100%;
  margin-top: -2px;
}

.previewDiv {
  display: block;
  position: absolute;
  margin-left: 500px;
  width: 180px;
  height: 135px;
}

.preview {
  width: 160px;
  height: 115px;
  line-height: 1.5;
  font-size: 12px;
  word-wrap: break-word;
  overflow-y: scroll;
  padding: 10px;
  text-align: justify;
}

.arrow_box {
  position: relative;
  background: #fff;
  border: 1px solid #bfcbd9;
  border-radius: 4px;
  width: 200px;
  height: 140px;
}

.arrow_box:after,
.arrow_box:before {
  right: 100%;
  top: 50%;
  border: solid transparent;
  content: ' ';
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
}

.arrow_box:after {
  border-color: rgba(255, 255, 255, 0);
  border-right-color: #fff;
  border-width: 12px;
  margin-top: -12px;
}

.arrow_box:before {
  border-color: rgba(191, 203, 217, 0);
  border-right-color: #bfcbd9;
  border-width: 13px;
  margin-top: -13px;
}

.shortTable {
  width: 100%;
}

.peopleNum {
  margin-top: -10px;
  span {
    margin-left: 10px;
    margin-right: 10px;
    font-size: 20px;
    color: #ff0000;
  }
}
</style>
<style lang="less" scoped="">
.flex {
  display: flex;
  align-items: center;
}

.flex-input {
  height: 30px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  input {
    border-top-right-radius: 0 !important;
    border-bottom-right-radius: 0 !important;
  }
}

.width400 {
  width: 400px;
}

.line-height24 {
  line-height: 24px;
}
</style>
