<template>
  <div class="px-80 py-30">
    <h4>Login</h4>
    <p>
      <small>Sign into your account</small>
    </p>
    <br>

    <form>
      <div class="form-group">
        <label for="inputEmail">Email address</label>
        <input type="text" class="form-control" v-model="userData.email" id="inputEmail" placeholder="Email address"
               required autofocus>
      </div>

      <div class="form-group">
        <label for="inputPassword">Password</label>
        <input type="password" class="form-control" v-model="userData.password" id="inputPassword"
               placeholder="Password" required>
      </div>

      <div class="form-group flexbox">
        <router-link class="text-muted hover-primary fs-13" to="/forgot">Forgot password?</router-link>
      </div>

      <div class="form-group">
        <button class="btn btn-bold btn-block btn-primary" type="submit" @click.prevent="onSubmit">
          Login
        </button>
      </div>
    </form>

    <hr class="w-30px">

    <p class="text-center text-muted fs-13 mt-20">Don't have an account?
      <router-link class="text-primary fw-500" to="/join">Sign up</router-link>
    </p>
  </div>

</template>

<script>
export default {
  name: 'UserLogin',
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
