const searchConfig = {
  pageName: 'category',
  formItems: [
    {
      type: 'input',
      prop: 'name',
      label: '商品名称',
      placeholder: '请输入查询的商品名称',
      initialValue: ''
    },
    {
      type: 'select',
      prop: 'enable',
      label: '状态',
      placeholder: '请选择状态',
      options: [
        {
          label: '已启用',
          value: '1'
        },
        {
          label: '已禁用',
          value: '0'
        }
      ]
    },
    {
      type: 'date-picker',
      prop: 'createAt',
      label: '创建时间'
    },
    {
      type: 'date-picker',
      prop: 'updateAt',
      label: '更新时间'
    }
  ]
}

export default searchConfig
