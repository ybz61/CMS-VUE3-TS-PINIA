<template>
  <div class="user">
    <user-search />
    <div class="content">
      <div class="header">头部</div>
      <div class="table">表格</div>
      <div class="pagination">分页</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import userSearch from './cpns/user-search.vue'
</script>

<style scoped lang="less">
.user {
  border-radius: 8px;
  overflow: hidden;
}
</style>
