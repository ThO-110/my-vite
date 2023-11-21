import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import basicRoute from './basic'

interface RouterFileModule {
  default: any
  menuOrderNo: number
}

const files = import.meta.glob('./default/*.ts', { eager: true }) as Record<
  string,
  RouterFileModule
>
console.log('🚀 ~ file: index.ts:12 ~ files:', files)

const defaultRoutes: RouteRecordRaw[] = []

Object.keys(files).forEach((key: string) => {
  defaultRoutes[files[key].menuOrderNo] = files[key].default
})

const router = createRouter({
  history: createWebHistory(),
  routes: [...basicRoute, ...defaultRoutes]
})

export default router
