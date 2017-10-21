const state = {
  songs: []
}

const getters = {
  songs (state) {
    return state.songs
  }
}

const mutations = {
  addSong (state, newSong) {
    state.songs.push(newSong)
  },
  updateSongList (state, s) {
    state.songs = [...s]
  }
}

const actions = {
  addSongs ({ commit }, songs) {
    songs.forEach(function (s) {
      commit('addSong', s)
    })
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
