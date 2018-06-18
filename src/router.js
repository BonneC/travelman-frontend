import Vue from 'vue'
import VueRouter from 'vue-router'
import { store } from './store.js'
import Home from './Home'
import UserSignup from './users/UserSignup'
import UserProfile from './users/UserProfile'
import UserSettings from './users/UserSettings'
import UserForgot from './users/UserForgot'

Vue.use(VueRouter)

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next()
    return
  }
  next('/')
}

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next()
    return
  }
  next('/')
}

const routes = [
  {path: '/', component: Home},
  {path: '/join', component: UserSignup, beforeEnter: ifNotAuthenticated},
  {path: '/user', component: UserProfile, beforeEnter: ifAuthenticated},
  {path: '/settings', component: UserSettings, beforeEnter: ifAuthenticated},
  {path: '/forgot/:id/:token', component: UserForgot, beforeEnter: ifNotAuthenticated},
  {path: '/forgot', component: UserForgot, beforeEnter: ifNotAuthenticated}
]

const router = new VueRouter({
  routes
})

export default router
