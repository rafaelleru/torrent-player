import store from '../store'
const {ipcRenderer} = require('electron')

ipcRenderer.on('updateSongs', (event, args) => {
  store.dispatch('addSongs', args)
})

ipcRenderer.on('canPlay', (event, args) => {
  store.commit('updateTorrentId', args.torrent)
  store.commit('updateSongIndex', args.index)
  store.commit('updateTitle', args.title)
  store.commit('updatePlayingSong', args)
})

ipcRenderer.on('newStatus', (event, args) => {
  store.commit('updateStatus', args)
})
