import { createRouter, createWebHashHistory } from 'vue-router'
import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'
import { firstMenu } from '@/utils/map-menus'

const router = createRouter({
  // hash模式：createWebHashHistory
  history: createWebHashHistory(),
  routes: [
    // 映射关系:path => component
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/login',
      component: () => import('@/views/login/login.vue'),
      name: 'Login'
    },
    {
      path: '/main',
      component: () => import('@/views/main/main.vue'),
      name: 'Main'
      // children: localRoutes
    },
    {
      path: '/detail',
      component: () => import('@/views/main/story/list/detail.vue'),
      name: 'Detail'
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('@/views/not-found/not-found.vue')
    }
  ]
})

// // 1.获取所有的路由
// const localRoutes = [
//   {
//     path: '/main/analysis/overview',
//     component: () => import('@/views/main/analysis/overview/overview.vue')
//   },
//   {
//     path: '/main/analysis/dashboard',
//     component: () => import('@/views/main/analysis/dashboard/dashboard.vue')
//   },
//   {
//     path: '/main/system/role',
//     component: () => import('@/views/main/system/role/role.vue')
//   },
//   {
//     path: '/main/system/user',
//     component: () => import('@/views/main/system/user/user.vue')
//   }
// ]
// // 2.动态的添加路由
// router.addRoute('Main', localRoutes[0])
// router.addRoute('Main', localRoutes[1])

// 添加导航守卫
// 参数: to(跳转到的位置), from(从哪里跳转过来), next(下一步)
// 返回值: 返回值决定导航的路径(不返回或者返回undefined, 默认跳转)
// 举个栗子: / => /main
// to: /main from: / 返回值: /abc
router.beforeEach((to) => {
  // 只有登录成功(token), 才能真正进入到main页面
  const token = localCache.getCache(LOGIN_TOKEN)
  if (to.path.startsWith('/main') && !token) {
    return '/login'
  }

  // 进入到匹配的第一个菜单
  if (to.path === '/main') {
    return firstMenu?.url
  }
})

export default router
