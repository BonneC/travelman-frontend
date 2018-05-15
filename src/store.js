import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

export const store = new Vuex.Store({
  state: {
    idToken: null,
    userId: null,
    locations: null,
    userInfo: null
  },
  mutations: {
    initialiseStore (state) {
      if (localStorage.getItem('idToken') && localStorage.getItem('userId')) {
        state.idToken = localStorage.getItem('idToken')
        state.userId = localStorage.getItem('userId')
      }
    },
    authUser (state, userData) {
      state.idToken = userData.token
      state.userId = JSON.parse(atob(userData.token.split('.')[1])).sub

      localStorage.setItem('idToken', state.idToken)
      localStorage.setItem('userId', state.userId)
    },
    clearAuthData (state) {
      state.idToken = null
      state.userId = null
      state.locations = null
    },
    setLocations (state, data) {
      state.locations = data.locs
    },
    removeLocation (state, data) {
      state.locations.forEach((location) => {
        if (location.id === data.id) {
          state.locations.splice(state.locations.indexOf(location), 1)
        }
      })
    },
    getUserInformation (state, data) {
      state.userInfo = data
    }
  },
  actions: {
    signup ({commit}, authData) {
      axios.post('http://127.0.0.1:8000/user', authData)
        .then((response) => {
          commit('authUser', {token: response.data.access_token})
          router.replace('/')
        })
        .catch(error => console.log(error))
    },
    login ({commit, dispatch}, authData) {
      axios.post('http://127.0.0.1:8000/auth/login', authData)
        .then((response) => {
          commit('authUser', {token: response.data.access_token})
          router.replace('/')
          dispatch('fetchLocations')
        })
        .catch(error => console.log(error))
    },
    logout ({commit}) {
      commit('clearAuthData')
      router.replace('/')

      localStorage.removeItem('idToken')
      localStorage.removeItem('userId')
    },
    fetchUser ({commit, state}) {
      axios.get('http://127.0.0.1:8000/user', {
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + state.idToken
        }
      })
        .then((response) => {
          console.log(response.data)
          commit('getUserInformation', response.data)
        })
        .catch(error => console.log(error))
    },
    fetchLocations ({commit, state}) {
      return new Promise((resolve) => {
        axios.get('http://127.0.0.1:8000/' + state.userId + '/locations')
          .then((response) => {
            commit('setLocations', {locs: response.data})
            resolve()
          })
          .catch(error => console.log(error))
      })
    },
    addLocation ({state, dispatch}, location) {
      return new Promise((resolve) => {
        axios.post('http://127.0.0.1:8000/' + state.userId + '/locations', location)
          .then((response) => {
            console.log(response)
            dispatch('fetchLocations')
          })
          .catch(error => console.log(error))
      })
    },
    deleteLocation ({commit, state}, locationId) {
      return new Promise((resolve) => {
        axios.delete('http://127.0.0.1:8000/' + state.userId + '/locations/' + locationId)
          .then((response) => {
            console.log(response)
            commit('removeLocation', {id: locationId})
          })
          .catch(error => console.log(error))
      })
    },
    updateLocation ({commit, state, dispatch}, locationData) {
      return new Promise((resolve) => {
        axios.put('http://127.0.0.1:8000/' + state.userId + '/locations/' + locationData.id, locationData)
          .then((response) => {
            dispatch('fetchLocations')
            console.log(response)
          })
          .catch(error => console.log(error))
      })
    }
  },
  getters: {
    isAuthenticated (state) {
      return state.idToken !== null
    },
    getLocations (state) {
      return state.locations
    },
    getUserInfo (state) {
      return state.userInfo
    }
  }
})
