const i18n = {
  path: '/i18n',
  name: 'I18nRoot',
  component: () => import('@/components/basicLayout/Index.vue'),
  meta: {
    title: 'i18n组件展示'
  },
  children: [
    {
      path: '',
      name: 'I18n',
      component: () => import('@/views/demo/i18n/Index.vue')
    }
  ]
}

export const menuOrderNo = 0
export default i18n
