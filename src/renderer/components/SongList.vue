<template>
  <div id="playlist">
    <div
      is="song"
      v-for="song in songs"
      v-bind:title="song.title"
      v-bind:torrent="song.torrent"
      v-bind:index="song.index">
    </div>
  </div>
</template>

<script>
import Song from './SongList/Song'

export default {
  name: 'playlist',
  components: { Song },
  computed: {
    songs () {
      return this.$store.getters.songs
    }
  }
}
</script>

<style>
.play-button {
  display: table-cell;
  vertical-align: middle;
  cursor: pointer;
}

.play-button:hover{
  color: #607D8B;
}


.song-container {
  text-align: left;
  display:table-cell;
}

.song:nth-child(even) {
  background-color: #ECEFF1;
}

.song:nth-child(odd) {
  background-color: #CFD8DC;
}
</style>
