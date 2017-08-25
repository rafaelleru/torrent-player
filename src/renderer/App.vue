<template>
  <div id="app">
    <!-- <landing-page></landing-page> -->
    <playlist></playlist>
    <player></player>
  </div>
</template>

<script>
  import LandingPage from '@/components/LandingPage'
  import SongList from '@/components/SongList.vue'
  import Player from '@/components/Player.vue'

  export default {
    name: 'torrent-player',
    components: {
      LandingPage,
      'playlist': SongList,
      Player
    }
  }
</script>

<style>
  /* CSS */
</style>
