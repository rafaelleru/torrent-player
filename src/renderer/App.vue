<template>
  <div id="app">
    <top-bar></top-bar>
    <playlist></playlist>
    <player></player>
  </div>
</template>

<script>
import topBar from '@/components/Header.vue'
import SongList from '@/components/SongList.vue'
import Player from '@/components/Player.vue'

export default {
  name: 'torrent-player',
  components: {
    'playlist': SongList,
    Player,
    topBar
  }
}
</script>

<style>
  /* CSS */
</style>
