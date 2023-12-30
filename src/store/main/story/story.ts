import { defineStore } from 'pinia'

const useStoryStore = defineStore('story', {
  state: () => ({
    name: 'story'
  }),
  actions: {
    setName(name: string) {
      this.name = name
    }
  }
})

export default useStoryStore
