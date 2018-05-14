<!-- 字典管理弹窗页面 -->
<template>
  <div class="yxy-user-dialog">
    <el-dialog
      :title="dialogTitle"
      append-to-body
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :visible.sync="visible">
        <!-- :rules="rules" -->
      <el-form
        ref="form"
        :model="form"
        label-width="140px">

        <el-form-item label="父级编号">
          <el-input v-model="form.parentId"></el-input>
        </el-form-item>
        <el-form-item label="字典名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="数据值">
          <el-input v-model="form.value"></el-input>
        </el-form-item>
        <el-form-item label="排序（升序）">
          <el-input v-model="form.sort"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-input v-model="form.type"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item label="备注信息">
          <el-input v-model="form.remarks"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch 
            :active-value='switchValue.active'
            :inactive-value='switchValue.inactive'
            v-model='form.delFlag'>
          </el-switch>
          <span>
            \{{form.delFlag == '1' ? "正常" : "删除"}}
          </span>
        </el-form-item>

      </el-form>

      <!-- 操作按钮 -->
      <div slot="footer" class="dialog-footer text-center">
        <el-button type="primary" @click='save'>提 交</el-button>
        <el-button @click='visible = false'>取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  // 验证规则
  // import rules from '@/rules';

  export default {
    components: {

    },
    data() {
      return {
        form: {
          // 实体id（标识字段）
          id: '',
          // 描述
          description: '',
          // 标签名
          name: '',
          // 父级编号
          parentId: '',
          // 备注信息
          remarks: '',
          // 排序（升序）
          sort: '',
          // 类型
          type: '',
          // 数据值
          value: '',
          // 删除标记
          delFlag: '1'
        },
        // 切换用户状态映射对象
        switchValue: {
          active: '1',
          inactive: '0'
        },
      };
    },
    props: {
      // 弹窗是否可见，布尔值
      dialogFormVisible: {
        type: Boolean,
        default: false
      },
      // 弹窗标题，字符串
      dialogTitle: {
        type: String,
        default: '数据输入'
      },
      // 如果是修改表单，则有初始值
      defaultValue: null,
      // 是否是编辑信息模式
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      visible: {
        // getter函数
        get: function() {
          return this.dialogFormVisible;
        },
        // setter函数
        set: function(newValue) {
          // 调用父组件关闭弹窗函数
          if (!newValue) {
            this.$emit('closeDialog');
          }
        }
      }
    },
    watch: {
      // 在弹窗展示时判断是否对表单赋值
      dialogFormVisible: {
        handler(val, oldVal) {
          if (val) {

            if (this.isEdit) {
              this.setFormValue();
            } else {
              // debugger
              this.resetForm();
            }
          }
        },
        immediate: true
      }
    },
    methods: {
      // 保存数据操作（修改或者新增）
      save() {
        this.$refs.form.validate(result => {

          if (result) {

            if (this.isEdit) {
              // 调用父组件的添加操作，发起添加请求
              this.$emit('update', this.form);
            } else {
              this.$emit('save', this.form);
            }
            // 调用父组件的添加操作，发起添加请求
          } else {
            this.$message({
              type: 'info',
              message: '数据验证失败，请检查数据！！'
            });
          }
        });
      },
      // 设置表单初始值
      setFormValue() {
        const defaultValue = this.defaultValue;
        const form = this.form;

        for (let item in form) {
          if (defaultValue.hasOwnProperty(item)) {
            form[item] = defaultValue[item];
          }
        }
      },
      // 重置表单值
      resetForm() {
        const form = this.form;

        for (let item in form) {
          if (form.hasOwnProperty(item)) {
            if (item === 'delFlag') {
              form[item] = '1';
              continue;
            }
  
            form[item] = '';
          }
        }
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .yxy-view-password {
    cursor: pointer;
  }
  .yxy-view-password:hover {
    color: #303133;
  }
</style>
