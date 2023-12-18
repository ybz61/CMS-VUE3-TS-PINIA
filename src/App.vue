<template>
  <div class="app">
    <el-config-provider :locale="zhCn">
      <router-view />
    </el-config-provider>
  </div>
</template>

<script setup lang="ts">
// 需要在 env.d.ts 中声明 .mjs 文件的模块
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
</script>

<style scoped lang="less">
.app {
  width: 100vw;
  height: 100vh;
}
</style>
