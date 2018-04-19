<template>
  <div class="container">

    <div class="row">
      <div class="col-xs-12 col-sm-8 col-md-6 col-sm-offset-2 col-md-offset-3">
        <form role="form">
          <h2>Please Sign Up
            <small>It's free and always will be.</small>
          </h2>
          <hr class="colorgraph">
          <div class="row">
            <div class="col-xs-12 col-sm-6 col-md-6">
              <div class="form-group">
                <input type="text" v-model.lazy="firstName" name="first_name" id="first_name"
                       class="form-control input-lg" placeholder="First Name" tabindex="1">
              </div>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-6">
              <div class="form-group">
                <input type="text" v-model.lazy="userData.name" name="last_name" id="last_name"
                       class="form-control input-lg" placeholder="Last Name" tabindex="2">
              </div>
            </div>
          </div>
          <div class="form-group">
            <input type="email" v-model="userData.email" name="email" id="email" class="form-control input-lg"
                   placeholder="Email Address" tabindex="3">
          </div>
          <div class="row">
            <div class="col-xs-12 col-sm-6 col-md-6">
              <div class="form-group">
                <input type="password" v-model="userData.password" name="password" id="password"
                       class="form-control input-lg" placeholder="Password" tabindex="4">
              </div>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-6">
              <div class="form-group">
                <input type="password" name="password_confirmation" id="password_confirmation"
                       class="form-control input-lg" placeholder="Confirm Password" tabindex="5">
              </div>
            </div>
          </div>


          <hr class="colorgraph">
          <div class="row">
            <div class="col-xs-12 col-md-12">
              <input type="submit" value="Register"
                     @click.prevent="onSubmit"
                     class="btn btn-primary btn-block btn-lg"
                     tabindex="7">
            </div>
          </div>
        </form>
        <p>{{isSubmitted}}</p>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        userData: {
          //firstName: '',
          name: '',
          email: '',
          password: '',
        },
        isSubmitted: false,
        firstName: ''

      }
    },
    methods: {
      onSubmit() {
        this.isSubmitted = true;
        this.$store.dispatch('signup', this.userData)
      }
    }
  }
</script>

<style>

</style>
