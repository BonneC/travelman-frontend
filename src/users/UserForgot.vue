<template>
  <div class="container card card-shadowed px-50 py-30">

    <form class="form-recover" v-if="!token">
      <h2>Recover your account</h2>
      <div class="form-group">
        <label for="email">Account email:</label>
        <input type="email" id="email" v-model="email" class="form-control">
      </div>
      <input type="submit" @click.prevent="sendEmail" class="btn btn-primary btn-block" value="Submit">
      <span v-if="showMsg">{{msg}}</span>
    </form>

    <form class="form-forgot" v-if="token">
      <h2>Create new password:</h2>
      <div class="form-group">
        <label for="new_pass">New password:</label>
        <input type="password" id="new_pass" class="form-control">
      </div>
      <div class="form-group">
        <label for="confirm">Confirm new password:</label>
        <input type="password" id="confirm" class="form-control">
      </div>

      <input type="submit" class="btn btn-primary btn-block" value="Submit">
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'UserForgot',
  data () {
    return {
      email: '',
      showMsg: false,
      msg:'',
      token: this.$route.params.token,
      userId: this.$route.params.id
    }
  },
  methods: {
    ...mapActions([
      'checkEmail'
    ]),
    sendEmail () {
      this.checkEmail({email: this.email})
        .then((response) => {
          this.msg = 'An email has been sent to you'
          console.log('OK')
        }, (error) => {
          this.msg = 'Invalid email'
        })
      this.showMsg = true
    }
  }
}
</script>
