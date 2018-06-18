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
                         class="form-control input-lg" placeholder="First Name" tabindex="1" autofocus
                         :class="{'input': true, 'is-invalid': validationErrors.has('first_name') }"
                         v-validate="'required|alpha_spaces'">
                  <div class="invalid-feedback">{{ validationErrors.first('first_name') }}</div>
                </div>
              </div>
              <div class="col-xs-12 col-sm-6">
                <div class="form-group">
                  <label for="last_name">Last Name</label>
                  <input type="text" v-model.lazy="userData.lastName" name="last_name" id="last_name"
                         class="form-control input-lg" placeholder="Last Name" tabindex="2"
                         :class="{'input': true, 'is-invalid': validationErrors.has('last_name') }"
                         v-validate="'required|alpha_spaces'">
                  <div class="invalid-feedback">{{ validationErrors.first('last_name') }}</div>
                </div>
              </div>
            </div>

            <div class="form-group">
              <label for="email">Email Address</label>
              <input type="email" v-model="userData.email" name="email" id="email" class="form-control input-lg"
                     placeholder="Email Address" tabindex="3" v-validate="'required|email'"
                     :class="{'input': true, 'is-invalid': validationErrors.has('email') }">
              <div class="invalid-feedback">{{ validationErrors.first('email') }}</div>
            </div>

            <div class="form-group">
              <label for="password">Password</label>
              <input type="password" v-model="userData.password" name="password" id="password"
                     class="form-control input-lg" placeholder="Password" tabindex="4"
                     v-validate="'required|min:8'"
                     :class="{'input': true, 'is-invalid': validationErrors.has('password') }">
              <div class="invalid-feedback">{{ validationErrors.first('password') }}</div>
            </div>

            <div class="form-group">
              <label for="password_confirmation">Confirm Password</label>
              <input type="password" v-model="userData.password_confirmation" name="password_confirmation"
                     id="password_confirmation" class="form-control input-lg" placeholder="Confirm Password"
                     tabindex="5">
            </div>

            <hr>

            <div class="form-group">
              <button class="btn btn-bold btn-block btn-primary" type="submit" @click.prevent="onSubmit"
                      :disabled="isFormInvalid">
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
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      userData: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        password_confirmation: ''
      },
      isSubmitted: false
      // firstName: ''

    }
  },
  computed: {
    isFormInvalid () {
      return Object.keys(this.fields).some(key => this.fields[key].invalid)
    }
  },
  methods: {
    ...mapActions(['signup']),
    onSubmit () {
      this.isSubmitted = true

      this.$validator.validate().then(result => {
        if (!result) {
          return false
        }
      })

      this.signup(this.userData)
        .then((response) => {
          this.$emit('showAlert', 'Successfully signed up!')
        })
        .catch((error) => {
          this.$emit('showError', 'Unsuccessful sign up. Try again!')
          for (let key in error.response.data) {
            this.$emit('showError', error.response.data[key][0])
          }
          console.log(error.response.data)
        })
    }
  }
}
</script>

<style>
  .signup-bg {
    background-image: url(../assets/img/signup-back.jpg);
  }

  .min-h-fullscreen {
    min-height: calc(100vh - 125px) !important;
  }

  @media screen and (min-width: 768px) {
    .home-fullscreen {
      margin: -36px -30px 5px !important;
    }
  }
</style>
