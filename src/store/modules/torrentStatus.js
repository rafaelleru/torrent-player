const state = {
  torrents: [
    {
      title: 'prueba',
      hash: 'long-number',
      progress: 45
    },
    {
      title: 'prueba 2',
      hash: 'ñjkashdñgkasdgf',
      progress: 80
    }
  ]
}

const getters = {
  torrentStatus (state) {
    return state.torrents
  }
}

const mutations = {
  updateStatus (state, status) {
    state.torrents = status
  }
}

export default {
  state,
  getters,
  mutations
}
