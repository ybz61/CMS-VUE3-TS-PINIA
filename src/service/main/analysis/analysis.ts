import appRequest from '@/service'

// 商品数据统计的数量
export function getAmountListData() {
  return appRequest.get({
    url: '/goods/amount/list'
  })
}

// 每个分类商品的个数
export function getGoodsCategoryCount() {
  return appRequest.get({
    url: '/goods/category/count'
  })
}

// 每个分类商品的销量
export function getGoodsCategorySale() {
  return appRequest.get({
    url: '/goods/category/sale'
  })
}

// 每个分类商品的收藏
export function getGoodsCategoryFavor() {
  return appRequest.get({
    url: '/goods/category/favor'
  })
}

// 不同城市的销量数据
export function getGoodsAddressSale() {
  return appRequest.get({
    url: '/goods/address/sale'
  })
}

// 销量前10的商品数量
export function getGoodsSaleTop10() {
  return appRequest.get({
    url: '/goods/sale/top10'
  })
}
