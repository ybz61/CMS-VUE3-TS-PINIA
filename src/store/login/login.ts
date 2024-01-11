import { ElMessage } from 'element-plus'
import { defineStore } from 'pinia'
import { userAccountLogin, queryUserInfoById, queryUserMenuByRoleId } from '@/service/login/login'
import router from '@/router'
import type { IAccount, ILoginState, IUserInfo, IUserMenu } from '@/types'
import { localCache } from '@/utils/cache'
import { LOGIN_ID, LOGIN_NAME, LOGIN_TOKEN } from '@/global/constants'
import { mapMenusToRoutes, mapMenuListToPermissions } from '@/utils/map-menus'
import useMainStore from '../main/main'

const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    id: -1,
    name: '',
    token: '',
    userInfo: <IUserInfo>{},
    userMenu: <IUserMenu>[],

    permissions: [],
    isLogining: false
  }),
  actions: {
    async loginAccountAction(account: IAccount) {
      this.isLogining = true
      // 1.账号登录, 获取token等信息
      const loginRes = await userAccountLogin(account)
      console.log('[ 账号登录 loginRes ] >', loginRes)
      this.id = loginRes.data.id
      this.name = loginRes.data.name
      this.token = loginRes.data.token
      localCache.setCache(LOGIN_ID, loginRes.data.id)
      localCache.setCache(LOGIN_NAME, loginRes.data.name)
      localCache.setCache(LOGIN_TOKEN, loginRes.data.token)
      if (loginRes.code == 200 || loginRes.code == 0) {
        ElMessage.success('登录成功')
        this.isLogining = false
      } else {
        ElMessage.error('登录失败')
        this.isLogining = false
      }

      // 2.查询登录用户信息
      const userInfoResult = await queryUserInfoById(loginRes.data.id)
      console.log('[ 查询用户信息 userInfoResult ] >', userInfoResult)
      const userInfo = userInfoResult.data
      this.userInfo = userInfo

      // console.log('[ this.userInfo.role ] >', this.userInfo.role)

      // 3.查询角色菜单树
      const userMenuResult = await queryUserMenuByRoleId(this.userInfo.role.id)
      console.log('[ 查询角色菜单树 userMenuResult ] >', userMenuResult)
      const userMenu = userMenuResult.data
      this.userMenu = userMenu

      // 4.进行本地缓存
      localCache.setCache('userInfo', userInfo)
      localCache.setCache('userMenu', userMenu)

      // 重点 请求所有roles/departments/menus数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()

      // 重点 获取登录用户的所有按钮的权限
      const permissions = mapMenuListToPermissions(userMenu)
      console.log('[ loginAccountAction permissions ] >', permissions)
      this.permissions = permissions

      // 重点 动态添加路由
      const routes = mapMenusToRoutes(userMenu)
      routes.forEach((route) => router.addRoute('Main', route))

      // 5.跳转到main
      router.push('/main')
    },

    loadLocalCacheAction() {
      // 1.用户进行刷新默认加载数据
      const id = localCache.getCache(LOGIN_ID)
      const name = localCache.getCache(LOGIN_NAME)
      const token = localCache.getCache(LOGIN_TOKEN)
      const userInfo = localCache.getCache('userInfo')
      const userMenu = localCache.getCache('userMenu')

      if (id && name && token && userInfo && userMenu) {
        this.id = id
        this.name = name
        this.token = token
        this.userInfo = userInfo
        this.userMenu = userMenu

        // 请求所有roles/departments/menus数据
        const mainStore = useMainStore()
        mainStore.fetchEntireDataAction()

        // 获取登录用户的所有按钮的权限
        const permissions = mapMenuListToPermissions(userMenu)
        console.log('[ loadLocalCacheAction permissions ] >', permissions)
        this.permissions = permissions

        // 动态添加路由
        const routes = mapMenusToRoutes(userMenu)
        routes.forEach((route) => router.addRoute('Main', route))
      }
    }
  }
})

export default useLoginStore
