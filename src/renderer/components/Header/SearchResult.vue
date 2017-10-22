<template>
<div v-on:click="requestPlay" class="searchResult">
  <div id="title" class="Title">
    <p>{{ this.title }}</p>
  </div>
  <div id="torrent" class="Torrent">
    <p>{{ this.torrent }}</p>
  </div>
</div>
</template>

<script>
  const {ipcRenderer} = require('electron')
  export default {
    name: 'search-result',
    props: ['title', 'torrent'],
    methods: {
      requestPlay: function () {
        ipcRenderer.send('requestPlay', this.$store.getters.songs.find(i => i.title === this.title))
      }
    }
  }
</script>

<style>
.searchResult {
  margin-left: 5%;
  margin-right: 5%;
  margin-top: 2%;
  border-color: black;
  cursor: pointer;
  border-bottom-style: solid;
  border-bottom-width: 1px;
}

.Title {
  font-size: small;
}

.Torrent {
  font-size: x-small;
}
</style>
