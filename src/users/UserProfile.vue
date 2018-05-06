<template>
  <div>
    <h1>User Profile</h1>
    <button @click="fetchUser">Check Console</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  mounted () {

  },
  methods: {
    ...mapActions([
      'fetchUser'
    ])
  }
}
</script>
