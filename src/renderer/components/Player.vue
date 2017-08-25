<template>
  <footer id="player" class="player">
    <i class="material-icons play-button" style="text-align: center">skip_previous</i>
    <i class="material-icons play-button" style="text-align: center" v-on:click="togglePause">play_circle_outline</i>
    <i class="material-icons play-button" style="text-align: center">skip_next</i>
    <audio ref="audioTag" src="http://nadikun.com/audio/suit-and-tie-oscar-wylde-remix.mp3"></audio>
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
  float: left;
  width: 100%;
}

</style>
