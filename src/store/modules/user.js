import Vue from 'vue'
import { ACCESS_TOKEN } from '@/store/mutation-types'

const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },

  actions: {
    // 登录
    // eslint-disable-next-line no-unused-vars
    Login({ commit }, userInfo) {
      // eslint-disable-next-line no-unused-vars
      return new Promise((resolve, reject) => {
        let token = userInfo.userLogin.access_token
        Vue.ls.set(ACCESS_TOKEN, token, 7 * 24 * 60 * 60 * 1000)
        commit('SET_TOKEN', token)
        resolve()

        // login(userInfo).then(response => {
        //   const result = response.result
        //   Vue.ls.set(ACCESS_TOKEN, result.token, 7 * 24 * 60 * 60 * 1000)
        //   commit('SET_TOKEN', result.token)
        //   resolve()
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },

    SetInfo({ commit }, userInfo) {
      return new Promise(resolve => {
        commit('SET_NAME', userInfo.userMe.email)
        commit('SET_INFO', userInfo.userMe)
        resolve()
      })
    },

    // 登出
    // eslint-disable-next-line no-unused-vars
    Logout({ commit, state }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        Vue.ls.remove(ACCESS_TOKEN)
        resolve()
      })
    }
  }
}

export default user
