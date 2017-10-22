<template lang="html">
  <form novalidate @submit.stop.prevent="submit">

    <md-input-container>
      <label>Download Location</label>
      <md-input v-model="savePath"></md-input>
    </md-input-container>

    <md-input-container>
      <label>Upload (kb/s)</label>
      <md-input type="number" v-model="uploadSpeed" placeholder="Infinity">kb/s</md-input>
    </md-input-container>

    <md-input-container>
      <label>Download (kb/s)</label>
      <md-input type="number" v-model="downloadSpeed" placeholder="Infinity">kb/s</md-input>
    </md-input-container>

    <md-input-container>
      <label for="language">Language</label>
      <md-select name="language" id="language" v-model="language">
        <md-option value="en">English</md-option>
        <md-option value="de">German</md-option>
        <md-option value="gr">Greek</md-option>
      </md-select>
    </md-input-container>

    <md-input-container>
      <label for="theme">Theme</label>
      <md-select name="theme" id="theme" v-model="theme">
        <md-option value="default">Default</md-option>
      </md-select>
    </md-input-container>

</form>
</template>

<script>
export default {
  name: 'settings',
  data: function () {
    return {
      'savePath': './Downloads',
      'uploadSpeed': Infinity,
      'downloadSpeed': Infinity,
      'language': 'en',
      'theme': 'default'
    }
  }
}
</script>

<style lang="css">
</style>
