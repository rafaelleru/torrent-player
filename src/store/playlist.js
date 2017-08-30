export const state = {
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

export const getters = {
  songs (state) {
    return state.songs
  }
}

export const mutations = {
  addSong (state, newSong) {
    state.songs.push(newSong)
  }
}

export const actions = {
  addSongs ({ commit }, songs) {
    songs.forEach(function (s) {
      commit('addSong', s)
    })
  }
}
