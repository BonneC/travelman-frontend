<template>
  <div>
    <h1>I'm home</h1>
    <h2 v-if="!auth">Main page when not logged in boiiiiii</h2>
    <app-gmap></app-gmap>
    <app-search></app-search>
  </div>
</template>


<script>
  export default {
    computed: {
      auth() {
        return this.$store.getters.isAuthenticated
      }
    }
  }

</script>
