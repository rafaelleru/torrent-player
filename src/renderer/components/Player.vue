<template>
  <footer id="player" class="player">
    <div class="div-player">
      <i class="material-icons play-button" >skip_previous</i>
      <i class="material-icons play-button" v-on:click="togglePause">play_circle_outline</i>
      <i class="material-icons play-button" >skip_next</i>
      <audio ref="audioTag" src="http://nadikun.com/audio/suit-and-tie-oscar-wylde-remix.mp3" @timeupdate="onTimeUpdateListener"></audio>
    </div>
    <progress min="0" max="1" value="0" ref="progress"></progress>
  </footer>
</template>

<script>
  export default {
    name: 'player',
    data: function () {
      return {
        playing: false
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
    }
  }
</script>

<style>
.player {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  width: 100%;
}

.div-player{
  display: inline;
  margin:0 48.2%;
}
.player progress{
  width:100%;
}
</style>
