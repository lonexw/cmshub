const common = {
  state: {
    currentProject: {},
    projectId: 0
  },

  mutations: {
    SET_CURRENT_PROJECT: (state, info) => {
      state.currentProject = info
      state.projectId = info.id
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
