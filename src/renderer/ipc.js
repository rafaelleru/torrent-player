import store from '../store'
const {ipcRenderer} = require('electron')

ipcRenderer.on('updateSongs', (event, args) => {
  store.dispatch('addSongs', args)
})

ipcRenderer.on('canPlay', (event, args) => {
  store.commit('updateTorrentId', args[0])
  store.commit('updateSongIndex', args[1])
  store.commit('updateTitle', args[2])
})
