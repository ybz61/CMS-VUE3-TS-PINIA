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

  // return localRoutes
  // 不显示'overview'页面
  return localRoutes.filter((item) => item.path !== '/main/analysis/overview')
}

export let firstMenu: any = null

/**
 * 根据菜单匹配路由
 * @param userMenu
 * @returns
 */
export function mapMenusToRoutes(userMenu: IUserMenu) {
  // 1.加载本地路由
  const localRoutes = loadLoaclRoutes()

  // 2.根据菜单去匹配正确的路由
  const routes: RouteRecordRaw[] = []
  for (const menu of userMenu) {
    // console.log('[ menu ] >', menu)
    for (const submenu of menu.children ?? []) {
      const route = localRoutes.find((item) => item.path === submenu.url)
      if (route) {
        // 2.1.给route的一级菜单增加重定向功能（但是只需要添加一次即可）
        if (!routes.find((item) => item.path === menu.url)) {
          routes.push({
            path: menu.url,
            redirect: route.path
          })
        }

        // 2.2.将二级菜单添加到路由中
        routes.push(route)
        // router.addRoute('Main', route)
      }

      // 记录第一个被匹配到的菜单
      if (!firstMenu && route) {
        firstMenu = submenu
      }
    }
  }

  return routes
}

/**
 * 根据路径匹配菜单
 * @param path
 * @param userMenu
 * @returns
 */
export function mapPathToMenu(path: string, userMenu: IUserMenu) {
  for (const menu of userMenu) {
    for (const submenu of menu.children ?? []) {
      if (submenu.url === path) {
        return submenu
      }
    }
  }
}

/**
 * 根据路径匹配面包屑
 * @param path
 * @param userMenu
 * @returns
 */
interface IBreadCrumb {
  name: string
  path: string
}
export function mapPathToBreadCrumbs(path: string, userMenu: IUserMenu) {
  // 1.定义面包屑
  const breadCrumbs: IBreadCrumb[] = []
  // 2.遍历获取面包屑层级
  for (const menu of userMenu) {
    for (const submenu of menu.children ?? []) {
      if (submenu.url === path) {
        // 2.1.获取一级菜单
        breadCrumbs.push({
          name: menu.name,
          path: menu.url
        })
        // 2.2.获取二级菜单
        breadCrumbs.push({
          name: submenu.name,
          path: submenu.url
        })
      }
    }
  }
  return breadCrumbs
}

/**
 * 菜单映射到id的列表
 * @param menuList 菜单列表
 * @returns 菜单id列表 数字数组
 */
export function mapMenuListToIds(menuList: any[]) {
  const ids: number[] = []

  function recurseGetId(menus: any[]) {
    for (const item of menus) {
      if (item.children) {
        recurseGetId(item.children)
      } else {
        ids.push(item.id)
      }
    }
  }
  recurseGetId(menuList)

  return ids
}

/**
 * 从菜单列表中映射出权限列表 按钮权限
 * @param menuList 菜单列表
 * @returns 权限列表 字符串数组
 */
export function mapMenuListToPermissions(menuList: any[]) {
  const permissions: string[] = []

  function recurseGetPermission(menus: any[]) {
    for (const item of menus) {
      // [], null, undefined; []不会报错，结束递归；null, undefined会报错，结束递归
      if (item.type === 3) {
        permissions.push(item.permission)
      } else {
        recurseGetPermission(item.children ?? [])
      }
    }
  }
  recurseGetPermission(menuList)

  return permissions
}
