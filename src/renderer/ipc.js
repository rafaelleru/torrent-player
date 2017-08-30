import store from '../store'
const {ipcRenderer} = require('electron')

ipcRenderer.on('updateSongs', (event, args) => {
  store.dispatch('addSongs', args)
})
