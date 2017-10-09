<template>
  <footer id="player" class="player">
    <progress min="0" max="1" value="0" ref="progress" id="progressBar" v-on:click="progress"></progress>
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
        <i style="float: left" id="volume-value">{{ value }}%</i>
        <i class="material-icons play-button" id="volumen-icon" v-on:click="toggleVolume">{{ volumeStatus }}</i>
        <input type="range" id="volumen-slider" min="0" max="1" value="1" step="0.01" ref="slideVolume" v-on:input="updateVolume">
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
        volumeStatus: 'volume_up',
        value: 100
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
        this.value = Math.floor(volumeSlide.value * 100)
        audio.volume = volumeSlide.value
      },
      progress: function (e) {
        var outside = document.getElementById('player')
        var x = Math.floor((e.offsetX / outside.offsetWidth) * 100)
        var audio = this.$refs.audioTag
        if (x >= 0 && x <= 100) {
          audio.currentTime = x / 100 * audio.duration
        }
        document.getElementById('progressBar').innerHTML = x + '%'
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
  margin-top: 15px;
}
.div-player .derecha{
  float: right;
  /* text-align: right; */
  width: 30%;
  padding-top: 16px;
}
.div-player .centro{
  float: left;
  width: 20%;
}

.player progress{
  width:100%;

}
.div-player .player-button{
  color: black;
}
.div-player .player-button:nth-child(even){
  font-size: 50px;
}
.player-button{
  color:#212121;
}

.player-button:hover{
  color: #2196F3 !important
}

.div-player .primary-text-color{ color: white; }
.song-title-tag{
  margin: 0 0;
  font-size: small;
  font-weight: bold;
  font-size: 12px;
}

#volumen-icon{
  display: inline;
}

#volumen-icon:hover{
  color: #2196F3
}

#volumen-slider{
  display: inline;
  width: 70%;
  vertical-align: middle;
}
#volumen-icon, #volumen-slider, #volume-value{
  float:left;
}

#volume-value {
  width: 35px;
  margin-top: 3px;
}

</style>
