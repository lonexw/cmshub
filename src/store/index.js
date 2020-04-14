import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import common from './modules/common'
import permission from './modules/permission'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    permission,
    common
  },
  getters
})
