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
  isLoading: boolean
}

const useMainStore = defineStore('main', {
  state: (): IMainState => ({
    entireRoles: [],
    entireDepartments: [],
    entireMenus: [],

    pageList: [],
    pageTotalCount: 0,
    isLoading: false
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
      this.isLoading = true
      const pageListResult = await postPageListData(pageName, queryInfo)
      const { totalCount, list } = pageListResult.data

      this.pageList = list
      this.pageTotalCount = totalCount
      this.isLoading = false
    },
    async deletePageByIdAction(pageName: string, id: number) {
      const res = await deletePageById(pageName, id)
      if (res.code == 200 || res.code == 0) {
        ElMessage.success(res.message)
      }
      this.postPageListAction(pageName, { offset: 0, size: 10 })
      // 获取完整的数据
      this.fetchEntireDataAction()
    },
    async newPageDataAction(pageName: string, pageInfo: any) {
      const res = await newPageData(pageName, pageInfo)
      if (res.code == 200 || res.code == 0) {
        ElMessage.success(res.message)
      }
      this.postPageListAction(pageName, { offset: 0, size: 10 })
      // 获取完整的数据
      this.fetchEntireDataAction()
    },
    async editPageDataAction(pageName: string, id: number, pageInfo: any) {
      const res = await editPageData(pageName, id, pageInfo)
      if (res.code == 200 || res.code == 0) {
        ElMessage.success(res.message)
      }
      this.postPageListAction(pageName, { offset: 0, size: 10 })
      // 获取完整的数据
      this.fetchEntireDataAction()
    }
  }
})

export default useMainStore
