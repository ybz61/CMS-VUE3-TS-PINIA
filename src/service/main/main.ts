import appRequest from '@/service'

// 获取全部角色列表
export function getEntireRoles() {
  return appRequest.post({
    url: '/role/list',
    data: {
      offset: 0,
      size: 1000
    }
  })
}

// 获取全部部门列表
export function getEntireDepartments() {
  return appRequest.post({
    url: '/department/list',
    data: {
      offset: 0,
      size: 1000
    }
  })
}

// 获取全部菜单列表
export function getEntireMenus() {
  return appRequest.post({
    url: '/menu/list'
  })
}
