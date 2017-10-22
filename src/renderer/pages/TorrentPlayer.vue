<template>
  <div id="app">
    <!-- <landing-page></landing-page> -->
    <top-bar></top-bar>
    <playlist></playlist>
    <player></player>
  </div>
</template>

<script>
  import LandingPage from '../components/LandingPage'
  import SongList from '../components/SongList.vue'
  import Player from '../components/Player.vue'
  import topBar from '../components/Header.vue'

  export default {
    name: 'torrent-player',
    components: {
      LandingPage,
      'playlist': SongList,
      Player,
      topBar
    }
  }
</script>

<style>
  /* CSS */
</style>
