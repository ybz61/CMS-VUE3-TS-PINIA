import hyRequest from '@/service'
import type { IAccount } from '@/types'
// import { localCache } from '@/utils/cache'
// import { LOGIN_TOKEN } from '@/global/constants'

// 用户登录
export function userAccountLogin(account: IAccount) {
  return hyRequest.post({
    url: '/login',
    data: account
  })
}

// 查询某个用户
export function queryUserInfoById(id: number) {
  return hyRequest.get({
    url: `/users/${id}`
    // headers: {
    //   Authorization: 'Bearer ' + localCache.getCache(LOGIN_TOKEN)
    // }
  })
}

// 查询角色菜单树
export function queryUserMenuByRoleId(id: number) {
  return hyRequest.get({
    url: `/role/${id}/menu`
  })
}
