// import store from '../store'
const {ipcMain} = require('electron')
const WebTorrent = require('webtorrent')
const client = new WebTorrent()
// const mp3Duration = require('mp3-duration')
// const async = require('async')
var server = null
var torrentId = null
var filesToPlay = []
var currentFileOnPlay = null

ipcMain.on('addMagnet', (event, arg) => {
  // TODO: Code duplicated.
  client.add(arg, function (torrent) {
    var files = []
    torrent.files.forEach(function (file) {
      if (file.name.indexOf('.mp3') !== -1 || file.name.indexOf('.ogg') !== -1 ||
          file.name.indexOf('.flac') !== -1) {
        files.push({
          title: file.name.replace('.mp3', ''),
          torrent: torrent.infoHash,
          index: torrent.files.indexOf(file),
          duration: '--:--',
          playing: 'false'
        })
        filesToPlay.push({
          title: file.name.replace('.mp3', ''),
          torrent: torrent.infoHash,
          index: torrent.files.indexOf(file)
        })
      }
    })

    event.sender.send('updateSongs', files)
  })
})

ipcMain.on('requestPlay', (event, song) => {
  console.log(song)
  if (server === null) {
    server = client.get(song.torrent).createServer()
    server.listen(9999)
    torrentId = song.torrent
    event.sender.send('canPlay', song)
  } else if (torrentId !== song.torrent) {
    server.close()
    server = client.get(song.torrent).createServer()
    server.listen(9999)
    torrentId = song.torrent
    event.sender.send('canPlay', song)
  } else {
    event.sender.send('canPlay', song)
  }
})

ipcMain.on('updateTorrentStatus', (event, args) => {
  var status = []
  client.torrents.forEach(function (torrent) {
    status.push({
      title: torrent.name,
      hash: torrent.infoHash,
      progress: Math.floor(torrent.progress * 100)
    })
  })

  event.sender.send('newStatus', status)
})

ipcMain.on('dragedTorrent', (event, args) => {
  args.forEach(function (file) {
    client.add(file, function (torrent) {
      var files = []
      torrent.files.forEach(function (file) {
        if (file.name.indexOf('.mp3') !== -1 || file.name.indexOf('.ogg') !== -1 ||
            file.name.indexOf('.flac') !== -1) {
          files.push({
            title: file.name.replace('.mp3', ''),
            torrent: torrent.infoHash,
            index: torrent.files.indexOf(file),
            duration: '--:--',
            playing: 'false'
          })
          filesToPlay.push({
            title: file.name.replace('.mp3', ''),
            torrent: torrent.infoHash,
            index: torrent.files.indexOf(file)
          })
        }
      })

      event.sender.send('updateSongs', files)
    })
  })
})
module.exports = client
