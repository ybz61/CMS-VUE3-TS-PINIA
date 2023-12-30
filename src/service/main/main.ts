import hyRequest from '@/service'

// 获取全部角色列表
export function getEntireRoles() {
  return hyRequest.post({
    url: '/role/list'
  })
}

// 获取全部部门列表
export function getEntireDepartments() {
  return hyRequest.post({
    url: '/department/list'
  })
}

// 获取全部菜单列表
export function getEntireMenus() {
  return hyRequest.post({
    url: '/menu/list'
  })
}
