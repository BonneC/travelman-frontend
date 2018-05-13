// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import GoogleMap from './GoogleMap'
import MapSearchBar from './MapSearchBar'
import Navbar from './Navbar'
import router from './router'

import { store } from './store'
import VModal from 'vue-js-modal'

Vue.config.productionTip = false

Vue.use(VModal, {dialog: true})

Vue.component('app-navbar', Navbar)
Vue.component('app-gmap', GoogleMap)
Vue.component('app-search', MapSearchBar)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'

})
