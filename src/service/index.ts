import AppRequest from './request'
import { BASE_URL, TIME_OUT } from './config'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constants'
import { AxiosError } from 'axios'
import { ElLoading, ElMessage } from 'element-plus'
import router from '@/router'

let ElLoadingInstance: any = null
let skipError: boolean = false

const appRequest = new AppRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    // 请求拦截器: 请求成功的回调函数
    requestSuccessFn(config) {
      console.log('实例请求成功')
      if (config.skipError != undefined) {
        skipError = config.skipError
      }
      if (config!.showLoading) {
        ElLoadingInstance = ElLoading.service({
          fullscreen: true,
          lock: true,
          text: '加载中...',
          background: 'rgba(0, 0, 0, 0.5)'
        })
      }

      // 添加token
      const token = localCache.getCache(LOGIN_TOKEN)
      if (token) {
        config.headers!.Authorization = `Bearer ${token}`
        // config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    // 响应拦截器: 响应失败的回调函数
    responseSuccessFn(res) {
      console.log('实例请求失败')
      if (res instanceof AxiosError) {
        if (skipError) {
          skipError = false
          return res
        }
        if (ElLoadingInstance) {
          ElLoadingInstance.close()
        }
        //如果是401，则跳转到登录页面
        if (res.response?.status == 401) {
          console.log('token失效')
          ElMessage.error({
            key: '401',
            grouping: true,
            message: res.response?.data?.message
          })
          router.replace('/login')
          return res
        }
        ElMessage.error(res.response?.data?.message)
        return res
      }
      if (ElLoadingInstance) {
        ElLoadingInstance.close()
      }
      return res
    }
  }
})

export default appRequest
