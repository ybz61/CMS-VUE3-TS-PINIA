import { BASE_URL, TIME_OUT } from './config'
import AppRequest from './request'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constants'

const appRequest = new AppRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestSuccessFn(config) {
      // 携带token
      const token = localCache.getCache(LOGIN_TOKEN)
      if (token) {
        config.headers!.Authorization = `Bearer ${token}`
        // config.headers.Authorization = `Bearer ${token}`
      }
      return config
    }
  }
})

export default appRequest
