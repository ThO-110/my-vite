// import { $t } from "@/hooks/useI18n";

const antd = {
  path: '/antd',
  name: 'AntdRoot',
  component: () => import('@/components/basicLayout/Index.vue'),
  meta: {
    title: 'Antd组件展示'
  },
  children: [
    {
      path: '',
      name: 'Antd',
      component: () => import('@/views/demo/antd/Index.vue')
    }
  ]
}

export const menuOrderNo = 1
export default antd
