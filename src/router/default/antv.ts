// import { $t } from "@/hooks/useI18n";

const antv = {
  path: '/antv',
  name: 'AntvRoot',
  component: () => import('@/components/basicLayout/Index.vue'),
  meta: {
    title: 'Antv组件展示'
  },
  children: [
    {
      path: '',
      name: 'Antv',
      component: () => import('@/views/demo/antv/Index.vue')
    }
  ]
}

export const menuOrderNo = 3
export default antv
