import { UserLayout, BasicLayout, BlankLayout } from '@/layouts'
// import { bxAnaalyse } from '@/core/icons'

export const asyncRouterMap = [
  {
    path: '/',
    name: 'Index',
    meta: { title: '首页' },
    redirect: '/project',
    component: BlankLayout,
    children: [
      {
        path: 'project',
        name: 'Project',
        component: () => import('@/views/project/Index'),
        meta: { title: '项目管理' }
      },
      {
        path: '.',
        component: BasicLayout,
        redirect: '/schema',
        children: [
          {
            path: '/schema',
            name: 'Schema',
            component: () => import('@/views/schema/Index'),
            meta: { title: 'Schema 管理' }
          }
        ]
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/auth',
    component: UserLayout,
    redirect: '/auth/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/auth/Login')
      }
    ]
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }
]
