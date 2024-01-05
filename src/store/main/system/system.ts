import { defineStore } from 'pinia'
import {
  postUserListData,
  deleteUserById,
  newUserData,
  editUserData
} from '@/service/main/system/system'
import type { IUserListData } from '@/types'

const useSystemStore = defineStore('system', {
  state: (): IUserListData => ({
    userList: [],
    userTotalCount: 0,

    // pageList: [],
    // pageTotalCount: 0

    isLoading: false
  }),
  actions: {
    async postUserListAction(queryInfo: any) {
      this.isLoading = true
      const res = await postUserListData(queryInfo)
      const { list, totalCount } = res.data
      this.userList = list
      this.userTotalCount = totalCount
      this.isLoading = false
    },
    async deleteUserByIdAction(id: number) {
      // 1.删除数据操作
      const res = await deleteUserById(id)
      // console.log('[ res ] >', res)
      if (res.code == 200 || res.code == 0) {
        ElMessage.success(res.message)
      }
      // 2.重新请求新的数据
      this.postUserListAction({ offset: 0, size: 10 })
    },
    async newUserDataAction(userInfo: any) {
      // 1.创建新的用户
      const res = await newUserData(userInfo)
      // console.log('[ res ] >', res)
      if (res.code == 200 || res.code == 0) {
        ElMessage.success(res.message)
      }
      // 2.重新请求新的数据
      this.postUserListAction({ offset: 0, size: 10 })
    },
    async editUserDataAction(id: number, userInfo: any) {
      // 1.更新用户的数据
      const res = await editUserData(id, userInfo)
      // console.log('[ res ] >', res)
      if (res.code == 200 || res.code == 0) {
        ElMessage.success(res.message)
      }
      // 2.重新请求新的数据
      this.postUserListAction({ offset: 0, size: 10 })
    }
  }
})

export default useSystemStore
