<template>
  <div>
    <form class="form-horizontal">
      <div v-if="!change_pass" class="form-group">
        <label class="col-sm-2 control-label">First Name</label>
        <div class="col-sm-10">
          <input v-model="userInfo.first_name" class="form-control" name="disabledInput" id="first_name" type="text"
                 disabled>
        </div>
      </div>
      <div v-if="!change_pass" class="form-group">
        <label class="col-sm-2 control-label">Last Name</label>
        <div class="col-sm-10">
          <input v-model="userInfo.last_name" class="form-control" name="disabledInput" id="last_name" type="text"
                 disabled>
        </div>
      </div>
      <div v-if="!change_pass" class="form-group">
        <label class="col-sm-2 control-label">Email</label>
        <div class="col-sm-10">
          <input v-model="userInfo.email" class="form-control" name="disabledInput" id="email" type="text" disabled>
        </div>
      </div>
      <div v-if="change_pass">
        <div class="form-group">
          <label class="col-sm-2 control-label">Old password</label>
          <div class="col-sm-10">
            <input v-model="userInfo.old_password" class="form-control" name="changePass" id="old_pass" type="text">
          </div>
        </div>
        <div class="form-group">
          <label class="col-sm-2 control-label">New password</label>
          <div class="col-sm-3">
            <input v-model="userInfo.new_password" class="form-control" name="changePass" id="new_pass" type="text">
          </div>
          <label class="col-sm-2 control-label">Confirm password</label>
          <div class="col-sm-3">
            <input v-model="userInfo.conf_new_password" class="form-control" name="changePass" id="conf_new_pass"
                   type="text">
          </div>
        </div>
      </div>
      <div v-if="edit" class="form-group">
        <button v-if="!change_pass" @click.prevent="change_pass = true">Change password</button>
      </div>
      <div v-if="edit" class="form-group">
        <button @click.prevent="disableEdit">Cancel</button>
        <button @click.prevent="saveUser">Save</button>
      </div>
      <div v-else class="form-group">
        <button @click.prevent="enableEdit">Edit</button>
      </div>

    </form>

  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      edit: false,
      change_pass: false,
      old_password: '',
      new_password: '',
      conf_new_password: ''
    }
  },
  computed: {
    userInfo () {
      return this.$store.getters.getUserInfo
    }
  },
  mounted () {

  },
  methods: {
    ...mapActions([
      'fetchUser',
      'updateUser'
    ]),
    enableEdit () {
      this.edit = true
      document.getElementsByName('disabledInput').forEach((element) => {
        element.disabled = false
      })
    },
    disableEdit () {
      this.edit = false
      this.change_pass = false
      document.getElementsByName('disabledInput').forEach((element) => {
        element.disabled = true
      })
    },
    saveUser () {
      if (this.change_pass) {
        if (this.new_password !== this.conf_new_password) {
          alert('passwords dont mech')
        }
      }
      else {
        this.updateUser(this.userInfo)
      }
    },
    changePass () {

    }
  }
}
</script>

<style>

</style>
