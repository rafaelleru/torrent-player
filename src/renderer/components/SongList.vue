<template>
  <div id="playlist" class="playlist">
    <draggable v-model="songs" @start="isDragging=true" @end="isDragging=false">
      <div
	      is="song"
      	v-for="song in songs"
      	v-bind:title="song.title"
      	v-bind:torrent="song.torrent"
      	v-bind:index="song.index"
      	v-bind:duration="song.duration">
      </div>
    </draggable>
  </div>
</template>

<script>
import Song from './SongList/Song'
import draggable from 'vuedraggable'

export default {
  name: 'playlist',
  components: {
    Song,
    draggable
  },
  data () {
    return {
      isDragging: false
    }
  },
  mathods: {
    onMove: function ({relatedContext, draggedContext}) {
      const relatedElement = relatedContext.element
      const draggedElement = draggedContext.element
      return (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
    }
  },
  computed: {
    dragOptions () {
      return {
        animation: 0,
        group: 'description',
        disabled: !this.editable,
        ghostClass: 'ghost'
      }
    },
    songs: {
      get () {
        return this.$store.getters.songs
      },
      set (value) {
        this.$store.commit('updateSongList', value)
      }
    }
  },
  watch: {
    isDragging (newValue) {
      if (newValue) {
        this.delayedDragging = true
        return
      }
      this.$nextTick(() => {
        this.delayedDragging = false
      })
    }
  }
}
</script>

<style>
.playlist {
  margin-top: 55px;
}

.play-button {
  display: table-cell;
  vertical-align: middle;
  cursor: pointer;
}

.play-button:hover{
  color: #607D8B;
}

.song-container {
  text-align: left;
  display:table-cell;
}

.song:nth-child(even) {
  background-color: #ECEFF1;
}

.song:nth-child(odd) {
  background-color: #CFD8DC;
}
</style>
