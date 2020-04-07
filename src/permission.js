import Vue from 'vue'
import router from './router'
import store from './store'

import NProgress from 'nprogress' // progress bar
import '@/components/nprogress.less' // progress bar custom style
// import notification from 'ant-design-vue/es/notification'
import { setDocumentTitle, domTitle } from '@/utils/domUtil'
import { ACCESS_TOKEN } from '@/store/mutation-types'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['Login'] // no redirect whitelist
const defaultRoutePath = '/'

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  to.meta && typeof to.meta.title !== 'undefined' && setDocumentTitle(`${to.meta.title} - ${domTitle}`)

  if (Vue.ls.get(ACCESS_TOKEN)) {
    /* has token */
    if (to.name === 'Login') {
      next({ path: defaultRoutePath })
      NProgress.done()
    } else {
      if (store.getters.addRouters.length === 0) {
        store
          .dispatch('GetInfo')
          // eslint-disable-next-line no-unused-vars
          .then(res => {
            // const permissions = res.permissions
            store.dispatch('GenerateRoutes', {}).then(() => {
              // 根据roles权限生成可访问的路由表
              // 动态添加可访问路由表
              // console.log('addRoutes', store.getters.addRouters)

              router.addRoutes(store.getters.addRouters)
              let redirect = decodeURIComponent(from.query.redirect || to.path)
              // console.log('redirect', redirect, store.getters.addRouters[0].children[0].path, to)

              if (to.path === redirect) {
                const tempTo = Object.assign({}, to)
                // if (redirect === '/') {
                //   tempTo.path = store.getters.addRouters[0].children[0].path
                // }

                // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
                next({ ...tempTo, replace: true })
              } else {
                // if (redirect === '/') {
                //   redirect = store.getters.addRouters[0].children[0].path
                // }

                // 跳转到目的路由
                next({ path: redirect })
              }
            })
          })
          // eslint-disable-next-line no-unused-vars
          .catch(err => {
            store.dispatch('Logout').then(() => {
              next({ path: '/auth/login', query: { redirect: to.fullPath } })
            })
          })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.includes(to.name)) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next({ path: '/auth/login', query: { redirect: to.fullPath } })

      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
