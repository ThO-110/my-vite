const pureText = {
  path: '/pureText',
  name: 'PureRoot',
  component: () => import('@/components/basicLayout/Index.vue'),
  meta: {
    title: '纯文本国际化'
  },
  children: [
    {
      path: '',
      name: 'PureText',
      component: () => import('@/views/demo/pureText/Index.tsx')
    }
  ]
}

export const menuOrderNo = 2
export default pureText
