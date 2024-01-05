import type { AxiosRequestConfig, AxiosResponse } from 'axios'

// 针对AxiosRequestConfig配置进行扩展
export interface AppInterceptor<T = AxiosResponse> {
  requestSuccessFn?: (
    config: AxiosRequestConfig & { showLoading?: boolean; skipError?: boolean }
  ) => AxiosRequestConfig
  requestFailureFn?: (err: any) => any
  responseSuccessFn?: (res: T) => T
  responseFailureFn?: (err: any) => any
}

export interface AppRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: AppInterceptor<T>
  showLoading?: boolean
  skipError?: boolean
}
