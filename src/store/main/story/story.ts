import { defineStore } from 'pinia'
import { postStoryList, createNewStory } from '@/service/main/story/story'

const useStoryStore = defineStore('story', {
  state: () => ({
    storyList: [],
    storyTotalCount: 0,

    storyOffset: 0,
    storySize: 100
  }),
  actions: {
    async postStoryListAction() {
      const storyListRes = await postStoryList({
        offset: this.storyOffset,
        size: this.storySize
      })
      console.log('[ storyListRes ] >', storyListRes)
      const { list, totalCount } = storyListRes.data
      this.storyList = list
      this.storyTotalCount = totalCount
    },
    async createNewStoryAction(storyInfo: any) {
      const newRes = await createNewStory(storyInfo)
      if (newRes.code === 200) {
        alert(newRes.data)
      }
      this.postStoryListAction()
    }
  }
})

export default useStoryStore
