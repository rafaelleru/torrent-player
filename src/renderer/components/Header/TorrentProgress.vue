<template>
  <div id="progess" class="wrapper">
    <div>
      <i style="font-size: small;">{{ title }}</i>
    </div>
    <div>
      <i style="font-size: x-small;">{{ hash }}</i>
    </div>
    <md-progress :md-progress="progress"></md-progress>
  </div>
</template>

<script>
  export default {
    name: 'torrent-progress',
    props: ['title', 'hash', 'progress']
  }
</script>

<style>
</style>
