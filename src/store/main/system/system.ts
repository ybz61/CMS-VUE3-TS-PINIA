import { defineStore } from 'pinia'
import {
  getUserListData,
  deleteUserById,
  newUserData,
  editUserData
} from '@/service/main/system/system'
import type { IUserListData } from '@/types'

const useSystemStore = defineStore('system', {
  state: (): IUserListData => ({
    userList: [],
    userTotalCount: 0

    // pageList: [],
    // pageTotalCount: 0
  }),
  actions: {
    async getUserListAction(queryInfo: any) {
      const userListDataRes = await getUserListData(queryInfo)
      const { list, totalCount } = userListDataRes.data
      this.userList = list
      this.userTotalCount = totalCount
    },
    async deleteUserByIdAction(id: number) {
      // 1.删除数据操作
      const deleteRes = await deleteUserById(id)
      // console.log('[ deleteRes ] >', deleteRes)
      if (deleteRes.code === 200) {
        alert(deleteRes.data)
      }
      // 2.重新请求新的数据
      this.getUserListAction({ offset: 0, size: 10 })
    },
    async newUserDataAction(userInfo: any) {
      // 1.创建新的用户
      const newRes = await newUserData(userInfo)
      // console.log('[ newRes ] >', newRes)
      if (newRes.code === 200) {
        alert(newRes.data)
      }
      // 2.重新请求新的数据
      this.getUserListAction({ offset: 0, size: 10 })
    },
    async editUserDataAction(id: number, userInfo: any) {
      // 1.更新用户的数据
      const editRes = await editUserData(id, userInfo)
      // console.log('[ editRes ] >', editRes)
      if (editRes.code === 200) {
        alert(editRes.data)
      }
      // 2.重新请求新的数据
      this.getUserListAction({ offset: 0, size: 10 })
    }
  }
})

export default useSystemStore
