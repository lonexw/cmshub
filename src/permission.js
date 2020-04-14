import Vue from 'vue'
import router from './router'
import store from './store'

import NProgress from 'nprogress' // progress bar
import '@/components/nprogress.less' // progress bar custom style
// import notification from 'ant-design-vue/es/notification'
import { setDocumentTitle, domTitle } from '@/utils/domUtil'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { userMe } from '@/graphql/user.graphql'
import apolloProvider from '@/utils/apolloProvider'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['Login'] // no redirect whitelist
const defaultRoutePath = '/'
router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  to.meta && typeof to.meta.title !== 'undefined' && setDocumentTitle(`${to.meta.title} - ${domTitle}`)
  let token = Vue.ls.get(ACCESS_TOKEN)
  if (token) {
    /* has token */
    if (to.name === 'Login') {
      next({ path: defaultRoutePath })
      NProgress.done()
    } else {
      apolloProvider.defaultClient
        .query({
          query: userMe,
          variables: {},
          fetchPolicy: 'no-cache'
        })
        .then(() => {
          if (store.getters.addRouters.length === 0) {
            // const permissions = res.permissions
            store.dispatch('GenerateRoutes', {}).then(() => {
              // 根据roles权限生成可访问的路由表
              // 动态添加可访问路由表
              // console.log('addRoutes', store.getters.addRouters)
              router.addRoutes(store.getters.addRouters)
              let redirect = decodeURIComponent(from.query.redirect || to.path)
              if (to.path === redirect) {
                const tempTo = Object.assign({}, to)
                next({ ...tempTo, replace: true })
              } else {
                // 跳转到目的路由
                next({ path: redirect })
              }
            })
          } else {
            store.commit('SET_TOKEN', token)
            next()
          }
        })
        .catch(() => {
          store.dispatch('Logout').then(() => {
            next({ path: '/auth/login', query: { redirect: to.fullPath } })
          })
        })
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
