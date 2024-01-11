import { defineStore } from 'pinia'
import {
  getAmountListData,
  getGoodsAddressSale,
  getGoodsCategoryCount,
  getGoodsCategoryFavor,
  getGoodsCategorySale
} from '@/service/main/analysis/analysis'

interface IAnalysisState {
  amountList: any[]
  goodsCategoryCount: any[]
  goodsCategorySale: any[]
  goodsCategoryFavor: any[]
  goodsAddressSale: any[]
  isLoading: boolean
}

const useAnalysisStore = defineStore('analysis', {
  state: (): IAnalysisState => ({
    amountList: [], // 商品数据统计的数量
    goodsCategoryCount: [], // 每个分类商品的个数
    goodsCategorySale: [], // 每个分类商品的销量
    goodsCategoryFavor: [], // 每个分类商品的收藏
    goodsAddressSale: [], // 不同城市的销量数据
    isLoading: false
  }),
  actions: {
    async fetchAnalysisDataAction() {
      await getAmountListData().then((res) => {
        this.isLoading = true
        this.amountList = res.data
      })
      await getGoodsCategoryCount().then((res) => {
        this.goodsCategoryCount = res.data
      })
      await getGoodsCategorySale().then((res) => {
        this.goodsCategorySale = res.data
      })
      await getGoodsCategoryFavor().then((res) => {
        this.goodsCategoryFavor = res.data
      })
      await getGoodsAddressSale().then((res) => {
        this.goodsAddressSale = res.data
        this.isLoading = false
      })
    }
  }
})

export default useAnalysisStore
