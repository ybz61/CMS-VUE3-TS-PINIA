import type { RouteRecordRaw } from 'vue-router'
import type { IUserMenu } from '@/types'
// import router from '@/router'

function loadLoaclRoutes() {
  // 1.动态获取所有的路由对象, 放到数组中
  // * 路由对象都在独立的文件中
  // * 从文件中将所有路由对象先读取数组中
  const localRoutes: RouteRecordRaw[] = []
  // 1.1.读取 router/main 所有ts文件
  // const files = require.context('@/router/main', true, /\.ts/)  // webpack
  // vite
  const files: Record<string, any> = import.meta.glob('../router/main/**/*.ts', {
    eager: true
  })
  // console.log('[ files ] >', files)
  // 1.2.将加载的对象放到 localRoutes
  for (const key in files) {
    const module = files[key]
    // console.log('[ default ] >', module.default)
    localRoutes.push(module.default)
  }

  return localRoutes
}

export function mapMenusToRoutes(userMenu: IUserMenu) {
  // 1.加载本地路由
  const localRoutes = loadLoaclRoutes()

  // 2.根据菜单去匹配正确的路由
  const routes: RouteRecordRaw[] = []
  for (const menu of userMenu) {
    for (const submenu of menu.children) {
      const route = localRoutes.find((item) => item.path === submenu.url)
      if (route) {
        // router.addRoute('main', route)
        routes.push(route)
      }
    }
  }

  return routes
}
