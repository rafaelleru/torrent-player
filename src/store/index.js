import Vue from 'vue'
import Vuex from 'vuex'

import playlist from './modules/playlist'
import player from './modules/player'

Vue.use(Vuex)

export default new Vuex.Store({
  // state,
  // getters,
  // mutations,
  // actions,
  modules: {
    playlist,
    player
  }
})
