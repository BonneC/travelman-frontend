import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './Home'
import UserSignup from './users/UserSignup'
import UserProfile from './users/UserProfile'
import UserLogin from './users/UserLogin'
import UserSettings from './users/UserSettings'

Vue.use(VueRouter)

const routes = [
  {path: '/', component: Home},
  {path: '/join', component: UserSignup},
  {path: '/user', component: UserProfile},
  {path: '/login', component: UserLogin},
  {path: '/settings', component: UserSettings}
]

const router = new VueRouter({
  routes
})

export default router
