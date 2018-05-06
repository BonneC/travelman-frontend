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
        <h3>Location {{city}}</h3>
        <div class="row">
          <div class="col-sm-12">
            <label><input type="radio" name="completed"> I've been here</label>
          </div>
          <div class="col-sm-12">
            <label><input type="radio" name="completed"> I want to go here</label>
          </div>
          <div class="col-sm-12">
            <button class="btn btn-primary" type="submit" @click.prevent="onSubmit">
              Sign in
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

export default {
  data () {
    return {
      lat: '',
      long: '',
      city: ''
    }
  },
  mounted () {
    let options = {
      types: ['(cities)']
    }
    let input = this.$refs.autocomplete
    this.autocomplete = new google.maps.places.Autocomplete(input, options)

    this.autocomplete.addListener('place_changed', () => {
      let place = this.autocomplete.getPlace()
      let ac = place.address_components
      this.lat = place.geometry.location.lat()
      this.lon = place.geometry.location.lng()
      this.city = ac[0]['short_name']
      console.log(`The user picked ${this.city} with the coordinates ${this.lat}, ${this.lon}`)
    })
  },

  methods: {
    show () {
      this.$modal.show('save-location')
    },
    hide () {
      this.$modal.hide('save-location')
    },
    onChange () {

    }
  }
}
</script>
