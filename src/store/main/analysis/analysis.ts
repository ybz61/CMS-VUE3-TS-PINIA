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
}

const useAnalysisStore = defineStore('analysis', {
  state: (): IAnalysisState => ({
    amountList: [], // 商品数据统计的数量
    goodsCategoryCount: [], // 每个分类商品的个数
    goodsCategorySale: [], // 每个分类商品的销量
    goodsCategoryFavor: [], // 每个分类商品的收藏
    goodsAddressSale: [] // 不同城市的销量数据
  }),
  actions: {
    fetchAnalysisDataAction() {
      getAmountListData().then((res) => {
        this.amountList = res.data
      })
      getGoodsCategoryCount().then((res) => {
        this.goodsCategoryCount = res.data.slice(0, 7)
        // this.goodsCategoryCount = res.data
      })
      getGoodsCategorySale().then((res) => {
        this.goodsCategorySale = res.data.slice(0, 7)
        // this.goodsCategorySale = res.data
      })
      getGoodsCategoryFavor().then((res) => {
        this.goodsCategoryFavor = res.data.slice(0, 7)
        // this.goodsCategoryFavor = res.data
      })
      getGoodsAddressSale().then((res) => {
        this.goodsAddressSale = res.data
      })
    }
  }
})

export default useAnalysisStore
