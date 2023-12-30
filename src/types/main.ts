export interface IUserList {
  id: number
  name: string
  realname: string
  cellphone: number
  enable: number
  departmentId: number
  roleId: number
  createAt: string
  updateAt: string
}

export interface IUserListData {
  userList: IUserList[]
  userTotalCount: number,

  pageList: any[]
  pageTotalCount: number
}
