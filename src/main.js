// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import GoogleMap from './GoogleMap'
import MapSearchBar from './MapSearchBar'
import router from './router'

Vue.config.productionTip = false

Vue.component('app-gmap', GoogleMap)
Vue.component('app-search', MapSearchBar)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
