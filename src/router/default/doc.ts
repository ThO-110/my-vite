const doc = {
  path: '/doc',
  name: 'DocRoot',
  component: () => import('@/components/basicLayout/Index.vue'),
  meta: {
    title: 'markdown组件展示'
  },
  children: [
    {
      path: '/doc/:name',
      name: 'Doc',
      component: () => import('@/views/demo/doc/Index.vue')
    }
  ]
}

export const menuOrderNo = 5
export default doc
