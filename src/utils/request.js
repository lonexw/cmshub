import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import { VueAxios } from './axios'
import { ACCESS_TOKEN } from '@/store/mutation-types'

// 创建 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL, // api base_url
  timeout: 120000 // 请求超时时间
})

const err = (error) => {
  if (error.response) {
    const token = Vue.ls.get(ACCESS_TOKEN)
    if (error.response.status === 401) {
      if (token) {
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        })
      } else {
        window.location.reload()
      }
    }
  }
  return Promise.reject(error)
}

// request interceptor
service.interceptors.request.use(config => {
  const token = Vue.ls.get(ACCESS_TOKEN)
  if (token) {
    config.headers['Authorization'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
  }
  return config
}, err)

// response interceptor
service.interceptors.response.use((response) => {
  if (response.data.errors) {
    if (response.data.errors[0].extensions && [400, 401].indexOf(response.data.errors[0].extensions.error_code) > -1) {
      if (response.data.errors[0].extensions.error_code === 401) {
        const token = Vue.ls.get(ACCESS_TOKEN)
        if (token) {
          store.dispatch('Logout').then(() => {
            setTimeout(() => {
              window.location.reload()
            }, 1500)
          })
        }
      }

      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject({ code: response.data.errors[0].extensions.error_code, message: response.data.errors[0].message })
    } else {
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject({ code: 30400, message: '网络错误，请重试!' })
    }
  }
  if (
    response.headers.authorization
  ) {
    Vue.ls.set(ACCESS_TOKEN, response.headers.authorization, 1 * 24 * 60 * 60 * 1000)
    store.commit('SET_TOKEN', response.headers.authorization)
  }

  return response.data
}, err)

const installer = {
  vm: {},
  install (Vue) {
    Vue.use(VueAxios, service)
  }
}

export {
  installer as VueAxios,
  service as axios
}
