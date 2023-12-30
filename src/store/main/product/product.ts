import { defineStore } from 'pinia'

const useProductStore = defineStore('product', {
  state: () => ({
    name: 'product'
  }),
  actions: {
    setName(name: string) {
      this.name = name
    }
  }
})

export default useProductStore
