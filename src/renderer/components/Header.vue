<template>
  <header id="header" class="header dark-primary-color">
  <link rel="stylesheet" href="../../node_modules/vue-material/dist/vue-material.css">
  <nav class="inner" style="vertical-align: middle">
     <a style="display: inline-block; font-size: x-large; float: left" class="title">Torrent Player</a>
     <a style="display: inline-block; vertical-align: middle;">
       <input id="magnet-input"
         v-model="magnet"
         v-on:keyup.enter="addMagnet"
         v-on:keydown="handleKeyDown"
         placeholder="Insert a magnet link, hash or path to .torrent"
         style="vertical-align: middle"
         >
     </a>
     <input type="file" name="file" id="file" class="inputfile utility-button"/>
     <label for="file" class="utility-button">
       <i class="material-icons">folder_open</i>
     </label>
    <md-menu class="utility-button" md-direction="bottom left" md-size="7">
       <md-button md-menu-trigger class="md-icon-button"
          v-on:click="updateTorrentStatus">
         <i class="material-icons">file_download</i>
       </md-button>
       <md-menu-content>
         <md-menu-item
          is="torrent-progress"
          v-for="t in torrentStatus"
          v-bind:title="t.title"
          v-bind:hash="t.hash"
          v-bind:progress="t.progress">
         </md-menu-item>
       </md-menu-content>
     </md-menu>
     <a class="utility-button">
       <i class="material-icons">settings</i>
     </a>
     <md-menu class="utility-button" md-direction="top left" md-size="5">
       <i class="material-icons" md-menu-trigger>search</i>
       <md-menu-content>
         <div class="searchInput">
         <md-input-container md-inline md-clearable>
           <label>search</label>
           <md-input v-model="searchQuery"></md-input>
         </md-input-container>
       </div>
         <md-menu-item
          is="search-result"
          v-for="r in results"
          v-bind:title="r.title"
          v-bind:torrent="r.torrent">
        </md-menu-item>
       </md-menu-content>
     </md-menu>
   </nav>
  </header>
</template>

<script>
  import torrentProgress from './Header/TorrentProgress'
  import searchResult from './Header/SearchResult'
  const {ipcRenderer} = require('electron')

  export default {
    name: 'top-bar',
    data: function () {
      return {
        magnet: '',
        searchQuery: ''
      }
    },
    components: { torrentProgress, searchResult },
    methods: {
      addMagnet: function () {
        try {
          ipcRenderer.send('addMagnet', this.magnet)
          this.magnet = ''
        } catch (e) {
          console.log(e)
        }
      },
      updateTorrentStatus: function () {
        ipcRenderer.send('updateTorrentStatus')
      },
      handleKeyDown: function (e) {
        e.stopPropagation()
      }
    },
    computed: {
      torrentStatus () {
        return this.$store.getters.torrentStatus
      },
      results () {
        if (this.searchQuery === '') {
          return []
        } else {
          return this.$store.getters.songs.filter(song => song.title.toLowerCase().indexOf(this.searchQuery.toLowerCase()) !== -1)
        }
      }
    }
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
  	/*width: 0.1px;
  	height: 0.1px;
  	opacity: 0;*/
    display: none;
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
    color: white !important;
    cursor: pointer;
  }


  .utility-button:focus + a,
  .utility-button:hover {
      background-color: transparent;
      color: #616161;
  }

  .title {
    color: white !important;
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

  .dark-primary-color    { background: #1976D2; }
  .default-primary-color { background: #2196F3; }
  .light-primary-color   { background: #BBDEFB; }
  .text-primary-color    { color: #FFFFFF; }
  .accent-color          { background: #607D8B; }
  .primary-text-color    { color: #212121 !important; }
  .secondary-text-color  { color: #757575; }
  .divider-color         { border-color: #BDBDBD; }
  .par                   { background-color: #CFD8DC; }
  .impar                 { background-color: #ECEFF1 }

.md-menu{
  margin-top: -6px;
}

.searchInput{
  margin-left: 5%;
  margin-right: 5%;
  border-radius: 10px;
}
</style>
