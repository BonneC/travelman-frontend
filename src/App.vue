<template>
  <div id="app">
    <app-navbar></app-navbar>
    <!--<app-gmap></app-gmap>-->
    <!--<app-search></app-search>-->
    <main class="mt-70">
      <div class="main-content">
        <router-view v-on:showAlert="showAlert($event)" v-on:showError="showError($event)"></router-view>
      </div>
      <!-- Footer -->
      <footer class="site-footer">
        <div class="row">
          <div class="col-md-6">
            <p class="text-center text-md-left">Copyright © 2018 <a href="#">Travelman</a>. All rights reserved.</p>
          </div>
        </div>
      </footer>
      <!-- END Footer -->

      <div class="alerts" v-if="alerts.length || errors.length">

        <div class="col-md-6 col-md-offset-6 col-lg-4 col-lg-offset-8 clearfix"
             v-for="(item, keyIndex) in alerts" v-bind:key="keyIndex">
          <div class="card card-inverse card-primary">
            <header class="card-header">
              <h4 class="card-title"><strong>{{ item }}</strong></h4>
              <ul class="card-controls">
                <li><a class="card-btn-close" href="#" @click.prevent="destroyAlert(keyIndex)"></a></li>
              </ul>
            </header>
          </div>
        </div>

        <div class="col-md-6 col-md-offset-6 col-lg-4 col-lg-offset-8 clearfix"
             v-for="(item, keyIndex) in errors" v-bind:key="keyIndex">
          <div class="card card-inverse card-danger">
            <header class="card-header">
              <h4 class="card-title"><strong>{{ item }}</strong></h4>
              <ul class="card-controls">
                <li><a class="card-btn-close" href="#" @click.prevent="destroyError(keyIndex)"></a></li>
              </ul>
            </header>
          </div>
        </div>

      </div>

    </main>
  </div>
</template>

<script>
export default {
  data () {
    return {
      alerts: [],
      errors: []
    }
  },
  methods: {
    showAlert (message) {
      this.alerts.push(message)
      let that = this

      setTimeout(function () {
        that.alerts.splice(
          that.alerts.indexOf(message), 1
        )
      }, 5000)
    },
    destroyAlert (index) {
      this.alerts.splice(index, 1)
    },
    showError (message) {
      this.errors.push(message)
      let that = this

      setTimeout(function () {
        that.errors.splice(
          that.errors.indexOf(message), 1
        )
      }, 5000)
    },
    destroyError (index) {
      this.errors.splice(index, 1)
    }
  }
}
</script>

<style>
  .alerts {
    width: 100%;
    position: fixed;
    bottom: 40px;
    left: 0;
  }
</style>
