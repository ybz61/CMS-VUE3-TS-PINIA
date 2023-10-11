<template>
  <div class="main">
    <h2>main</h2>
    <button @click="handleExitClick">退出登录</button>
  </div>
</template>

<script setup lang="ts">
import { localCache } from '@/utils/cache'
import { LOGIN_ID, LOGIN_NAME, LOGIN_TOKEN } from '@/global/constants'
import { useRouter } from 'vue-router'

const router = useRouter()
function handleExitClick() {
  // 1. 清除本地缓存
  localCache.removeCache(LOGIN_ID)
  localCache.removeCache(LOGIN_NAME)
  localCache.removeCache(LOGIN_TOKEN)

  // 2. 跳转到登录页面
  router.push('/login')
}
</script>

<style scoped lang="less"></style>
