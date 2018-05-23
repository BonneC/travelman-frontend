<template>
  <div class="container card card-shadowed px-50 py-30">

    <form class="form-signin">
      <h2 class="form-signin-heading">Please sign in</h2>
      <div class="form-group">
        <label for="inputEmail" class="sr-only">Email address</label>
        <input type="email" v-model="userData.email" id="inputEmail" class="form-control" placeholder="Email address"
               required autofocus>
      </div>
      <div class="form-group">
        <label for="inputPassword" class="sr-only">Password</label>
        <input type="password" v-model="userData.password" id="inputPassword" class="form-control"
               placeholder="Password" required>
      </div>

      <div class="form-group">
        <router-link to="/forgot" class="text-muted hover-primary">Forgot password?</router-link>
      </div>

      <button class="btn btn-lg btn-primary btn-block"
              type="submit" @click.prevent="onSubmit">Sign in
      </button>
    </form>

  </div>
</template>

<script>
export default {
  data () {
    return {
      userData: {
        email: '',
        password: ''
        // remember: []
      },
      isSubmitted: false
    }
  },
  methods: {
    onSubmit () {
      this.isSubmitted = true
      this.$store.dispatch('login', this.userData)
    }
  }
}
</script>
