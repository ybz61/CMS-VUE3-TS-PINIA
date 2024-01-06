const contentConfig = {
  pageName: 'goods',
  header: {
    title: '商品列表',
    btnTitle: '新建商品'
  },
  propsList: [
    // { type: 'index', label: '序号', width: '80px' },
    {
      label: '商品名称',
      prop: 'name',
      width: '150px',
      type: '',
      slotName: 'name',
      showOverflowTooltip: true
    },

    { label: '折扣价', prop: 'newPrice', width: '100px', type: 'custom', slotName: 'newPrice' },
    { label: '原价', prop: 'oldPrice', width: '100px', type: 'custom', slotName: 'oldPrice' },
    {
      label: '商品描述',
      prop: 'desc',
      width: '150px',
      type: '',
      slotName: 'desc',
      showOverflowTooltip: true
    },
    { label: '状态', prop: 'status', width: '80px', type: 'custom', slotName: 'status' },
    { label: '图片', prop: 'imgUrl', width: '150px', type: 'custom', slotName: 'imgUrl' },

    { label: '库存', prop: 'inventoryCount', width: '80px' },
    { label: '销量', prop: 'saleCount', width: '80px' },
    { label: '收藏量', prop: 'favorCount', width: '80px' },
    { label: '产地', prop: 'address', width: '80px' },

    { type: 'timer', label: '创建时间', prop: 'createAt' },
    { type: 'timer', label: '更新时间', prop: 'updateAt' },
    { type: 'handler', label: '操作', width: '150px' }
  ]
}

export default contentConfig
