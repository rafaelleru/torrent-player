<template>
<div v-on:click="requestPlay" class="wrapper searchResult">
  <div id="title" class="Title">
    <i>{{ this.title }}</i>
  </div>
  <div id="torrent" class="Torrent">
    <i>{{ this.torrent }}</i>
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
