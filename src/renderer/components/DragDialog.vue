<template>
  <div id="drag-zone" v-on:drop="setSee" style="margin-top: 200px; text-align: center;" v-show="this.see">
    <div>
      <i class="material-icons">system_update_alt</i>
    </div>
    <div>
      <p> drag .torrent file to start listening</p>
    </div>
  </div>
</template>

<script>
const dragDrop = require('drag-drop/buffer')
const {ipcRenderer} = require('electron')

export default {
  name: 'drag-dialog',
  data: function () {
    return {
      see: true
    }
  },
  mounted: function () {
    dragDrop('#drag-zone', function (files) { ipcRenderer.send('addFiles', files) })
  },
  methods: {
    setSee: function () {
      this.see = false
    }
  }
}
</script>

<style>
<style>
