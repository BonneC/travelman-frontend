import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import router from './router'

Vue.use(Vuex)
Vue.use(VueAxios, axios)

export const store = new Vuex.Store({
  state: {
    idToken: null
    // userId: null
  },
  mutations: {
    authUser (state, userData) {
      state.idToken = userData.token
      // state.userId = userData.userId
    },
    clearAuthData (state) {
      state.idToken = null
    }
  },
  actions: {
    signup ({commit}, authData) {
      axios.post('http://127.0.0.1:8000/user', authData)
        .then((response) => {
          console.log(response)
          commit('authUser', {token: response.data.acess_token})
          router.replace('/')
        })
        .catch(error => console.log(error))
    },
    login ({commit}, authData) {
      axios.post('http://127.0.0.1:8000/auth/login', authData)
        .then((response) => {
          console.log(response)
          commit('authUser', {token: response.data.access_token})
          router.replace('/')
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
          Authorization: 'Bearer ' + state.idToken
        }
      })
        .then((response) => {
          console.log(response.data)
        })
        .catch(error => console.log(error))
    }
  },
  getters: {
    isAuthenticated (state) {
      return state.idToken !== null
    }
  }
})
