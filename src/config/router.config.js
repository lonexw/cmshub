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
            meta: { title: '模型管理' }
          },
          {
            path: '/content',
            name: 'Content',
            component: () => import('@/views/content/Index'),
            meta: { title: '内容管理' }
          },
          {
            path: '/asset',
            name: 'Asset',
            component: () => import('@/views/asset/Index'),
            meta: { title: '资源管理' }
          },
          {
            path: '/setting',
            name: 'Setting',
            component: () => import('@/views/setting/Index'),
            meta: { title: '设置' }
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
