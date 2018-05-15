<template>
  <div>
    <div class="google-map" id="gmap"></div>
    <!--<modal name="edit-location" @before-open="beforeOpen">-->
    <!--<button>Delete</button>-->
    <!--<p>{{foo}}</p>-->
    <!--</modal>-->
    <v-dialog/>
    <button @click="removeMarkers">Delete</button>
  </div>
</template>

<script>
/* eslint-disable no-undef */
import { mapActions } from 'vuex'
import marker_completed from './assets/marker_completed.png'
import marker_uncompleted from './assets/marker_uncompleted.png'

export default {
  data () {
    return {
      map: null,
      markers: [],
      locations: []
    }
  },
  created () {
    this.fetchLocations()
  },
  computed: {
    locationsprob () {
      return this.$store.getters.getLocations
    }
  },
  watch: {
    locationsprob: function (val, oldVal) {
      this.setMarkers(val)
    }
  },
  mounted () {
    this.map = new google.maps.Map(document.getElementById('gmap'), {
      zoom: 2,
      center: new google.maps.LatLng(-33.91722, 151.23064),
      disableDefaultUI: true,
      styles: [
        {
          'elementType': 'geometry',
          'stylers': [
            {
              'color': '#f5f5f5'
            }
          ]
        },
        {
          'elementType': 'labels',
          'stylers': [
            {
              'visibility': 'off'
            }
          ]
        },
        {
          'elementType': 'labels.icon',
          'stylers': [
            {
              'visibility': 'off'
            }
          ]
        },
        {
          'elementType': 'labels.text.fill',
          'stylers': [
            {
              'color': '#616161'
            }
          ]
        },
        {
          'elementType': 'labels.text.stroke',
          'stylers': [
            {
              'color': '#f5f5f5'
            }
          ]
        },
        {
          'featureType': 'administrative.country',
          'elementType': 'geometry.stroke',
          'stylers': [
            {
              'color': '#9a9a9a'
            },
            {
              'visibility': 'on'
            }
          ]
        },
        {
          'featureType': 'administrative.land_parcel',
          'elementType': 'labels.text.fill',
          'stylers': [
            {
              'color': '#bdbdbd'
            }
          ]
        },
        {
          'featureType': 'administrative.neighborhood',
          'stylers': [
            {
              'visibility': 'off'
            }
          ]
        },
        {
          'featureType': 'poi',
          'elementType': 'geometry',
          'stylers': [
            {
              'color': '#eeeeee'
            }
          ]
        },
        {
          'featureType': 'poi',
          'elementType': 'labels.text.fill',
          'stylers': [
            {
              'color': '#757575'
            }
          ]
        },
        {
          'featureType': 'poi.park',
          'elementType': 'geometry',
          'stylers': [
            {
              'color': '#e5e5e5'
            }
          ]
        },
        {
          'featureType': 'poi.park',
          'elementType': 'labels.text.fill',
          'stylers': [
            {
              'color': '#9e9e9e'
            }
          ]
        },
        {
          'featureType': 'road',
          'stylers': [
            {
              'visibility': 'off'
            }
          ]
        },
        {
          'featureType': 'road',
          'elementType': 'geometry',
          'stylers': [
            {
              'color': '#ffffff'
            }
          ]
        },
        {
          'featureType': 'road.arterial',
          'elementType': 'labels.text.fill',
          'stylers': [
            {
              'color': '#757575'
            }
          ]
        },
        {
          'featureType': 'road.highway',
          'elementType': 'geometry',
          'stylers': [
            {
              'color': '#dadada'
            }
          ]
        },
        {
          'featureType': 'road.highway',
          'elementType': 'labels.text.fill',
          'stylers': [
            {
              'color': '#616161'
            }
          ]
        },
        {
          'featureType': 'road.local',
          'elementType': 'labels.text.fill',
          'stylers': [
            {
              'color': '#9e9e9e'
            }
          ]
        },
        {
          'featureType': 'transit.line',
          'elementType': 'geometry',
          'stylers': [
            {
              'color': '#e5e5e5'
            }
          ]
        },
        {
          'featureType': 'transit.station',
          'elementType': 'geometry',
          'stylers': [
            {
              'color': '#eeeeee'
            }
          ]
        },
        {
          'featureType': 'water',
          'elementType': 'geometry',
          'stylers': [
            {
              'color': '#c9c9c9'
            }
          ]
        },
        {
          'featureType': 'water',
          'elementType': 'labels.text.fill',
          'stylers': [
            {
              'color': '#9e9e9e'
            }
          ]
        }
      ]
    })
  },
  methods: {
    ...mapActions([
      'fetchLocations',
      'deleteLocation',
      'updateLocation'
    ]),
    show (locationData) {
      this.$modal.show('dialog', {
        title: locationData.address,
        text: locationData.lat,
        buttons: [
          {
            title: 'Delete',
            handler: () => {
              if (this.deleteLocation(locationData.id)) {
                this.hide()
              }
            }
          },
          {
            title: 'I\'ve been here',
            handler: () => {
              locationData.completed = 1
              if (this.updateLocation(locationData)) {
                this.hide()
              }
            }
          }
        ]
      })
    },
    hide () {
      this.$modal.hide('dialog')
    },
    beforeOpen (event) {
      console.log(event.params)
    },
    removeMarkers () {
      for (let i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null)
      }
      this.markers = []
    },
    setMarkers (markersInfo) {
      this.removeMarkers()
      markersInfo.forEach((feature) => {
        let marker = null
        let position = new google.maps.LatLng(feature.lat, feature.lng)

        if (feature.completed) {
          marker = new google.maps.Marker({
            position: position,
            map: this.map,
            icon: marker_completed
          })
        } else {
          marker = new google.maps.Marker({
            position: position,
            map: this.map,
            icon: marker_uncompleted
          })
        }
        this.markers.push(marker)

        let that = this

        google.maps.event.addListener(marker, 'click', function () {
          that.show(feature)
        })
      })
    }
    //    geocode (locationData) {
    //      let geocoder = new google.maps.Geocoder
    //      let latlng = {lat: parseFloat(locationData.lat), lng: parseFloat(locationData.lng)}
    //
    //      return geocoder.geocode({'location': latlng}, function (results, status) {
    //        if (status === 'OK') {
    //          if (results[0]) {
    //            return results[0].formatted_address
    //          } else {
    //            return 0
    //          }
    //        } else {
    //          return 0
    //        }
    //      })
    //
    //    }
  }
}
</script>

<style>
  .google-map {
    width: 800px;
    height: 600px;
    margin: 0 auto;
    background: gray;
  }
</style>
