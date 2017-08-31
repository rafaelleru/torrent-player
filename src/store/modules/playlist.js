const state = {
  songs: [
    {
      title: '01 - Cigarrito',
      torrent: 'sadlkjfañlksjfdñlksajdfñlkajsdf',
      index: 1,
      duration: '3:15'
    },
    {
      title: '02 - Tras la barra',
      torrent: 'sadlkjfañlksjfdñlksajdfñlkajsdf',
      index: 1,
      duration: '3:15'
    },
    {
      title: '03 - Alucinante',
      torrent: 'sadlkjfañlksjfdñlksajdfñlkajsdf',
      index: 1,
      duration: '3:15'
    },
    {
      title: '03 - Si la tocas otra vez',
      torrent: 'sadlkjfañlksjfdñlksajdfñlkajsdf',
      index: 1,
      duration: '3:15'
    },
    {
      title: '03 - Un abecedario sin letras',
      torrent: 'sadlkjfañlksjfdñlksajdfñlkajsdf',
      index: 1,
      duration: '3:15'
    }
  ]
}

const getters = {
  songs (state) {
    return state.songs
  }
}

const mutations = {
  addSong (state, newSong) {
    state.songs.push(newSong)
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
