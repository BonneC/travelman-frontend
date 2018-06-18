import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

export const store = new Vuex.Store({
  state: {
    isLogged: null,
    locations: null,
    userInfo: null,
    visitedCount: null,
    plannedCount: null
  },
  mutations: {
    initializeStore (state) {
      if (localStorage.getItem('idToken') && localStorage.getItem('userId')) {
        state.isLogged = true
      }
    },
    authUser (state, userData) {
      localStorage.setItem('idToken', userData.token)
      localStorage.setItem('userId', JSON.parse(atob(userData.token.split('.')[1])).sub)

      state.isLogged = true
    },
    clearAuthData (state) {
      state.locations = null
      state.isLogged = null
      state.userInfo = null

      localStorage.removeItem('idToken')
      localStorage.removeItem('userId')
    },
    setLocations (state, data) {
      state.locations = data.locs
    },
    setVisited (state, data) {
      state.visitedCount = data.value
    },
    setPlanned (state, data) {
      state.plannedCount = data.value
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
    signup ({commit, dispatch}, authData) {
      axios.post('http://127.0.0.1:8000/user', authData)
        .then((response) => {
          commit('authUser', {token: response.data.access_token})
          dispatch('fetchUser')
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
    updateAvatar ({commit, state}, avatarData) {
      return new Promise((resolve, reject) => {
        return axios.post('http://127.0.0.1:8000/' + localStorage.userId + '/avatar', avatarData, {
          headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('idToken')
          }
        }).then((response) => {
          resolve(response)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    fetchLocations ({commit, state}) {
      return new Promise((resolve) => {
        axios.get('http://127.0.0.1:8000/' + localStorage.userId + '/locations', {
          headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('idToken')
          }
        })
          .then((response) => {
            commit('setLocations', {locs: response.data})
            resolve()
          })
          .catch(error => console.log(error))
      })
    },
    addLocation ({state, dispatch}, location) {
      return new Promise((resolve) => {
        axios.post('http://127.0.0.1:8000/' + localStorage.userId + '/locations', location, {
          headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('idToken')
          }
        })
          .then((response) => {
            console.log(response)
            dispatch('fetchLocations')
          })
          .catch(error => console.log(error))
      })
    },
    deleteLocation ({commit, state}, locationId) {
      return new Promise((resolve) => {
        axios.delete('http://127.0.0.1:8000/' + localStorage.userId + '/locations/' + locationId, {
          headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('idToken')
          }
        })
          .then((response) => {
            console.log(response)
            commit('removeLocation', {id: locationId})
          })
          .catch(error => console.log(error))
      })
    },
    updateLocation ({commit, state, dispatch}, locationData) {
      return new Promise((resolve) => {
        axios.put('http://127.0.0.1:8000/' + localStorage.userId + '/locations/' + locationData.id, locationData, {
          headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('idToken')
          }
        })
          .then((response) => {
            dispatch('fetchLocations')
            console.log(response)
          })
          .catch(error => console.log(error))
      })
    },
    fetchVisitedCount ({commit, state}) {
      return new Promise((resolve) => {
        axios.get('http://127.0.0.1:8000/' + localStorage.userId + '/locations/visited/count')
          .then((response) => {
            commit('setVisited', {value: response.data.count})
            resolve()
          })
          .catch(error => console.log(error))
      })
    },
    fetchPlannedCount ({commit, state}) {
      return new Promise((resolve) => {
        axios.get('http://127.0.0.1:8000/' + localStorage.userId + '/locations/planned/count')
          .then((response) => {
            commit('setPlanned', {value: response.data.count})
            resolve()
          })
          .catch(error => console.log(error))
      })
    },
    checkEmail ({commit}, email) {
      return new Promise((resolve, reject) => {
        axios.post('http://127.0.0.1:8000/forgotpassword', email)
          .then((response) => {
            resolve(response)
          }, (error) => {
            reject(error)
          })
      })
    },
    checkToken ({commit}, tokenData) {
      return new Promise((resolve, reject) => {
        axios.post('http://127.0.0.1:8000/forgotpassword/check', tokenData)
          .then((response) => {
            resolve(response)
          }, (error) => {
            reject(error)
          })
      })
    },
    changePassword ({commit}, userData) {
      return new Promise((resolve, reject) => {
        axios.post('http://127.0.0.1:8000/forgotpassword/new', userData)
          .then((response) => {
            resolve(response)
          }, (error) => {
            reject(error)
          })
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
    },
    getVisitedCount (state) {
      return state.visitedCount
    },
    getPlannedCount (state) {
      return state.plannedCount
    }
  }
})
