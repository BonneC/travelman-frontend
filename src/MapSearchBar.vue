<template>
  <div>
    <div class="search-locations form-type-round">
      <div class="input-group">

        <input id="searchTextField"
               ref="autocomplete"
               class="form-control form-type-roundinput"
               type="text"
               size="50"
               placeholder="Enter a location"
               autocomplete="on"
               @input="onChange"/>

        <span class="input-group-append">
          <button @click="show" class="btn btn-primary">New</button>
        </span>

      </div>
    </div>

    <modal name="save-location">
      <div class="col-md-12">
        <div class="card">
          <h4 class="card-title">Location: <strong>{{address}}</strong></h4>

          <div class="card-body">
            <form class="form container-fluid">
              <div class="col-md-12">
                <div class="col-sm-12">
                  <label><input type="radio" name="completed" v-model="completed" value="0" checked="checked">
                    I want to go here</label>
                </div>
                <div class="col-sm-12">
                  <label><input type="radio" name="completed" v-model="completed" value="1"> I've been here</label>
                </div>
                <hr>
                <div class="col-sm-12">
                </div>
              </div>
            </form>
          </div>
          <footer class="card-footer">
            <button class="btn btn-primary" type="submit" @click.prevent="onSubmit">
              Save Location
            </button>
          </footer>
        </div>
      </div>

    </modal>

    <div class="alert alert-warning alert-dismissible fade invalid-location"
         :class="{show: invalidLocation}" role="alert">
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
      <strong>Invalid location!</strong> Please select valid location from the autocomplete.
    </div>

  </div>
</template>

<script>
/* eslint-disable no-undef */
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      lat: '',
      lng: '',
      address: '',
      completed: '',

      inputLocation: '',
      invalidLocation: false
    }
  },
  mounted () {
    this.completed = 0
    let options = {
      types: ['(cities)']
    }
    let input = this.$refs.autocomplete
    this.autocomplete = new google.maps.places.Autocomplete(input, options)

    this.autocomplete.addListener('place_changed', () => {
      let place = this.autocomplete.getPlace()
      let ac = place.address_components

      this.lat = place.geometry.location.lat()
      this.lng = place.geometry.location.lng()
      this.address = ac[0]['short_name']
      this.inputLocation = input.value
    })
  },

  methods: {
    ...mapActions([
      'addLocation'
    ]),
    show () {
      if (this.lat && this.lng && this.address) {
        this.$modal.show('save-location')
      } else {
        this.invalidLocation = true
        let that = this
        setTimeout(function () {
          that.invalidLocation = false
        }, 5000)
      }
    },
    hide () {
      this.$modal.hide('save-location')
    },
    onChange () {
      let input = this.$refs.autocomplete
      if (this.inputLocation !== input.value) {
        this.inputLocation = ''
        this.lat = ''
        this.lng = ''
        this.address = ''
      }
    },
    onSubmit (event) {
      if (this.lat && this.lng && this.address) {
        let location = {
          address: String(this.address),
          lat: String(this.lat),
          lng: String(this.lng),
          completed: this.completed
        }

        this.hide()

        this.addLocation(location)
          .then((response) => {
            this.completed = 0

            this.$emit('showAlert', 'Succesffuly added ' + location.address)

            this.$refs.autocomplete.value = ''
          })
          .catch((error) => {
            this.$emit('showError', 'Something went wrong')
            console.log(error.response.data)
          })
      }
    }
  }
}
</script>

<style>
  #searchTextField {
    border: 2px solid #33cabb;
    padding: 16px;
  }
</style>
