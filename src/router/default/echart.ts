// import { $t } from "@/hooks/useI18n";

const echart = {
  path: '/echart',
  name: 'EchartRoot',
  component: () => import('@/components/basicLayout/Index.vue'),
  meta: {
    title: 'Echart组件展示'
  },
  children: [
    {
      path: '',
      name: 'Echart',
      component: () => import('@/views/demo/echart/Index.vue')
    }
  ]
}

export const menuOrderNo = 4
export default echart
