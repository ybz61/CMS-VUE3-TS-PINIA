<template>
  <div class="main_header">
    <div class="menu_icon" @click="handleFoldIconClick">
      <el-icon size="28px">
        <component :is="isFold ? 'Expand' : 'Fold'" />
      </el-icon>
    </div>
    <div class="content">
      <div class="breadcrumb">面包屑</div>
      <header-info />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import headerInfo from '@/components/main-header/cpns/header-info.vue'

// 0.内部自定义事件
const emit = defineEmits(['foldChange'])

// 1.记录折叠状态
const isFold = ref(false)
// 2.处理菜单图标点击事件
function handleFoldIconClick() {
  // 2.1.修改折叠状态
  isFold.value = !isFold.value
  // console.log('[ isFold ] >', isFold.value)
  // 2.2.触发自定义事件，将折叠状态传递给父组件
  emit('foldChange', isFold.value)
}
</script>

<style scoped lang="less">
.main_header {
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;
  .menu_icon {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 18px;
  }
}
</style>
