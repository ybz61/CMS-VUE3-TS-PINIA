<template>
  <div class="header_crumb">
    <el-breadcrumb separator-icon="CaretRight">
      <template v-for="item in breadCrumbs" :key="item.name">
        <el-breadcrumb-item :to="{ path: item.path }">
          {{ item.name }}
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { computed, watchEffect, ref } from 'vue'
import { useRoute } from 'vue-router'
import useLoginStore from '@/store/login/login'
import { mapPathToBreadCrumbs } from '@/utils/map-menus'

const route = useRoute()
const userMenu = useLoginStore().userMenu

// const breadCrumbs = mapPathToBreadCrumbs(route.path, userMenu)
// 思路：改用计算属性或者watchEffect
// 1.计算属性
const breadCrumbs = computed(() => {
  return mapPathToBreadCrumbs(route.path, userMenu)
})
// 2.watchEffect
// const breadCrumbs = ref()
// watchEffect(() => {
//   breadCrumbs.value = mapPathToBreadCrumbs(route.path, userMenu)
// })
</script>

<style scoped lang="less">
// .header_crumb {
// }
</style>
