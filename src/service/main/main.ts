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

/** 针对页面的网络请求: 增删改查 */
export function newPageData(pageName: string, pageInfo: any) {
  return appRequest.post({
    url: `/${pageName}`,
    data: pageInfo
  })
}
export function deletePageById(pageName: string, id: number) {
  return appRequest.delete({
    url: `/${pageName}/${id}`
  })
}
export function editPageData(pageName: string, id: number, pageInfo: any) {
  return appRequest.patch({
    url: `/${pageName}/${id}`,
    data: pageInfo
  })
}
export function getPageListData(pageName: string, queryInfo: any) {
  return appRequest.post({
    url: `/${pageName}/list`,
    data: queryInfo
  })
}
