<template>
  <div v-bind:class="{ active: play, song: play, song: notplay}">
    <div class="play-button" v-on:click="this.requestPlay">
      <i class="material-icons">play_circle_outline</i>
    </div>
    <div class="song-container">
      <a class="song-title primary-text-color"
        style="float: left;"
        v-on:click="this.requestPlay"> {{ title }}</a>
      <a style="display: inline-block; float: right"> {{ duration }} </a>
      <!-- Hash del torrent no necesario <p style="font-size: small" class="secondary-text-color"> {{ torrent }} </p>-->
    </div>
  </div>
</template>

<script>
  const {ipcRenderer} = require('electron')

  export default {
    name: 'song',
    props: ['title', 'torrent', 'index', 'duration', 'playing'],
    data: function () {
      return {
        play: false,
        notplay: true
      }
    },
    methods: {
      requestPlay: function () {
        this.play = true
        this.notplay = false
        ipcRenderer.send('requestPlay', this.$store.getters.songs.find(i => i.title === this.title))
      }
    }
  }
</script>

<style>
  .song-container {
    text-align: left;
    display:table-cell;
  }

  .song:nth-child(even) {
    /*background-color: #ECEFF1;*/
  }

  .song:nth-child(odd) {
    /*background-color: #CFD8DC;*/
  }

  .play-button {
    display: table-cell;
    vertical-align: middle;
    cursor: pointer;

  }

  .play-button:hover{
    color: #607D8B;
  }

  .song-title {
  cursor: pointer;
  color: white !important;
  display: inline-block;
  font-weight: bold;
}

  .song-title:hover {
    color: #607D8B;
  }

  .song {
    /*border-bottom: 1px solid #212121;
    background-color: whithe /*#616161*/
    height: 50px;
    padding: 15px 5%;
    color: white !important;
  }
  .song:hover{
    background-color: #FF9C0C;
  }
  .song:hover > .song-container a{
    color: white !important;
  }
  .active{
    background-color: #0AD58D;
    height: 50px;
    padding: 15px 5%;
  }
  .active > .song-container a{
    color: white !important;
  }
  .active > .play-button{
    color: #2196F3;
    padding-right: 20px;
  }

</style>
