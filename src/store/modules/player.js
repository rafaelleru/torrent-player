const state = {
  url: 'http://localhost:9999/',
  torrentId: '',
  songIndex: ''
}

const mutations = {
  updateTorrentId (state, torrentId) {
    state.torrentId = torrentId
  },

  updateSongIndex (state, index) {
    state.songIndex = index
  }
}

const getters = {
  src (state) {
    console.log(state.songIndex)
    return state.url + state.songIndex
  }
}

export default {
  state,
  mutations,
  getters
}
