<template>
  <div class="main-home-container">
    <div v-if="!auth">
      <div class="row no-gutters min-h-fullscreen bg-white home-fullscreen">

        <div class="col-md-6 col-lg-7 col-xl-8 d-none d-md-block bg-img home-bg" data-overlay="5">
          <div class="row h-100 pl-50">
            <div class="col-md-10 col-lg-8 align-self-end">
              <img src="./assets/img/travelman-logo1.png" alt="..." style="max-height: 120px">
              <br><br><br>
              <h4 class="text-white">Travelman</h4>
              <p class="text-white">Credibly transition sticky users after backward-compatible web services.
                Compellingly strategize team building interfaces.</p>
              <br><br>
            </div>
          </div>
        </div>

        <div class="col-md-6 col-lg-5 col-xl-4 align-self-center">
          <user-login></user-login>
        </div>
      </div>
    </div>
    <app-gmap v-if="auth"></app-gmap>
    <app-search v-if="auth"></app-search>
  </div>
</template>

<script>
import homeBackgroundResource from './assets/img/home-back.jpg'
import UserLogin from './users/UserLogin'

export default {
  components: {UserLogin},
  data () {
    return {
      homeBackground: homeBackgroundResource
    }
  },
  computed: {
    auth () {
      return this.$store.getters.isAuthenticated
    }
  }
}

</script>

<style>
  .min-h-fullscreen {
    min-height: calc(100vh - 125px) !important;
  }

  .main-home-container {
    position: relative;
  }

  .home-bg {
    background-image: url(./assets/img/home-back.jpg);
  }

  @media screen and (min-width: 768px) {
    .home-fullscreen {
      margin: -36px -30px 5px !important;
    }
  }
</style>
