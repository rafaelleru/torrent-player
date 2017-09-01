<template>
  <div v-bind:class="{ 'light-primary-color': play, song: notplay}">
    <div class="play-button" v-on:click="this.requestPlay">
      <i class="material-icons">play_circle_outline</i>
    </div>
    <div class="song-container">
      <a class="song-title primary-text-color"
        style="float: left;"
        v-on:click="this.requestPlay"> {{ title }}</a>
      <a style="display: inline-block; float: right"> {{ duration }} </a>
      <p style="font-size: small" class="secondary-text-color"> {{ torrent }} </p>
    </div>
  </div>
</template>

<script>
  const {ipcRenderer} = require('electron')

  export default {
    name: 'song',
    props: ['title', 'torrent', 'index', 'duration'],
    data: function () {
      return {
        play: false,
        notplay: true
      }
    },
    methods: {
      requestPlay: function () {
        ipcRenderer.send('requestPlay', [this.torrent, this.index, this.title])
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
    background-color: #ECEFF1;
  }

  .song:nth-child(odd) {
    background-color: #CFD8DC;
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
  curso    </div>r: pointer;
  color: primary-text-color;
  display: inline-block;
}

  .song-title:hover {
    color: #607D8B;
  }

  .song {
    /*border-bottom: 1px solid #212121;
    background-color: whithe /*#616161*/
  }
</style>
