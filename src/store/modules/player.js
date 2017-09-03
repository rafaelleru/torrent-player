const state = {
  url: 'http://localhost:9999/',
  songIndex: '',
  title: '',
  torrent: ''
}

const mutations = {
  updateSongIndex (state, index) {
    state.songIndex = index
  },

  updateTitle (state, title) {
    state.title = title.replace('.mp3', '')
  },

  updateTorrentId (state, torrent) {
    state.torrent = torrent
  }
}

const getters = {
  src (state) {
    // console.log(state.songIndex)
    return state.url + state.songIndex
  },

  title (state) {
    return state.title
  },

  torrentId (state) {
    return state.torrent
  },

  songIndex (state) {
    return state.songIndex
  }
}

export default {
  state,
  mutations,
  getters
}
