<template>
  <footer id="player" class="player">
    <!--<progress min="0" max="1" value="0" ref="progress" id="progressBar" v-on:click="progress"></progress>-->
    <div class="progressbar" id="background"  v-on:click="progress" @mousedown="mouseDown" @mousemove="mouseMove" @mouseup="mouseUp">
      <div class="actualprogress" id="progressBar" ref="progress">
        <div class="bolita" id="bola"></div>
      </div>
    </div>
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
        value: 100,
        entra: false
        // source: 'http://nadikun.com/audio/suit-and-tie-oscar-wylde-remix.mp3'
      }
    },
    created: function () {
      window.addEventListener('keyup', this.handleKeyPress)
    },
    beforeDestroy: function () {
      window.removeEventListener('keyup', this.handleKeyPress)
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
        var currentProgress = (audio.currentTime / audio.duration) * 100
        /* console.log(currentProgress) */
        progressbar.style.width = currentProgress + '%'
      },
      requestPrevious: function () {
        ipcRenderer.send('playPrevious', [this.$store.getters.torrentId,
          this.$store.getters.songIndex])
      },
      requestNext: function () {
        ipcRenderer.send('playEnded', [this.$store.getters.torrentId,
          this.$store.getters.songIndex])
      },
      updateVolume: function (amount = 0) {
        const volume = Math.floor(this.$refs.slideVolume.value * 100)
        const audio = this.$refs.audioTag
        const updatedVolume = volume + amount
        let newVolume = updatedVolume
        if (updatedVolume > 100) {
          newVolume = 100
        } else if (this.value === 0 && updatedVolume <= 0) {
          newVolume = 0
        } else if (this.value === 0 && updatedVolume > 0) {
          this.toggleVolume()
        } else if (updatedVolume <= 0) {
          newVolume = 0
          this.toggleVolume()
        }
        this.value = newVolume
        audio.volume = newVolume / 100
        this.$refs.slideVolume.value = newVolume / 100
      },
      progress: function (e) {
        var outside = document.getElementById('background')
        var x = Math.floor((e.offsetX / outside.offsetWidth) * 100)
        var audio = this.$refs.audioTag
        if (x > 0 && x <= 100) {
          audio.currentTime = x / 100 * audio.duration
          this.$refs.progress.style.width = x + '%'
        }
      },
      mouseDown: function () {
        if (!this.entra) {
          this.entra = true
        }
      },
      mouseMove: function (e) {
        if (this.entra) {
          this.progress(e)
        }
      },
      mouseUp: function () {
        if (this.entra) {
          this.entra = false
        }
      },
      handleKeyPress: function (e) {
        const code = e.which
        const ctrl = e.ctrlKey
        switch (code) {
          case 32:
            this.togglePause()
            break
          case 37:
            if (ctrl) this.requestPrevious()
            break
          case 38:
            if (ctrl) this.updateVolume(10)
            break
          case 39:
            if (ctrl) this.requestNext()
            break
          case 40:
            if (ctrl) this.updateVolume(-10)
            break
          default:
            break
        }
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
  margin-bottom: 2px;
}
#volumen-icon, #volumen-slider, #volume-value{
  float:left;
}

#volume-value {
  width: 35px;
  margin-top: 3px;
}
input[type=range] {
  -webkit-appearance: none;
  width: 100%;
  margin: 13.8px 02px;
}
input[type=range]:focus {
  outline: none;
}
input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  height: 5.4px;
  cursor: pointer;
  /*box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;*/
  background: #2196F3;
  border-radius: 1.3px;
  /*  border: 0.2px solid #010101;*/
}
input[type=range]::-webkit-slider-thumb {
  /*box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;*/
  /*border: 1px solid #000000;*/
  height: 16px;
  width: 16px;
  border-radius: 12px;
  /*background: #ffffff;*/
  background: #2196F3;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -6px;
}
input[type=range]:focus::-webkit-slider-runnable-track {
  background: #2196F3;
}
input[type=range]::-moz-range-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  background: #3071a9;
  border-radius: 1.3px;
  border: 0.2px solid #010101;
}
input[type=range]::-moz-range-thumb {
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  /*border: 1px solid #000000;*/
  height: 36px;
  width: 16px;
  border-radius: 3px;
  background: #ffffff;
  cursor: pointer;
}
input[type=range]::-ms-track {
  width: 100%;
  height: 8.4px;
  cursor: pointer;
  background: transparent;
  border-color: transparent;
  color: transparent;
}
input[type=range]::-ms-fill-lower {
  background: #2196F3;
  /*border: 0.2px solid #010101;*/
  border-radius: 2.6px;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
}
input[type=range]::-ms-fill-upper {
  background: #2196F3;
  /*border: 0.2px solid #010101;*/
  border-radius: 2.6px;
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;

}
input[type=range]::-ms-thumb {
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  /*border: 1px solid #000000;*/
  height: 36px;
  width: 16px;
  border-radius: 3px;
  background: #ffffff;
  cursor: pointer;
  height: 8.4px;
}
input[type=range]:focus::-ms-fill-lower {
  background: #2196F3;
}
input[type=range]:focus::-ms-fill-upper {
  background: #2196F3;
}
.progressbar{
  width: 100%;
  cursor: pointer;
  background-color: grey;
  height: 8px;
  display: flex;
  border-radius: 2px;
  z-index: 1;
}
.actualprogress{
  width: 0%;
  height: 6px;
  display: flex;
  background-color: #2196F3;
  z-index: 2;
  border-radius: 2px;
  margin-top:1px;
  position: relative;
}
.bolita{
  background-color: green;
  border-radius: 50%;
  width: 12px;
  height: 12px;
  z-index: 3;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.5);
  /*transform: scale(0);*/
  transition: transform .1s cubic-bezier(.3,0,.7,1);
  position: absolute;
  left: 99.5%;
  top: -3px;
  display: none;
}
.progressbar:hover > #progressBar #bola{
  display: inline;
}
</style>
