<template>
  <!-- 穿梭框弹窗 -->
  <el-dialog
    :title='dialogTitle'
    append-to-body
    :visible.sync='visible' :close-on-click-modal='false'>

      <!-- :left-default-checked="[1]" -->
    <el-transfer
      filterable
      ref="transfer"
      v-model="values"
      :titles='titles'
      @change='rightChnageHandler'
      :right-default-checked="rightDefault"
      filter-placeholder="请输入角色名"
      :props="propsMap"
      :format='{
        noChecked: "${total}",
        hasChecked: "${checked}/${total}"
      }'
      :data="data">
    </el-transfer>

    <div slot="footer" class="dialog-footer">
      <el-button @click='cancelHandler'>取 消</el-button>
      <el-button type="primary" @click.stop='setRoles'>设 置</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import { role, users } from '@/api';

  export default {
    components: {

    },
    data() {
      return {
        // 弹窗名
        dialogTitle: '修改用户角色',
        // 弹窗可见性
        dialogVisible: true,
        // 列表标题
        titles: ['可用角色', '待设置角色'],
        // 穿梭框中间按钮文本
        buttonTexts: ['移出', '移入'],
        // 选中的值列表
        values: [],
        // 对数据值做映射
        propsMap: {
          key: 'roleId',
          label: 'roleName'
        },
        // 列表值
        data: [],
        // 右侧默认选中值
        rightDefault: []
      };
    },
    props: {
      // 用户id
      userId: {
        type: Number,
        required: true
      },
      // 弹窗是否可见，布尔值
      dialogFormVisible: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      visible: {
        handler(value, oldValue) {
          if (value) {
            this.getUserRoles(this.userId);
          }
        }
      }
    },
    computed: {
      // 弹窗可见性
      visible: {
        // getter函数
        get() {
          return this.dialogFormVisible;
        },
        // setter函数
        set(newValue) {
          // 调用父组件关闭弹窗函数
          if (!newValue) {
            this.$emit('closeDialog');
          }
        }
      }
    },
    methods: {
      // 获取该帐套下的角色列表信息
      getListRoles() {
        role.getListLimitByBook().then(res => {
          this.data = res.data.data;
        });
      },
      getUserRoles(userId) {
        const params = {
          userId: userId
        };

        // 首先清空上一个用户的数据
        this.values = [];
        this.rightDefault = [];

        return users.getUserRoles(params).then(res => {
          res.data.data.forEach(item => {
            this.values.push(item.roleId);
            // rightDefault使用push赋值不能正常显示
            // this.rightDefault.push(item.roleId);
          });
          this.rightDefault = this.values;
        });
      },
      // 取消设置
      cancelHandler() {
        // 清除过滤输入框
        const children = this.$refs.transfer.$children;
        children.forEach(item => {
          if (item.query) {
            item.query = '';
          }
        });

        this.visible = false;
      },
      // 设置角色（直接覆盖原有角色信息）
      setRoles() {
        const params = {
          roleIdList: this.values,
          userId: this.userId
        };

        users.setRoles(params).then(res => {
          this.$message({
            type: 'success',
            message: '操作成功'
          });

          // 关闭弹窗，提示用户操作成功
          this.visible = false;
        });
      },
      // 右侧元素变化处理程序
      rightChnageHandler(values, direction, keysArr) {
        this.rightDefault = values;
      }
    },
    mounted() {
      // 初始化时获取
      this.$nextTick(function() {
        // this.getListRoles();
      });
    }
  };
</script>

<style scoped>
  .el-transfer {
    display: block;
    text-align: left;
  }
</style>

