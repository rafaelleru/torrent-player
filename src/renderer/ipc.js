import store from '../store'
const {ipcRenderer} = require('electron')

ipcRenderer.on('updateSongs', (event, args) => {
  store.dispatch('addSongs', args)
})

ipcRenderer.on('canPlay', (event, args) => {
  console.log('play file' + args)
  // store.commit('updateTorrentId', args[0])
  store.commit('updateSongIndex', args)
})
