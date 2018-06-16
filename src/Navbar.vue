<template>
  <div>

    <div id="navbar-mobile" v-if="displayMobileNavbar">
      <h3><a href="#" @click="toggleMobileNavbar">&times;</a></h3>
      <hr>
      <div class="media-list media-list-hover media-list-divided">

        <router-link to="/" class="media media-single" v-on:click.native="toggleMobileNavbar">
          <span class="icon ti-home"></span>
          <span class="title">Home</span>
        </router-link>

        <router-link v-if="!auth" to="/join" class="media media-single" v-on:click.native="toggleMobileNavbar">
          <span class="icon ti-plus"></span>
          <span class="title">Sign Up</span>
        </router-link>

        <router-link v-if="!auth" to="/" class="media media-single" v-on:click.native="toggleMobileNavbar">
          <span class="icon ti-shift-right"></span>
          <span class="title">Sign In</span>
        </router-link>

        <router-link v-if="auth" to="/user" class="media media-single" v-on:click.native="toggleMobileNavbar">
          <span class="title">{{ userInfo.first_name }}</span>
        </router-link>

        <router-link v-if="auth" to="/settings" class="media media-single" v-on:click.native="toggleMobileNavbar">
          <span class="title">Actual Settings</span>
        </router-link>

        <a v-if="auth" class="media media-single" href="#" @click="onLogout(); toggleMobileNavbar()">
          <span class="icon ti-power-off"></span>
          <span class="title">Logout</span>
        </a>

      </div>
    </div>

    <header class="topbar topbar-inverse topbar-expand-lg">
      <div class="topbar-left">
        <span class="topbar-btn topbar-menu-toggler" @click="toggleMobileNavbar()"><i>&#9776;</i></span>
        <router-link to="/" class="topbar-brand">
          <img src="./assets/img/travelman-logo1.png" style="margin:5px; max-height: 60px;" alt="">
        </router-link>
      </div>

      <div class="topbar-right">
        <nav class="topbar-navigation">
          <ul class="menu">
            <li v-if="auth" class="menu-item active open">
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
              <router-link to="/" class="menu-link">
                <span class="icon ti-shift-right"></span>
                <span class="title">Sign In</span>
              </router-link>
            </li>

            <li v-if="auth" class="menu-item">
              <router-link to="/user" class="menu-link">
                <span class="title">{{ userInfo.first_name }}</span>
                <span class="arrow"></span>
              </router-link>
              <ul class="menu-submenu menu-submenu-right">
                <li class="menu-item">
                  <a class="menu-link" href="#">
                    <router-link to="/settings" class="menu-link">
                      <span class="title">Actual Settings</span>
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
  data () {
    return {
      displayMobileNavbar: false
    }
  },
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
    },
    toggleMobileNavbar () {
      this.displayMobileNavbar = !this.displayMobileNavbar
    }
  }
}
</script>

<style>
  #navbar-mobile {
    position: fixed;
    width: 95%;
    height: 95%;
    top: 2.5%;
    left: 2.5%;
    z-index: 9999;
    background: #f3f3f3;
  }

  #navbar-mobile h3 a {
    display: inline-block;
    padding: 5px 10px;
    float: right;
  }
</style>
