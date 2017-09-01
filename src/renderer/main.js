import Vue from 'vue'

import App from './App'
import store from '../store'
var ipc = require('./ipc.js')

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  store,
  ipc,
  components: { App },
  template: '<App/>'
}).$mount('#app')
