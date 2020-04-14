import Vue from 'vue'
import { CURRENT_PROJECT } from '@/store/mutation-types'

const common = {
  state: {
    currentProject: {},
    projectId: 0
  },

  mutations: {
    SET_CURRENT_PROJECT: (state, info) => {
      state.currentProject = info
      state.projectId = info ? info.id : 0
      Vue.ls.set(CURRENT_PROJECT, info, 7 * 24 * 60 * 60 * 1000)
    }
  },

  actions: {
    SetCurrentProject({ commit }, info) {
      return new Promise(resolve => {
        commit('SET_CURRENT_PROJECT', info)
        resolve()
      })
    }
  }
}

export default common
