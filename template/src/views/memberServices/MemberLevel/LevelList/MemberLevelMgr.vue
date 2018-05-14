<template>
  <!-- <el-card class="channel-item" shadow="hover"> -->
  <el-card class="level-mgr-container">
  <el-form :model="level">
    <el-form-item label="适用渠道：">
      <el-select :disabled="isEdit" v-model="level.channelId" placeholder="请选择适用渠道">
        <el-option
          v-for="(basicChannel, index) in basicChannelList"
          :label="basicChannel.channelName"
          :value="basicChannel.channelId"
          :key="index"
        ></el-option>
      </el-select>
    </el-form-item>
  </el-form>
    <el-table
      :data="levelInfos"
      :header-cell-style="{ textAlign: 'center' }"
      style="width: 100%;">
      <el-table-column
        label="等级"
        width="180">
        <template slot-scope="scope">
          <el-input size="mini" v-model="scope.row.label"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        label="名称"
        width="180">
        <template slot-scope="scope">
          <el-input size="mini" v-model="scope.row.name"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="成长值">
        <template slot-scope="scope">
          <el-input
            size="mini"
            class="ms-wp40"
            @change="setMinValue(scope.$index, scope.row.requiredGrow)"
            v-model.number="scope.row.requiredGrow"
          ></el-input>
          --
          <el-input size="mini" class="ms-wp40" disabled v-model="scope.row.max"></el-input>
        </template>
      </el-table-column>
      <el-table-column
        width="180"
      >
        <template slot-scope="scope">
          <div class="ms-text-left" v-show="scope.$index === levelInfos.length - 1">
            <i
              class="el-icon-delete level-tr-icon"
              @click="deleteRowHandler(scope.$index)"
            ></i><i
              class="el-icon-plus level-tr-icon"
              @click="addRowHandler(scope.$index)"
            ></i>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="level-button-container">
      <el-button
        type="primary"
        class="level-confirm-button"
        @click="confirmHandler"
        round
      >确 认</el-button>
    </div>
  </el-card>
</template>

<script>
  import { memberServices } from '@/api';

  export default {
    name: 'MemberLevelMgr',
    components: {},
    directives: {},
    filters: {},
    mixins: [],
    props: {},
    data() {
      return {
        // 等级
        level: {
          channelId: '',
        },
        // 等级列表信息
        levelInfos: [
          {
            label: '',
            name: '',
            requiredGrow: 0,
            max: '以上',
          },
        ],
        // 渠道列表
        basicChannelList: [
          {
            channelId: 1, // number, 渠道ID
            channelName: '集团' // string, 渠道名称
          }
        ],
      };
    },
    computed: {
      // 是否编辑状态
      isEdit() {
        const _channelId = this.editChannelId;
        return typeof _channelId === 'number';
      },
      // 被修改的渠道的渠道id
      editChannelId() {
        const editChannelId = +this.$route.params.channelId;
        return (typeof editChannelId === 'number' && isNaN(editChannelId)) ? '' : editChannelId;
      },
    },
    watch: {},
    created() {},
    mounted() {
      this.$nextTick(function() {
        this.getBasicChannelList();

        if (this.isEdit) {
          this.level.channelId = this.editChannelId;
          this.getMemberLevelListByChannelId();
        }
      });
    },
    methods: {
      /** 获取某个渠道的会员列表信息 */
      getMemberLevelListByChannelId() {
        const params = { channelId: this.editChannelId };
        memberServices.getMemberLevelListByChannelId(params).then(res => {
          if (res.data.code === 0) {
            const data = res.data.data;
            const levelInfos = data.map((item, index, array) => {
              if (index < array.length - 1) {
                const max = array[index + 1].requiredGrow - 1;
                return {
                  label: item.label,
                  name: item.name,
                  requiredGrow: item.requiredGrow,
                  max: max,
                };
              } else {
                return {
                  label: item.label,
                  name: item.name,
                  requiredGrow: item.requiredGrow,
                  max: '以上',
                };
              }
            });

            this.levelInfos = levelInfos;
          }
        });
      },
      /** 获取渠道列表 */
      getBasicChannelList() {
        memberServices.getBasicChannelList().then(res => {
          if (res.data.code === 0) {
            this.basicChannelList = res.data.data;
          }
        });
      },
      /** --------------- 说明 -------------  */
      /** 设置成长值处理程序 */
      setMinValue(index, val) {
        const data = this.levelInfos;
        const hasNext = index < (data.length - 1);
        const hasPre = index > 0;
        const nextMin = data[index + 1] && data[index + 1].requiredGrow;
        const preMin = data[index - 1] && data[index - 1].requiredGrow;

        // 第一级不能设置负数
        if (!hasPre && val < 0) {
          this.$message({
            type: 'warning',
            message: '负数不大合适吧',
          });

          data[index].requiredGrow = 0;
        }

        // 中间的等级必须比上一等级大，下一等级小
        if (hasPre && val <= preMin) {
          this.$message({
            type: 'warning',
            message: '必须大于上一等级的起始成长值哦',
          });
          data[index].requiredGrow = preMin + 1;
        }
        if (hasNext && nextMin !== '' && val >= nextMin) {
          this.$message({
            type: 'warning',
            message: '必须小于下一等级的起始成长值哦',
          });
          data[index].requiredGrow = +nextMin - 1;
        }

        // 使用data[index].min是因为在前面可能已经被改变了
        if (hasPre) {
          data[index - 1].max = data[index].requiredGrow - 1;
        }
      },
      /** 新增一行处理逻辑 */
      addRowHandler(index) {
        const data = this.levelInfos;
        if (data[index].requiredGrow === '') {
          this.$message({
            type: 'warning',
            message: '本级还没输入成长值呢',
          });
          return;
        }

        // 插入一行，考虑后续任意行插入而不是只能添加到最后一行
        data.splice(index + 1, 0, {
          label: '',
          name: '',
          requiredGrow: '',
          max: '以上',
        });
      },
      /** 删除一行处理逻辑 */
      deleteRowHandler(index) {
        const data = this.levelInfos;
        // 只剩一条时不允许删除
        if (data.length === 1) {
          this.$message({
            type: 'warning',
            message: '最后一级不能删除啦',
          });
          return;
        }

        this.$confirm('此操作将删除该级别, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (index === (data.length - 1)) {
            data[index - 1].max = '以上';
          }
          this.levelInfos.splice(index, 1);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      /** 确认按钮处理逻辑 */
      confirmHandler() {
        const canConfrim = this.validateHandler();
        if (!canConfrim) return;

        let levelInfos = JSON.parse(JSON.stringify(this.levelInfos));
        levelInfos = levelInfos.map((item, index) => ({
          sort: index + 1,
          label: item.label,
          name: item.name,
          requiredGrow: item.requiredGrow,
        }));

        const channelId = this.level.channelId;
        const data = { levelInfos, channelId };

        if (this.isEdit) {
          this.updateHandler(data);
        } else {
          this.saveHandler(data);
        }
      },
      saveHandler(data) {
        memberServices.putNewMemberLevel(data).then(res => {
          if (res.data.code === 0) {
            this.$message({
              type: 'success',
              message: '新建会员等级信息成功',
            });

            this.$router.push({ name: 'memberLevelList' });
          }
        });
      },
      updateHandler(data) {
        memberServices.updateMemberLevel(data).then(res => {
          if (res.data.code === 0) {
            this.$message({
              type: 'success',
              message: '编辑会员等级信息成功',
            });

            this.$router.push({ name: 'memberLevelList' });
          }
        });
      },
      /** 验证表单项 */
      validateHandler() {
        const data = this.levelInfos;
        // 是否没有未填项
        const noneEmpty = data.every(item => {
          let result = true;
          for (let key in item) {
            if (!item.hasOwnProperty(key)) continue;

            if (item[key] === '') {
              result = false;
            }
          }

          return result;
        });

        if (!noneEmpty) {
          this.$message({
            type: 'warning',
            message: '您还没填完呢~',
          });
          return false;
        }

        // 成长值设置是否正确
        const isReaso1nable = data.every((item, index, array) => {
          if (index > 0 && item.requiredGrow < array[index - 1].requiredGrow) {
            return false;
          }

          return true;
        });

        if (!isReaso1nable) {
          this.$message({
            type: 'warning',
            message: '这成长值有点把我搞糊涂了~',
          });
          return false;
        }

        return noneEmpty && isReaso1nable;
      },
    },
  };
</script>

<style scoped>
  .level-mgr-container {
    vertical-align: middle;
  }
  /* 操作按钮 */
  .level-tr-icon {
    cursor: pointer;
  }
  .level-tr-icon:hover {
    color: #3588de;
  }
  .level-tr-icon:nth-of-type(1) {
    margin-right: 20px;
  }
  /* 确认编辑、新建按钮 */
  .level-button-container {
    text-align: center;
  }
  .level-confirm-button {
    margin-top: 20px;
    width: 60%;
    max-width: 500px;
  }
</style>