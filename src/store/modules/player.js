const state = {
  url: 'http://localhost:9999/',
  songIndex: '',
  title: ''
}

const mutations = {
  updateSongIndex (state, index) {
    state.songIndex = index
  },

  updateTitle (state, title) {
    state.title = title
  }
}

const getters = {
  src (state) {
    // console.log(state.songIndex)
    return state.url + state.songIndex
  },

  title (state) {
    return state.title
  }
}

export default {
  state,
  mutations,
  getters
}
