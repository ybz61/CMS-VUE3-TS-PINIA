import { defineStore } from 'pinia'
import {
  getUserListData,
  deleteUserById,
  newUserData,
  editUserData,
  getPageListData,
  deletePageById,
  newPageData,
  editPageData
} from '@/service/main/system/system'
import type { IUserListData } from '@/types'
import useMainStore from '../main'

const useSystemStore = defineStore('system', {
  state: (): IUserListData => ({
    userList: [],
    userTotalCount: 0,

    pageList: [],
    pageTotalCount: 0
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
      if (deleteRes.code === 0) {
        alert(deleteRes.data)
      }
      // 2.重新请求新的数据
      this.getUserListAction({ offset: 0, size: 10 })
    },
    async newUserDataAction(userInfo: any) {
      // 1.创建新的用户
      const newRes = await newUserData(userInfo)
      // console.log('[ newRes ] >', newRes)
      if (newRes.code === 0) {
        alert(newRes.data)
      }
      // 2.重新请求新的数据
      this.getUserListAction({ offset: 0, size: 10 })
    },
    async editUserDataAction(id: number, userInfo: any) {
      // 1.更新用户的数据
      const editRes = await editUserData(id, userInfo)
      // console.log('[ editRes ] >', editRes)
      if (editRes.code === 0) {
        alert(editRes.data)
      }
      // 2.重新请求新的数据
      this.getUserListAction({ offset: 0, size: 10 })
    },

    /** 针对页面的数据: 增删改查 */
    async getPageListAction(pageName: string, queryInfo: any) {
      const pageListResult = await getPageListData(pageName, queryInfo)
      const { totalCount, list } = pageListResult.data

      this.pageList = list
      this.pageTotalCount = totalCount
    },
    async deletePageByIdAction(pageName: string, id: number) {
      const deleteRes = await deletePageById(pageName, id)
      if (deleteRes.code === 0) {
        alert(deleteRes.data)
      }
      this.getPageListAction(pageName, { offset: 0, size: 10 })
      // 获取完整的数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    },
    async newPageDataAction(pageName: string, pageInfo: any) {
      const newRes = await newPageData(pageName, pageInfo)
      if (newRes.code === 0) {
        alert(newRes.data)
      }
      this.getPageListAction(pageName, { offset: 0, size: 10 })

      // 获取完整的数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    },
    async editPageDataAction(pageName: string, id: number, pageInfo: any) {
      const editRes = await editPageData(pageName, id, pageInfo)
      if (editRes.code === 0) {
        alert(editRes.data)
      }
      this.getPageListAction(pageName, { offset: 0, size: 10 })

      // 获取完整的数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    }
  }
})

export default useSystemStore
