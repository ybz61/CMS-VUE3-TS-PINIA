export interface IAccount {
  name: string
  password: string
}

export interface ILoginState {
  id: number
  name: string
  token: string
  userInfo: IUserInfo
  userMenu: IUserMenu
}

// 查询某个用户
export interface IUserInfo {
  id: number
  name: string
  realname: string
  cellphone: number
  enable: number
  createAt: string
  updateAt: string
  role: IRole
  department: IDepartment
}
export interface IRole {
  id: number
  name: string
  intro: string
  createAt: string
  updateAt: string
}
export interface IDepartment {
  id: number
  name: string
  parentId: any
  createAt: string
  updateAt: string
  leader: string
}

// 查询角色菜单树
export type IUserMenu = IUserMenuRoot2[]
export interface IUserMenuRoot2 {
  id: number
  name: string
  type: number
  url: string
  icon: string
  sort: number
  children: IUserMenuChildren[]
}
export interface IUserMenuChildren {
  id: number
  url: string
  name: string
  sort: number
  type: number
  children?: IUserMenuChildren2[]
  parentId: number
}
export interface IUserMenuChildren2 {
  id: number
  url: any
  name: string
  sort: any
  type: number
  parentId: number
  permission: string
}
