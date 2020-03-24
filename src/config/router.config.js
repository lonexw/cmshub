// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '@/layouts'
import { bxAnaalyse } from '@/core/icons'

export const asyncRouterMap = [

  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/user/students',
    children: [
      // dashboard
      {
        path: 'user',
        name: 'User',
        redirect: '/user/students',
        component: RouteView,
        meta: { title: '用户管理', keepAlive: true, icon: bxAnaalyse },
        children: [
          {
            path: '/user/students',
            name: 'Students',
            component: () => import('@/views/user/Students'),
            meta: { title: '学生管理', keepAlive: false }
          }

        ]
      }
    ]
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      }
    ]
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }

]
