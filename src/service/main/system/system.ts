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
