<template>
  <div>
    <input id="searchTextField"
           ref="autocomplete"
           type="text"
           size="50"
           placeholder="Enter a location"
           autocomplete="on"
           @input="onChange"/>
    <modal name="save-location">
      <form class="form container-fluid">
        <h3>Location {{address}}</h3>
        <div class="row">
          <div class="col-sm-12">
            <label><input type="radio" name="completed" v-model="completed" value="1"> I've been here</label>
          </div>
          <div class="col-sm-12">
            <label><input type="radio" name="completed" v-model="completed" value="0" checked="checked">
              I want to go here</label>
          </div>
          <span>Picked: {{ completed }}</span>
          <div class="col-sm-12">
            <button class="btn btn-primary" type="submit" @click.prevent="onSubmit">
              Save Location
            </button>
          </div>
        </div>
      </form>
    </modal>
    <button @click="show">New</button>
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
      completed: ''
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
    })
  },

  methods: {
    ...mapActions([
      'addLocation'
    ]),
    show () {
      this.$modal.show('save-location')
    },
    hide () {
      this.$modal.hide('save-location')
    },
    onChange () {

    },
    onSubmit () {
      if (this.lat && this.lng && this.address) {
        let location = {
          address: String(this.address),
          lat: String(this.lat),
          lng: String(this.lng),
          completed: this.completed
        }
        if (this.addLocation(location)) {
          this.hide()
          this.completed = 0
        }
      }
      else {
        alert('Invalid location')
      }
    }
  }
}
</script>
