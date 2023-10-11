import { defineStore } from 'pinia'
import { userAccountLogin, queryUserInfoById, queryUserMenuByRoleId } from '@/service/login/login'
import router from '@/router'
import type { IAccount, ILoginState, IUserInfo,IUserMenu } from '@/types'
import { localCache } from '@/utils/cache'
import { LOGIN_ID, LOGIN_NAME, LOGIN_TOKEN } from '@/global/constants'

const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    id: localCache.getCache(LOGIN_ID) ?? '',
    name: localCache.getCache(LOGIN_NAME) ?? '',
    token: localCache.getCache(LOGIN_TOKEN) ?? '',
    userInfo: <IUserInfo>{},
    userMenu: <IUserMenu>[]
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      // 1.账号登录, 获取token等信息
      const loginResult = await userAccountLogin(account)
      console.log('[ 账号登录 loginResult ] >', loginResult)
      this.id = loginResult.data.id
      this.name = loginResult.data.name
      this.token = loginResult.data.token

      // 2.进行本地缓存
      localCache.setCache(LOGIN_ID, loginResult.data.id)
      localCache.setCache(LOGIN_NAME, loginResult.data.name)
      localCache.setCache(LOGIN_TOKEN, loginResult.data.token)

      // 2.1.查询登录用户信息
      const userInfoResult = await queryUserInfoById(loginResult.data.id)
      console.log('[ 查询用户信息 userInfoResult ] >', userInfoResult)
      this.userInfo = userInfoResult.data

      console.log('[ this.userInfo.role ] >', this.userInfo.role)

      // 2.2.查询角色菜单树
      const userMenuResult = await queryUserMenuByRoleId(this.userInfo.role.id)
      console.log('[ 查询角色菜单树 userMenuResult ] >', userMenuResult)
      this.userMenu = userMenuResult.data

      // 跳转到main
      router.push('/main')
    }
  }
})

export default useLoginStore
