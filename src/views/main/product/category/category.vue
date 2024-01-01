<template>
  <div class="category">
    <page-search :search-config="searchConfig" />
  </div>
</template>

<script setup lang="ts">
import PageSearch from '@/components/page-search/page-search.vue'

import searchConfig from './config/search.config'
</script>

<style scoped lang="less">
.category {
  color: red;
}
</style>
