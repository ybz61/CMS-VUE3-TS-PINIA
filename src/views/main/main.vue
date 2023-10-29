<template>
  <div class="main">
    <el-container class="main_content">
      <el-aside :width="isFold ? '60px' : '210px'">
        <main-menu :is-fold="isFold"></main-menu>
      </el-aside>
      <el-container>
        <el-header>
          <main-header @fold-change="handleFoldChange"></main-header>
        </el-header>
        <!-- <el-main>Main</el-main> -->
        <router-view></router-view>
      </el-container>
    </el-container>

    <!-- <h2>main</h2> -->
    <!-- <button @click="handleExitClick">退出登录</button> -->
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import mainMenu from '@/components/main-menu/main-menu.vue'
import mainHeader from '@/components/main-header/main-header.vue'

// 处理main-header中折叠的变化
const isFold = ref(false)
function handleFoldChange(flag: boolean) {
  // console.log('[ flag ] >', flag)
  isFold.value = flag
}
</script>

<style scoped lang="less">
.main {
  height: 100%;
}
.main_content {
  height: 100%;
  .el-aside {
    overflow-x: hidden;
    overflow-y: auto;
    line-height: 200px;
    text-align: left;
    cursor: pointer;
    background-color: #001529;
    scrollbar-width: none; /* firefox */
    -ms-overflow-style: none; /* IE 10+ */

    transition: width 0.3s ease;

    &::-webkit-scrollbar {
      display: none;
    }
  }
  .el-main {
    background-color: #f0f2f5;
  }
}
</style>
