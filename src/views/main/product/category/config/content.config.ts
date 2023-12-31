const contentConfig = {
  pageName: 'category',
  header: {
    title: '商品列表',
    btnTitle: '新建商品'
  },
  propsList: [
    { type: 'index', label: '序号', width: '80px' },
    { label: '商品名称', prop: 'name', width: '150px' },
    { label: '状态', prop: 'enable', width: '100px', type: 'custom', slotName: 'enable' },
    { type: 'timer', label: '创建时间', prop: 'createAt' },
    { type: 'timer', label: '更新时间', prop: 'updateAt' },
    { type: 'handler', label: '操作', width: '150px' }
  ]
}

export default contentConfig
