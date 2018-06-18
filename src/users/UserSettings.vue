<template>
  <div class="container">
    <div class="row">
      <div class="card col-sm-12">
        <div class="card-body">
          <div class="col-md-3">
            <div class="card">
              <div class=" card-body bg-img text-center py-50">
                <div class="avatar-holder">
                  <div class="avatar avatar-xxl avatar-bordered">
                    <img v-bind:src="avatar" alt="">
                  </div>
                </div>

                <h5 class="mt-2 mb-0">
                  <span class="hover-primary">
                    {{ userInfo.first_name + ' ' + userInfo.last_name }}
                  </span>
                </h5>
                <span>{{ userInfo.email }}</span>
              </div>
            </div>
          </div>
          <div class="col-md-9">
            <div class="card left-border">

              <h4 class="card-title">Edit Account</h4>

              <div class="card-body">

                <form class="form-horizontal">
                  <div v-if="!change_pass" class="form-group">
                    <label class="col-sm-2 control-label" for="first_name">First Name</label>
                    <div class="col-sm-10">
                      <input v-model="first_name" class="form-control" name="disabledInput" id="first_name"
                             type="text"
                             disabled>
                    </div>
                  </div>
                  <div v-if="!change_pass" class="form-group">
                    <label class="col-sm-2 control-label" for="last_name">Last Name</label>
                    <div class="col-sm-10">
                      <input v-model="last_name" class="form-control" name="disabledInput" id="last_name"
                             type="text"
                             disabled>
                    </div>
                  </div>
                  <div v-if="!change_pass" class="form-group">
                    <label class="col-sm-2 control-label" for="email">Email</label>
                    <div class="col-sm-10">
                      <input v-model="email" class="form-control" name="disabledInput" id="email" type="text" disabled>
                    </div>
                  </div>
                  <div v-if="change_pass">
                    <div class="form-group">
                      <label class="col-sm-2 control-label">Old password</label>
                      <div class="col-sm-10">
                        <input v-model="old_password" class="form-control" name="changePass" id="old_pass" type="text">
                      </div>
                    </div>
                    <div class="form-group">
                      <label class="col-sm-2 control-label">New password</label>
                      <div class="col-sm-3">
                        <input v-model="new_password" class="form-control" name="changePass" id="new_pass" type="text">
                      </div>
                      <label class="col-sm-3 control-label">Confirm password</label>
                      <div class="col-sm-4">
                        <input v-model="conf_new_password" class="form-control" name="changePass" id="conf_new_pass"
                               type="text">
                      </div>
                    </div>
                  </div>
                  <div v-if="edit" class="form-group">
                    <div class="col-sm-offset-2 col-sm-10">
                      <button v-if="!change_pass" @click.prevent="change_pass = true" class="btn btn-secondary">
                        Change password
                      </button>
                    </div>
                  </div>
                  <hr>
                  <div v-if="edit" class="form-group">
                    <button @click.prevent="disableEdit" class="btn btn-w-md btn-warning btn-label">
                      <label><i class="ti-close"></i></label>
                      Cancel
                    </button>
                    <button @click.prevent="saveUser" class="btn btn-w-md btn-primary btn-label">
                      <label><i class="ti-check"></i></label>
                      Save
                    </button>
                  </div>
                  <div v-else class="form-group">
                    <button @click.prevent="enableEdit" class="btn btn-w-md btn-primary btn-label">
                      <label><i class="ti-pencil"></i></label>
                      Edit
                    </button>
                    <router-link class="btn btn-w-md btn-info btn-label" to="/user">
                      <label><i class="ti-back-left"></i></label>
                      Back
                    </router-link>
                  </div>

                </form>

              </div>
            </div>

          </div>

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
      edit: false,
      change_pass: false,
      first_name: '',
      last_name: '',
      email: '',
      old_password: '',
      new_password: '',
      conf_new_password: ''
    }
  },
  computed: {
    userInfo () {
      return this.$store.getters.getUserInfo
    },
    avatar () {
      if (this.showAvatarEdit) {
        console.log('')
      }
      let d = new Date()
      return 'http://localhost:8000/' + this.userInfo.id + '/avatar?' + d.getTime()
    }
  },
  mounted () {
    this.first_name = this.userInfo.first_name
    this.last_name = this.userInfo.last_name
    this.email = this.userInfo.email
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
      let userData = null

      if (this.change_pass) {
        if (this.new_password !== this.conf_new_password) {
          alert('passwords dont mech')
        } else {
          userData = {
            change: 1,
            old_password: this.old_password,
            new_password: this.new_password
          }
        }
      } else {
        userData = {
          change: 0,
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email

        }
        this.disableEdit()
      }
      this.updateUser(userData)
        .then((response) => {
          this.$emit('showAlert', 'Saved changes')
        })
        .catch(function (error) {
          this.$emit('showError', 'Unsuccessful. Try again!')
          console.error(error)
        })
    },
    changePass () {

    }
  }
}
</script>

<style>
  @media screen and (min-width: 992px) {
    .left-border {
      border-left: 1px solid #ebebeb !important;
      padding-left: 20px;
      margin-top: 40px;
    }
  }

  .avatar-holder {
    position: relative;
  }

  .avatar {
    overflow: hidden;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }

</style>
