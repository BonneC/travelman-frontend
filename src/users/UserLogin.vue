<template>
  <div class="container">

    <form class="form-signin form-type-line">
      <h2 class="form-signin-heading">Please sign in</h2>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input type="email" v-model="userData.email" id="inputEmail" class="form-control" placeholder="Email address"
             required autofocus>
      <label for="inputPassword" class="sr-only">Password</label>
      <input type="password" v-model="userData.password" id="inputPassword" class="form-control" placeholder="Password"
             required>
      <div class="checkbox">
        <label>
          <!--<input type="checkbox" v-model="userData.remember" value="rememberMe"> Remember me-->
        </label>
        <label>
          <!--<input type="checkbox" v-model="userData.remember" value="rememberPass"> Remember password-->
        </label>
      </div>
      <button class="btn btn-lg btn-primary btn-block"
              type="submit" @click.prevent="onSubmit">Sign in
      </button>
    </form>

    <p>{{isSubmitted}}</p>
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
