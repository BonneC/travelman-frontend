<template>
  <div class="container card card-shadowed px-50 py-30">

    <form class="form-recover" v-if="!token">
      <h2>Recover your account</h2>
      <div class="form-group">
        <label for="email">Account email:</label>
        <input type="email" id="email" class="form-control">
      </div>
      <input type="submit" class="btn btn-primary btn-block" value="Submit">
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
export default {
  name: 'UserForgot',
  data () {
    return {
      token: this.$route.params.token,
      userId: this.$route.params.id
    }
  },
  methods: {}
}
</script>
