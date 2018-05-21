import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

export const store = new Vuex.Store({
  state: {
    // idToken: null,
    // userId: null,
    isLogged: null,
    locations: null,
    userInfo: null
  },
  mutations: {
    initializeStore (state) {
      if (localStorage.getItem('idToken') && localStorage.getItem('userId')) {
        state.isLogged = true
      }
      // else {
      //   state.isLogged = false
      // }
    },
    authUser (state, userData) {
      // state.idToken = userData.token
      // state.userId = JSON.parse(atob(userData.token.split('.')[1])).sub

      localStorage.setItem('idToken', userData.token)
      localStorage.setItem('userId', JSON.parse(atob(userData.token.split('.')[1])).sub)

      state.isLogged = true
    },
    clearAuthData (state) {
      // state.idToken = null
      // state.userId = null
      state.locations = null
      state.isLogged = null
      state.userInfo = null

      localStorage.removeItem('idToken')
      localStorage.removeItem('userId')
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
    setUserInformation (state, data) {
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
          dispatch('fetchUser')
        })
        .catch(error => console.log(error))
    },
    logout ({commit}) {
      commit('clearAuthData')
      router.replace('/')
    },
    fetchUser ({commit, state}) {
      axios.get('http://127.0.0.1:8000/user', {
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('idToken')
        }
      })
        .then((response) => {
          console.log(response.data)
          commit('setUserInformation', response.data)
        })
        .catch(function () {
          commit('clearAuthData')
        })
    },
    updateUser ({commit, state, dispatch}, userInfo) {
      return new Promise((resolve) => {
        axios.put('http://127.0.0.1:8000/user', userInfo, {
          headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('idToken')
          }
        })
          .then((response) => {
            console.log(response.data)
            dispatch('fetchUser')
          })
          .catch(error => console.log(error))
      })
    },
    fetchLocations ({commit, state}) {
      return new Promise((resolve) => {
        axios.get('http://127.0.0.1:8000/' + localStorage.userId + '/locations')
          .then((response) => {
            commit('setLocations', {locs: response.data})
            resolve()
          })
          .catch(error => console.log(error))
      })
    },
    addLocation ({state, dispatch}, location) {
      return new Promise((resolve) => {
        axios.post('http://127.0.0.1:8000/' + localStorage.userId + '/locations', location)
          .then((response) => {
            console.log(response)
            dispatch('fetchLocations')
          })
          .catch(error => console.log(error))
      })
    },
    deleteLocation ({commit, state}, locationId) {
      return new Promise((resolve) => {
        axios.delete('http://127.0.0.1:8000/' + localStorage.userId + '/locations/' + locationId)
          .then((response) => {
            console.log(response)
            commit('removeLocation', {id: locationId})
          })
          .catch(error => console.log(error))
      })
    },
    updateLocation ({commit, state, dispatch}, locationData) {
      return new Promise((resolve) => {
        axios.put('http://127.0.0.1:8000/' + localStorage.userId + '/locations/' + locationData.id, locationData)
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
      return state.isLogged
    },
    getLocations (state) {
      return state.locations
    },
    getUserInfo (state) {
      return state.userInfo || 'userInfo'
    }
  }
})
