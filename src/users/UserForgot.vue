<template>
  <div class="min-h-fullscreen bg-img center-vh p-20 forgot-back">
    <div class="container card card-shadowed px-50 py-30" data-overlay="7">

      <form v-if="!show" class="form-recover">
        <h2>Recover your account</h2>
        <div class="form-group">
          <label for="email">Account email:</label>
          <input v-model="email" type="email" id="email" class="form-control">
        </div>
        <input type="submit" @click.prevent="sendEmail" class="btn btn-primary btn-block" value="Submit">
      </form>

      <form v-if="showMsg" class="form-invalid">
        <span>{{msg}}</span>
      </form>

      <form v-if="valid && show" class="form-forgot">
        <h2>Create new password:</h2>
        <div class="form-group">
          <label for="new_pass">New password:</label>
          <input v-model="password" type="password" id="new_pass" class="form-control">
        </div>
        <div class="form-group">
          <label for="confirm">Confirm new password:</label>
          <input type="password" id="confirm" class="form-control">
        </div>

        <input type="submit" @click.prevent="sendPassword" class="btn btn-primary btn-block" value="Submit">
      </form>
      <v-dialog/>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import router from '../router'

export default {
  name: 'UserForgot',
  data () {
    return {
      valid: false,
      show: false,
      email: '',
      password: '',
      showMsg: false,
      msg: '',
      token: this.$route.params.token,
      userId: this.$route.params.id
    }
  },
  created () {
    if (this.token) {
      this.checkToken({id: this.userId, token: this.token})
        .then((response) => {
          this.show = true
          this.valid = true
        }, (error) => {
          this.msg = 'The page you are looking for does not exist'
          this.valid = false
          this.show = true
          this.showMsg = true
        })
    }
  },
  methods: {
    ...mapActions([
      'checkEmail',
      'checkToken',
      'login',
      'changePassword'
    ]),
    sendEmail () {
      this.checkEmail({email: this.email})
        .then((response) => {
          this.$modal.show('dialog', {
            title: 'An email has been sent to you.'
          })
          console.log('OK')
        }, (error) => {
          this.$modal.show('dialog', {
            title: 'Invalid email.'
          })
        })
    },
    sendPassword () {
      this.changePassword({id: this.userId, token: this.token, password: this.password})
        .then((response) => {
          router.replace('/')
          console.log('OK')
        }, (error) => {
          this.$modal.show('dialog', {
            title: 'OOPS!',
            text: 'Something went wrong'
          })
        })
    }
  }
}
</script>

<style>
  @media screen and (min-width: 768px) {
    .forgot-back {
      background: url(../assets/img/forgot-back.jpg) center;
      margin: -36px -30px 5px !important;
    }
  }
</style>
