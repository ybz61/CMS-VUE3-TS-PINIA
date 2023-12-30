<template>
  <div class="login_panel">
    <h1 class="title">后台管理系统</h1>
    <div class="tabs">
      <el-tabs type="border-card" stretch v-model="activeName">
        <!-- 1、帐号登录 -->
        <el-tab-pane label="帐号登录" name="account">
          <template #label>
            <div class="label">
              <el-icon><UserFilled /></el-icon>
              <span class="text">帐号登录</span>
            </div>
          </template>
          <pane-account ref="accountRef" />
        </el-tab-pane>
        <!-- 2、手机登录 -->
        <el-tab-pane label="手机登录" name="phone">
          <template #label>
            <div class="label">
              <el-icon><Cellphone /></el-icon>
              <span class="text">手机登录</span>
            </div>
          </template>
          <pane-phone />
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="controls">
      <template v-if="activeName === 'account'">
        <el-checkbox v-model="isRemPwd" label="记住密码" size="large" />
        <el-link type="primary">忘记密码</el-link>
      </template>
    </div>
    <el-button class="login_btn" type="primary" size="large" @click="handleLoginBtnClick">
      立即登录
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import paneAccount from './pane-account.vue'
import panePhone from './pane-phone.vue'
import { localCache } from '@/utils/cache'

const activeName = ref('account')

// const isRemPwd = ref(false)
const isRemPwd = ref<boolean>(localCache.getCache('isRemPwd') ?? false)
watch(isRemPwd, (newVal) => {
  // console.log('[ isRemPwd newVal ] >', newVal)
  localCache.setCache('isRemPwd', newVal)
})

// const accountRef = ref<any>()
const accountRef = ref<InstanceType<typeof paneAccount>>()

// 立即登录
function handleLoginBtnClick() {
  if (activeName.value === 'account') {
    accountRef.value?.loginAction(isRemPwd.value)
  } else {
    // console.log('[ 手机登录 ] >')
  }
}
</script>

<style scoped lang="less">
.login_panel {
  width: 330px;
  margin-bottom: 150px;

  .title {
    text-align: center;
    margin-bottom: 15px;
  }

  .label {
    display: flex;
    align-items: center;
    justify-content: center;

    .text {
      margin-left: 5px;
    }
  }

  .controls {
    margin-top: 12px;
    display: flex;
    height: 40px;

    justify-content: space-between;
  }

  .login_btn {
    margin-top: 10px;
    width: 100%;
    // --el-button-size: 50px;
  }
}
</style>
