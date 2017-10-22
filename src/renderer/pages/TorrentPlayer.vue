<template>
  <div id="app">
    <top-bar></top-bar>
    <drag-dialog></drag-dialog>
    <playlist></playlist>
    <player></player>
  </div>
</template>

<script>
import topBar from '../components/Header.vue'
import SongList from '../components/SongList.vue'
import Player from '../components/Player.vue'
import DragDialog from '../components/DragDialog.vue'

export default {
  name: 'torrent-player',
  components: {
    'playlist': SongList,
    Player,
    topBar,
    DragDialog
  }
}
</script>

<style>
  /* CSS */
</style>
