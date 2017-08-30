import store from '../store'
const {ipcMain} = require('electron')
const WebTorrent = require('webtorrent')
const client = new WebTorrent()
// const mp3Duration = require('mp3-duration')
// const async = require('async')

ipcMain.on('addMagnet', (event, arg) => {
  client.add(arg, function (torrent) {
    var files = []
    // async.each(torrent.files, function (f, callback) {
    //   mp3Duration('/tmp/webtorrent/' + torrent.infoHash + '/' + f.path, function (err, duration) {
    //     if (err) return console.log(err.message)
    //     files.push({
    //       title: f.name,
    //       torrent: torrent.infoHash,
    //       index: torrent.files.indexOf(f),
    //       duration: duration
    //     })
    //     callback()
    //   })
    // }, function (err) {
    //   console.log('last callback')
    //   if (err) console.log(err.message)
    //
    // })
    torrent.files.forEach(function (file) {
      files.push({
        title: file.name,
        torrent: torrent.infoHash,
        index: torrent.files.indexOf(file),
        duration: '--:--'
      })
    })
    store.('addSongs', files)
  })
})
