import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'


Vue.use(Vuex);
Vue.use(VueAxios, axios);

export const store = new Vuex.Store({
  state: {
    idToken: null,
    //userId: null
  },
  mutations: {
    authUser(state, userData) {
      state.idToken = userData.token;
      //state.userId = userData.userId
    }

  },
  actions: {
    signup({commit}, authData) {
      axios.post('http://127.0.0.1:8000/user', authData)
        .then((response) => {
          console.log(response);
          commit('authUser', {token: response.data.acess_token})
        })
        .catch(error => console.log(error))
    },
    login({commit}, authData) {
      axios.post('http://127.0.0.1:8000/auth/login', authData)
        .then((response) => {
          console.log(response);
          commit('authUser', {token: response.data.access_token});

        })
        .catch(error => console.log(error))
    }

  },
  getters: {}
});
