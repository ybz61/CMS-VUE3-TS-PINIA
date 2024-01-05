import { defineStore } from 'pinia'
import { postStoryList, createNewStory, getStoryDetail } from '@/service/main/story/story'

interface IStoryState {
  storyList: any[]
  storyTotalCount: number

  storyOffset: number
  storySize: number

  isLoading: boolean
  storyDetail: any
}

const useStoryStore = defineStore('story', {
  state: (): IStoryState => ({
    storyList: [],
    storyTotalCount: 0,

    storyOffset: 0,
    storySize: 100,

    isLoading: false,
    storyDetail: {}
  }),
  actions: {
    async postStoryListAction() {
      this.isLoading = true
      const res = await postStoryList({
        offset: this.storyOffset,
        size: this.storySize
      })
      console.log('[ res ] >', res)
      const { list, totalCount } = res.data
      this.storyList = list
      this.storyTotalCount = totalCount
      this.isLoading = false
    },
    async createNewStoryAction(storyInfo: any) {
      const res = await createNewStory(storyInfo)
      if (res.code == 200 || res.code == 0) {
        ElMessage.success(res.message)
      }
      // this.postStoryListAction()
    },
    async getStoryDetailAction(storyId: number) {
      this.isLoading = true
      const res = await getStoryDetail(storyId)
      // console.log('[ res ] >', res)
      this.storyDetail = res.data
      console.log('[ this.storyDetail ] >', this.storyDetail)
      this.isLoading = false
    }
  }
})

export default useStoryStore
