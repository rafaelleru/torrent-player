<template>
  <div id="app">
    <!-- <landing-page></landing-page> -->
    <top-bar></top-bar>
    <playlist></playlist>
    <player></player>
  </div>
</template>

<script>
  import dragDrop fom 'drag-drop'
  import SongList from '@/components/SongList.vue'
  import Player from '@/components/Player.vue'
  import topBar from '@/components/Header.vue'

 export default {
    name: 'torrent-player',
    components: {
      'playlist': SongList,
      Player,
      topBar
    },
    mounted(){
      dragDrop() //do stuff with dragged files
    }
  }
</script>

<style>
  /* CSS */
</style>
