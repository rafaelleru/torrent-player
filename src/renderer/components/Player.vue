<template>
  <footer id="player" class="player">
    <progress min="0" max="1" value="0" ref="progress"></progress>
    <div class="div-player">
      <div class="izquierda">
        <a class="primary-text-color"><p class="song-title-tag">{{ title }}</p></a>
      </div>
      <div class="centro">
        <i class="material-icons player-button play-button" v-on:click="requestPrevious">skip_previous</i>
        <i class="material-icons player-button play-button" v-on:click="togglePause">{{ playStatus }}</i>
        <i class="material-icons player-button play-button" v-on:click="requestNext">skip_next</i>
      </div>
      <div class="derecha">
        <i class="material-icons player-button play-button" id="volumen-icon" v-on:click="toggleVolume">{{ volumeStatus }}</i>
        <input type="range" id="volumen-slider" min="0" max="1" value="1" step="0.01" ref="slideVolume" v-on:change="updateVolume">
      </div>
      <!--<audio ref="audioTag" :src="source" autoplay="true" preload="none" @timeupdate="onTimeUpdateListener"
        v-on:ended="requestNext"></audio>-->
    </div>
    <audio ref="audioTag" :src="source" autoplay preload="none"
      @timeupdate="onTimeUpdateListener" v-on:ended="requestNext"></audio>
    <!-- <progress min="0" max="1" value="0" ref="progress"></progress> -->
  </footer>
</template>

<script>
  const {ipcRenderer} = require('electron')

  export default {
    name: 'player',
    data: function () {
      return {
        playing: false,
        playStatus: 'play_circle_outline',
        mute: false,
        volumeStatus: 'volume_up'
        // source: 'http://nadikun.com/audio/suit-and-tie-oscar-wylde-remix.mp3'
      }
    },
    methods: {
      togglePause: function () {
        var audio = this.$refs.audioTag
        if (!this.playing) {
          audio.play()
          this.playStatus = 'pause_circle_outline'
          this.playing = !this.playing
        } else {
          audio.pause()
          this.playing = !this.playing
          this.playStatus = 'play_circle_outline'
        }
      },
      toggleVolume: function () {
        if (this.mute) {
          this.mute = false
          this.volumeStatus = 'volume_up'
          this.$refs.audioTag.muted = false
        } else {
          this.mute = true
          this.volumeStatus = 'volume_off'
          this.$refs.audioTag.muted = true
        }
      },
      onTimeUpdateListener: function () {
        var progressbar = this.$refs.progress
        var audio = this.$refs.audioTag
        var currentProgress = (audio.currentTime / audio.duration)
        progressbar.value = currentProgress
      },
      requestPrevious: function () {
        ipcRenderer.send('playPrevious', [this.$store.getters.torrentId,
          this.$store.getters.songIndex])
      },
      requestNext: function () {
        ipcRenderer.send('playEnded', [this.$store.getters.torrentId,
          this.$store.getters.songIndex])
      },
      updateVolume: function () {
        var volumeSlide = this.$refs.slideVolume
        var audio = this.$refs.audioTag
        audio.volume = volumeSlide.value
      }
    },
    computed: {
      source () {
        return this.$store.getters.src
      },
      title () {
        return this.$store.getters.title
      }
    },
    watch: {
      source (val) {
        console.log('new source: ' + this.source)
        if (!this.playing) {
          this.playing = true
          this.playStatus = 'pause_circle_outline'
        }
      }
    }
  }
</script>

<style>
.player {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80px;
  width: 100%;
  background-color: #607D8B;
  clear: both;
}

.div-player{
  /*display: inline;*/
  margin: 0 1%;
}
.div-player .izquierda{
  float: left;
  width: 50%;
  margin-top: 5px;
}
.div-player .derecha{
  float: right;
  text-align: right;
  width: 10%;
}
.div-player .centro{
  float: left;
  width: 40%;
}

.player progress{
  width:100%;

}
.div-player .player-button{
  color: white;
}
.div-player .player-button:nth-child(even){
  font-size: 50px;
}
.player-button{
  color:#212121;
}

.player-button+:hover{
  color: #2196F3
}

.div-player .primary-text-color{ color: white; }
.song-title-tag{
  margin: 0 0;
  font-size: small;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 15px;
}

#volumen-icon{
  display: inline;
}
#volumen-slider{
  display: inline;
  width: 70%;
  vertical-align: middle;
}

</style>
