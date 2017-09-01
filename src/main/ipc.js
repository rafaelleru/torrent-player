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
      if (file.name.indexOf('.mp3') !== -1 || file.name.indexOf('.ogg') !== -1) {
        files.push({
          title: file.name,
          torrent: torrent.infoHash,
          index: torrent.files.indexOf(file),
          duration: '--:--',
          playing: 'false'
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
    event.sender.send('canPlay', args)
  } else {
    event.sender.send('canPlay', args)
  }
})

ipcMain.on('playEnded', (event, args) => {
  console.log('end' + args)
  var title
  if (torrentId !== args[0]) {
    server.close()
    server = client.get(args[0]).createServer()
    server.listen(9999)
    title = client.get(args[0]).files[args[1]].name
    event.sender.send('canPlay', args.concat([title]))
  } else {
    title = client.get(args[0]).files[args[1]].name
    console.log(args.concat([title]))
    event.sender.send('canPlay', args.concat([title]))
  }
})
