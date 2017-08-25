<template>
  <header id="header" class="header dark-primary-color">
  <nav class="inner" style="vertical-align: middle">
     <a style="display: inline-block; font-size: x-large; float: left">Torrent Player</a>
     <a style="display: inline-block; vertical-align: middle;">
       <input id="magnet-input"
         v-model="magnet"
         v-on:keyup.enter="addMagnet"
         placeholder="Insert a magnet link, hash or path to .torrent"
         style="vertical-align: middle"
         >
     </a>
     <input type="file" name="file" id="file" class="inputfile utility-button" />
     <label for="file" class="utility-button">
       <i class="material-icons">folder_open</i>
     </label>
     <a class="utility-button"> -->
       <i class="material-icons">file_download</i>
     </a>
     <a class="utility-button">
       <i class="material-icons">settings</i>
     </a>
     <a class="utility-button">
       <i class="material-icons">search</i>
     </a>
   </nav>
  </header>
</template>

<script>
  export default {
    name: 'my-header'
  }
</script>

<style>
  .inner {
    max-width: 800px;
    box-sizing: border-box;
    margin: 0 auto;
    padding: 10px 5px;
    color: white;
  }

  .header {
    /*background-color: #536DFE;*/
    position: fixed;
    z-index: 999;
    height: 55px;
    top: 0;
    left: 0;
    right: 0;
    text-align: center;
  }

  .inputfile {
  	width: 0.1px;
  	height: 0.1px;
  	opacity: 0;
  	overflow: hidden;
  	position: absolute;
  	z-index: -1;
  }

  .inputfile + label {
      font-size: 1.25em;
      font-weight: 700;
      color: white;
      background-color: transparent;
      display: inline-block;
      cursor: pointer;
  }

  .inputfile:focus + label,
  .inputfile + label:hover {
      background-color: transparent;
      color: #616161;
  }

  .utility-button {
    float: right;
    vertical-align: middle;
    background-color: transparent;
    color: white;
    cursor: pointer;
  }

  .utility-button:focus + a,
  .utility-button:hover {
      background-color: transparent;
      color: #616161;
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

  .content {
    margin-top: 60px;
    margin-bottom: 60px;
  }

  .download-status{
    background-color: transparent;
    color: white;
    cursor: pointer;
    float: right;
  }

  .download-status:focus + a,
  .download-status:hover {
      background-color: transparent;
      color: #616161;
  }
</style>
