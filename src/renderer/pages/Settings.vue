<template lang="html">
  <div id="settings" class="settings">
    <header id="header" class="header dark-primary-color">
      <link rel="stylesheet" href="../../node_modules/vue-material/dist/vue-material.css">
      <nav style="vertical-align: middle">

        <md-layout :md-gutter="8">
          <md-layout md-flex="25"><md-button class="md-raised md-primary" @click="goBack">Go Back</md-button></md-layout>
          <md-layout md-flex="75"><h1>Settings</h1></md-layout>
        </md-layout>

      </nav>
    </header>
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
  </div>
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
  },
  methods: {
    goBack: function () {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    }
  }
}
</script>

<style lang="css">
.settings {
  margin-top: 55px;
}
</style>
