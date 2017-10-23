import VueRouter from 'vue-router'
import TorrentPlayer from './pages/TorrentPlayer.vue'
import Settings from './pages/Settings.vue'

const routes = [
  {path: '/', component: TorrentPlayer},
  {path: '/settings', component: Settings}
]

export default new VueRouter({
  routes // short for `routes: routes`
})
