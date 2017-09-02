<template>
  <footer id="player" class="player">
    <progress min="0" max="1" value="0" ref="progress"></progress>
    <div class="div-player">
      <a class=".primary-text-color" style="float: left; font-size: small;">{{ title }}</a>
      <i class="material-icons player-button play-button" >skip_previous</i>
      <i class="material-icons player-button play-button" v-on:click="togglePause">{{ playStatus }}</i>
      <i class="material-icons player-button play-button" v-on:click="requestNext">skip_next</i>
      <i class="material-icons player-button play-button"
        style="float: right" v-on:click="toggleVolume">{{ volumeStatus }}</i>
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
      requestNext: function () {
        ipcRenderer.send('playEnded', [this.$store.getters.torrentId,
          this.$store.getters.songIndex])
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
  height: 60px;
  width: 100%;
  background-color: #607D8B;
}

.div-player{
  display: inline;
  /*margin:0 48.2%;*/
}
.player progress{
  width:100%;
}

.player-button{
  color:#212121;
}

.player-button+:hover{
  color: #2196F3
}

.primary-text-color    { color: #212121; }
</style>
