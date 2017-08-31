<template>
  <footer id="player" class="player">
    <progress min="0" max="1" value="0" ref="progress"></progress>
    <div class="div-player">
      <i class="material-icons play-button player-button" >skip_previous</i>
      <i class="material-icons play-button player-button" v-on:click="togglePause">play_circle_outline</i>
      <i class="material-icons play-button player-button" >skip_next</i>
      <audio ref="audioTag" :src="source" autoplay preload="none" @timeupdate="onTimeUpdateListener"></audio>
      <a class=".primary-text-color" style="text-align: center; font-size: small;">{{ title }}</a>
    </div>
    <!-- <progress min="0" max="1" value="0" ref="progress"></progress> -->
  </footer>
</template>

<script>
  export default {
    name: 'player',
    data: function () {
      return {
        playing: false
        // source: 'http://nadikun.com/audio/suit-and-tie-oscar-wylde-remix.mp3'
      }
    },
    methods: {
      togglePause: function () {
        var audio = this.$refs.audioTag
        if (!this.playing) {
          audio.play()
          this.playing = !this.playing
        } else {
          audio.pause()
          this.playing = !this.playing
        }
      },
      onTimeUpdateListener: function () {
        var progressbar = this.$refs.progress
        var audio = this.$refs.audioTag
        var currentProgress = (audio.currentTime / audio.duration)
        progressbar.value = currentProgress
      }
    },
    computed: {
      source () {
        return this.$store.getters.src
      },
      title () {
        return this.$store.getters.title
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
  margin:0 48.2%;
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
