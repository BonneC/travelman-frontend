<template>
  <div>
    <header class="topbar topbar-expand-lg">
      <div class="topbar-left">
        <span class="topbar-btn topbar-menu-toggler"><i>&#9776;</i></span>
        <router-link to="/">
          <img src="./assets/logo.png" style="margin:5px; max-height: 80px;" alt="">
        </router-link>
      </div>

      <div class="topbar-right">
        <nav class="topbar-navigation">
          <ul class="menu">
            <li v-if="auth" class="menu-item active">
              <router-link to="/" class="menu-link">
                <span class="icon ti-home"></span>
                <span class="title">Home</span>
              </router-link>
            </li>
            <li v-if="!auth" class="menu-item">
              <router-link to="/join" class="menu-link">
                <span class="icon ti-plus"></span>
                <span class="title">Sign Up</span>
              </router-link>
            </li>
            <li v-if="!auth" class="menu-item">
              <router-link to="/login" class="menu-link">
                <span class="icon ti-shift-right"></span>
                <span class="title">Sign In</span>
              </router-link>
            </li>

            <li v-if="auth" class="menu-item">
              <router-link to="/user" class="menu-link">
                <span class="title">{{ userInfo.first_name }}</span>
              </router-link>
            </li>

            <li v-if="auth" class="menu-item">
              <a class="menu-link" href="#">
                <span class="title">Settings</span>
                <span class="arrow"></span>
              </a>
              <ul class="menu-submenu menu-submenu-right">
                <li class="menu-item">
                  <a class="menu-link" href="#">
                    <router-link to="/settings" class="menu-link">
                      <span class="title">{{ userInfo.first_name }}</span>
                    </router-link>
                  </a>
                </li>
                <li class="menu-item">
                  <a class="menu-link" href="#">
                    <span class="title">Topbar</span>
                  </a>
                </li>
                <li class="menu-item">
                  <a class="menu-link" href="#" @click="onLogout()">
                    <span class="icon ti-power-off"></span>
                    <span class="title">Logout</span>
                  </a>
                </li>
              </ul>
            </li>

          </ul>
        </nav>
      </div>
    </header>

  </div>
</template>

<script>
export default {
  computed: {
    auth () {
      return this.$store.getters.isAuthenticated
    },
    userInfo () {
      return this.$store.getters.getUserInfo
    }
  },
  methods: {
    onLogout () {
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style>

</style>
