import Vue from 'vue'

import App from './App'
import store from '../store'
var ipc = require('./ipc.js')

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

// Vue Material: http://vuematerial.io
var VueMaterial = require('vue-material')
var VueRouter = require('vue-router')
Vue.use(VueMaterial)
Vue.use(VueRouter)

const routes = [
  { path: '/', component: require('./pages/TorrentPlayer.vue') },
  { path: '/settings', component: require('./pages/Settings.vue') }
]

const router = new VueRouter({
  routes
})

new Vue({
  store,
  ipc,
  router,
  components: { App },
  template: '<App/>'
}).$mount('#app')
