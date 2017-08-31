// import store from '../store'
const {ipcMain} = require('electron')
const WebTorrent = require('webtorrent')
const client = new WebTorrent()
// const mp3Duration = require('mp3-duration')
// const async = require('async')
var server = null
var torrentId = null

ipcMain.on('addMagnet', (event, arg) => {
  client.add(arg, function (torrent) {
    var files = []
    torrent.files.forEach(function (file) {
      files.push({
        title: file.name,
        torrent: torrent.infoHash,
        index: torrent.files.indexOf(file),
        duration: '--:--',
        playing: 'false'
      })
    })
    event.sender.send('updateSongs', files)
  })
})

ipcMain.on('requestPlay', (event, args) => {
  if (server === null) {
    server = client.get(args[0]).createServer()
    server.listen(9999)
    torrentId = args[0]
    event.sender.send('canPlay', [args[1], args[2]])
  } else if (torrentId !== args[1]) {
    server.close()
    server = client.get(args[0]).createServer()
    server.listen(9999)
    event.sender.send('canPlay', [args[1], args[2]])
  } else {
    event.sender.send('canPlay', [args[1], args[2]])
  }
})
