import appRequest from '@/service'

/** 用户管理 */
// 查询用户列表
export function getUserListData(queryInfo: any) {
  return appRequest.post({
    url: '/users/list',
    data: queryInfo
    // data: {
    //   offset: 0,
    //   size: 10
    // }
  })
}
// 删除用户
export function deleteUserById(id: number) {
  return appRequest.delete({
    url: `/users/${id}`
  })
}
// 创建用户
export function newUserData(userInfo: any) {
  return appRequest.post({
    url: '/users',
    data: userInfo
  })
}
// 修改用户
export function editUserData(id: number, userInfo: any) {
  return appRequest.patch({
    url: `/users/${id}`,
    data: userInfo
  })
}

/** 针对页面的网络请求: 增删改查 */
export function getPageListData(pageName: string, queryInfo: any) {
  return appRequest.post({
    url: `/${pageName}/list`,
    data: queryInfo
  })
}
export function deletePageById(pageName: string, id: number) {
  return appRequest.delete({
    url: `/${pageName}/${id}`
  })
}
export function newPageData(pageName: string, pageInfo: any) {
  return appRequest.post({
    url: `/${pageName}`,
    data: pageInfo
  })
}
export function editPageData(pageName: string, id: number, pageInfo: any) {
  return appRequest.patch({
    url: `/${pageName}/${id}`,
    data: pageInfo
  })
}
