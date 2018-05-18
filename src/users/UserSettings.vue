<template>
  <div>
    <form class="form-horizontal">
      <div class="form-group">
        <label class="col-sm-2 control-label" for="first_name">First Name</label>
        <div class="col-sm-10">
          <input v-model="userInfo.first_name" class="form-control" name="disabledInput" id="first_name" type="text"
                 disabled>
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label" for="last_name">Last Name</label>
        <div class="col-sm-10">
          <input v-model="userInfo.last_name" class="form-control" name="disabledInput" id="last_name" type="text"
                 disabled>
        </div>
      </div>
      <div class="form-group">
        <label class="col-sm-2 control-label" for="email">Email</label>
        <div class="col-sm-10">
          <input v-model="userInfo.email" class="form-control" name="disabledInput" id="email" type="text" disabled>
        </div>
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
      edit: false
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
      document.getElementsByName('disabledInput').forEach((element) => {
        element.disabled = true
      })
    },
    saveUser () {
      this.updateUser(this.userInfo)
    }

  }
}
</script>

<style>

</style>
