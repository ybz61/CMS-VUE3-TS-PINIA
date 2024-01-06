<template>
  <div class="menu">
    <page-content :content-config="contentConfig">
      <template #icon="scope">
        <el-icon v-if="scope.row.icon">
          <component :is="scope.row.icon.split('-icon-')[1]" />
        </el-icon>
      </template>
    </page-content>
  </div>
</template>

<script setup lang="ts" name="menu">
import PageContent from '@/components/page-content/page-content.vue'
import contentConfig from './config/content.config'
</script>

<style lang="less" scoped></style>
