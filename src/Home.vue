<template>
  <div>
    <app-gmap v-if="auth"></app-gmap>
    <app-search v-if="auth"></app-search>
  </div>
</template>

<script>
export default {
  computed: {
    auth () {
      return this.$store.getters.isAuthenticated
    }
  }
}

</script>
