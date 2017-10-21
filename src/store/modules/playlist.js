const state = {
  songs: [],
  playingSong: ''
}

const getters = {
  songs (state) {
    return state.songs
  },
  nextSong (state) {
    var index = state.songs.findIndex(i => i.title === state.playingSong.title) + 1
    return state.songs[index]
  },
  prevSong (state) {
    var index = state.songs.findIndex(i => i.title === state.playingSong.title) - 1
    return state.songs[index]
  },
  playingSongIndex (state) {
    return state.songs.indexOf(state.playingSong)
  },
  nextSongIndex (state) {
    return state.songs.indexOf(state.playingSong) + 1
  },
  prevSongIndex (state) {
    return state.songs.indexOf(state.playingSong) - 1
  }
}

const mutations = {
  addSong (state, newSong) {
    state.songs.push(newSong)
  },
  updateSongList (state, s) {
    state.songs = [...s]
  },
  updatePlayingSong (state, i) {
    state.playingSong = i
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
