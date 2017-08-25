<template>
  <div v-bind:class="{ 'light-primary-color': play, song: notplay}">
    <!-- TODO: move this to index.html -->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <div class="play-button">
      <i class="material-icons">play_circle_outline</i>
    </div>
    <div class="song-container">
      <a class="song-title primary-text-color"
        style="float: left;"> {{ title }}</a>
      <a style="display: inline-block; float: right"> {{ duration }} </a>
      <p style="font-size: small" class="secondary-text-color"> {{ torrent }} </p>
    </div>
  </div>
</template>

<script>
  // const {ipcRenderer} = require('electron')
  export default {
    name: 'song',
    props: ['title', 'torrent', 'index', 'duration'],
    data: function () {
      return {
        play: false,
        notplay: true
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
  cursor: pointer;
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

  .dark-primary-color    { background: #1976D2; }
  .default-primary-color { background: #2196F3; }
  .light-primary-color   { background: #BBDEFB; }
  .text-primary-color    { color: #FFFFFF; }
  .accent-color          { background: #607D8B; }
  .primary-text-color    { color: #212121; }
  .secondary-text-color  { color: #757575; }
  .divider-color         { border-color: #BDBDBD; }
  .par                   { background-color: #CFD8DC; }
  .impar                 { background-color: #ECEFF1 }

</style>
