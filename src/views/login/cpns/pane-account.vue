<template>
  <div class="pane_account">
    <el-form
      :model="accountForm"
      :rules="accountRules"
      ref="formRef"
      status-icon
      label-width="60px"
      size="large"
      label-position="left"
    >
      <el-form-item label="帐号" prop="name">
        <el-input v-model="accountForm.name" placeholder="请输入帐号" clearable />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="accountForm.password" show-password placeholder="请输入密码" clearable />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { FormRules, ElForm } from 'element-plus'
import { ElMessage } from 'element-plus'
// import { userAccountLogin } from '@/service/login/login'
import useLoginStore from '@/store/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'

const CACHE_NAME = 'name'
const CACHE_PWD = 'password'

// 1.定义表单数据: accountForm
const accountForm = reactive<IAccount>({
  name: localCache.getCache(CACHE_NAME) ?? '',
  password: localCache.getCache(CACHE_PWD) ?? ''
})

// 2.定义校验规则: accountRules
// const accountRules = reactive<FormRules>({
//   name: [
//     { required: true, message: '必须输入帐号信息', trigger: 'blur' },
//     {
//       pattern: /^[a-z0-9]{6,20}$/,
//       message: '必须是6~20数字或字母组成',
//       trigger: 'blur'
//     }
//   ],
//   password: [
//     { required: true, message: '必须输入密码信息', trigger: 'blur' },
//     {
//       pattern: /^[a-z0-9]{3,}$/,
//       message: '必须是3位以上数字或字母组成',
//       trigger: 'blur'
//     }
//   ]
// })
const accountRules: FormRules = {
  name: [
    { required: true, message: '必须输入帐号信息', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{6,20}$/,
      message: '必须是6~20位数字或字母组成',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '必须输入密码信息', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{3,}$/,
      message: '必须是3位以上数字或字母组成',
      trigger: 'blur'
    }
  ]
}

// 3.执行帐号的登录逻辑
const formRef = ref<InstanceType<typeof ElForm>>()
const loginStore = useLoginStore()
function loginAction(isRemPwd: boolean) {
  formRef.value?.validate((valid) => {
    if (valid) {
      // 1.获取用户输入的帐号和密码
      const { name, password } = accountForm
      // 2.向服务器发送网络请求(携带账号和密码)
      loginStore.loginAccountAction({ name, password }).then(() => {
        // 3.判断是否需要记住密码
        if (isRemPwd) {
          // 4.将帐号和密码保存到本地
          localCache.setCache(CACHE_NAME, name)
          localCache.setCache(CACHE_PWD, password)
        } else {
          // 5.清除本地保存的帐号和密码
          localCache.removeCache(CACHE_NAME)
          localCache.removeCache(CACHE_PWD)
        }
      })

      // userAccountLogin({ name, password }).then((res) => {
      //   console.log('[ 账号登录 res ] >', res)
      // })
    } else {
      ElMessage({
        showClose: true,
        message: '请您输入正确的格式后再操作.',
        type: 'error'
      })
      return false
    }
  })
}

// 4.暴露给父组件的数据、方法
defineExpose({
  loginAction
})
</script>

<style scoped lang="less"></style>
