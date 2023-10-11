import { createRouter, createWebHashHistory } from 'vue-router'
import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'

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
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('@/views/not-found/not-found.vue')
    }
  ]
})

// 导航守卫
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
})

export default router
