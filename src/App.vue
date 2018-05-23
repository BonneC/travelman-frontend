<template>
  <div id="app">
    <app-navbar></app-navbar>
    <!--<app-gmap></app-gmap>-->
    <!--<app-search></app-search>-->
    <main class="mt-70">
      <div class="main-content">
        <router-view></router-view>
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
    </main>
  </div>
</template>

<script>export default {}
</script>

<style>

</style>
