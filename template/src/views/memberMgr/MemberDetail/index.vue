<template>
  <div class="app-container">
    <info></info>
    <el-tabs v-model="activeName">
      <!-- 扫码记录 -->
      <el-tab-pane label="扫码记录" name="first">
        <scan-history></scan-history>
      </el-tab-pane>
      <!-- 用户地址 -->
      <el-tab-pane label="用户地址" name="second">
        <member-area></member-area>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import Info from './components/info';
import memberArea from './components/memberArea';
import ScanHistory from './components/scanHistory';
export default {
  components: {
    'info': Info,
    'member-area': memberArea,
    'scan-history': ScanHistory
  },
  data() {
    return {
      activeName: 'first'
    };
  }
};
</script>
