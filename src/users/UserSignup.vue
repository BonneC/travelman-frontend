<template>
  <div>
    <div class="row no-gutters min-h-fullscreen bg-white home-fullscreen">

      <div class="col-md-6 col-lg-7 col-xl-8 d-none d-md-block bg-img signup-bg" data-overlay="5">
        <div class="row h-100 pl-50">
          <div class="col-md-10 col-lg-8 align-self-end">
            <img src="../assets/img/travelman-logo1.png" alt="..." style="max-height: 120px">
            <br><br><br>
            <h4 class="text-white">Travelman</h4>
            <p class="text-white">Credibly transition sticky users after backward-compatible web services.
              Compellingly strategize team building interfaces.</p>
            <br><br>
          </div>
        </div>
      </div>

      <div class="col-md-6 col-lg-5 col-xl-4 align-self-center">
        <div class="px-80 py-30">
          <h4>Register an account</h4>
          <p>
            <small>All fields are required.</small>
          </p>
          <br>

          <form>
            <div class="row">
              <div class="col-xs-12 col-sm-6">
                <div class="form-group">
                  <label for="first_name">First Name</label>
                  <input type="text" v-model.lazy="userData.firstName" name="first_name" id="first_name"
                         class="form-control input-lg" placeholder="First Name" tabindex="1">
                </div>
              </div>
              <div class="col-xs-12 col-sm-6">
                <div class="form-group">
                  <label for="last_name">Last Name</label>
                  <input type="text" v-model.lazy="userData.lastName" name="last_name" id="last_name"
                         class="form-control input-lg" placeholder="Last Name" tabindex="2">
                </div>
              </div>
            </div>

            <div class="form-group">
              <label for="email">Email Address</label>
              <input type="email" v-model="userData.email" name="email" id="email" class="form-control input-lg"
                     placeholder="Email Address" tabindex="3">
            </div>

            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" v-model="userData.password" name="password" id="password"
                     class="form-control input-lg" placeholder="Password" tabindex="4">
            </div>

            <div class="form-group">
              <label for="password_confirmation">Confirm Password</label>
              <input type="password" name="password_confirmation" id="password_confirmation"
                     class="form-control input-lg" placeholder="Confirm Password" tabindex="5">
            </div>

            <hr>

            <div class="form-group">
              <button class="btn btn-bold btn-block btn-primary" type="submit" @click.prevent="onSubmit">
                Register
              </button>
            </div>
          </form>

          <hr class="w-30px">

          <p class="text-center text-muted fs-13 mt-20">Already have an account?
            <router-link class="text-primary fw-500" to="/">Sign in</router-link>
          </p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      userData: {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      },
      isSubmitted: false
      // firstName: ''

    }
  },
  methods: {
    onSubmit () {
      this.isSubmitted = true
      this.$store.dispatch('signup', this.userData)
    }
  }
}
</script>

<style>
  .signup-bg {
    background-image: url(../assets/img/signup-back.jpg);
  }
</style>
