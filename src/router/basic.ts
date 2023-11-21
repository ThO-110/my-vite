const basicRoute = [
  {
    path: '/',
    name: 'Root',
    component: () => import('@/components/basicLayout/Index.vue'),
    redirect: '/',
    children: [
      {
        path: '',
        name: 'HelloWorld',
        component: () => import('@/components/HelloWorld.vue')
      }
    ]
  }
  // TODO:
  // {
  //   path: '/login',
  //   name: 'Login',
  //   component: () =>
  //     import(/* webpackChunkName: "login" */ '@/views/login/Index.vue')
  // }
]

export default basicRoute
