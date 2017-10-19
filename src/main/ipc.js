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

ipcMain.on('requestPlay', (event, args) => {
  if (server === null) {
    server = client.get(args[0]).createServer()
    server.listen(9999)
    torrentId = args[0]
    event.sender.send('canPlay', args)
  } else if (torrentId !== args[0]) {
    server.close()
    server = client.get(args[0]).createServer()
    server.listen(9999)
    torrentId = args[0]
    event.sender.send('canPlay', args)
  } else {
    event.sender.send('canPlay', args)
  }

  currentFileOnPlay = {
    title: args[2],
    torrent: args[0],
    index: args[1]
  }
})

ipcMain.on('playEnded', (event, args) => {
  var title
  var newIndex = args[1] + 1
  console.log(filesToPlay[filesToPlay.indexOf(currentFileOnPlay) + 1])
  if (filesToPlay[filesToPlay.indexOf(currentFileOnPlay) + 1].torrent === args[0]) {
    title = filesToPlay[filesToPlay.indexOf(currentFileOnPlay) + 1].title
    currentFileOnPlay = {
      title: title,
      torrent: args[0],
      index: args[1]
    }
    event.sender.send('canPlay', [args[0], newIndex, title])
  } else {
    currentFileOnPlay = filesToPlay[filesToPlay.indexOf(currentFileOnPlay) + 1]
    torrentId = currentFileOnPlay.torrent
    server.close()
    server = client.get(torrentId).createServer()
    server.listen(9999)
    event.sender.send('canPlay', [torrentId, currentFileOnPlay.index, currentFileOnPlay.title])
  }
})

ipcMain.on('playPrevious', (event, args) => {
  var title
  var newIndex = args[1] - 1
  if (torrentId !== args[0]) {
    server.close()
    server = client.get(args[0]).createServer()
    server.listen(9999)
    title = client.get(args[0]).files[args[1]].name
    event.sender.send('canPlay', args.concat([title]))
  } else {
    title = client.get(args[0]).files[args[1] + 1].name
    console.log(args.concat([title]))
    event.sender.send('canPlay', [args[0], newIndex, title])
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

module.exports = client
