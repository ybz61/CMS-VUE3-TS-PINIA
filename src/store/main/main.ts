import { defineStore } from 'pinia'
import {
  postEntireDepartments,
  postEntireRoles,
  postEntireMenus,
  postPageListData,
  deletePageById,
  newPageData,
  editPageData
} from '@/service/main/main'

interface IMainState {
  entireRoles: any[]
  entireDepartments: any[]
  entireMenus: any[]

  pageList: any[]
  pageTotalCount: number
}

const useMainStore = defineStore('main', {
  state: (): IMainState => ({
    entireRoles: [],
    entireDepartments: [],
    entireMenus: [],

    pageList: [],
    pageTotalCount: 0
  }),
  actions: {
    async fetchEntireDataAction() {
      const rolesRes = await postEntireRoles()
      const departmentsRes = await postEntireDepartments()
      const menuRes = await postEntireMenus()

      // 保存数据
      this.entireRoles = rolesRes.data.list
      this.entireDepartments = departmentsRes.data.list
      this.entireMenus = menuRes.data.list
    },

    /** 针对页面的数据: 增删改查 */
    async postPageListAction(pageName: string, queryInfo: any) {
      const pageListResult = await postPageListData(pageName, queryInfo)
      const { totalCount, list } = pageListResult.data

      this.pageList = list
      this.pageTotalCount = totalCount
    },
    async deletePageByIdAction(pageName: string, id: number) {
      const deleteRes = await deletePageById(pageName, id)
      if (deleteRes.code === 200) {
        alert(deleteRes.data)
      }
      this.postPageListAction(pageName, { offset: 0, size: 10 })
      // 获取完整的数据
      this.fetchEntireDataAction()
    },
    async newPageDataAction(pageName: string, pageInfo: any) {
      const newRes = await newPageData(pageName, pageInfo)
      if (newRes.code === 200) {
        alert(newRes.data)
      }
      this.postPageListAction(pageName, { offset: 0, size: 10 })
      // 获取完整的数据
      this.fetchEntireDataAction()
    },
    async editPageDataAction(pageName: string, id: number, pageInfo: any) {
      const editRes = await editPageData(pageName, id, pageInfo)
      if (editRes.code === 200) {
        alert(editRes.data)
      }
      this.postPageListAction(pageName, { offset: 0, size: 10 })
      // 获取完整的数据
      this.fetchEntireDataAction()
    }
  }
})

export default useMainStore
