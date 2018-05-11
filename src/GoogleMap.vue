<template>
  <div>
    <div class="google-map" id="gmap"></div>
    <modal name="edit-location" @before-open="beforeOpen">Hello</modal>
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
      markersInfo: [{
        position: new google.maps.LatLng(-33.91721, 151.22630),
        title: 'prvo',
        completed: 1
      }, {
        position: new google.maps.LatLng(-33.91539, 151.22820),
        title: 'vtoro',
        completed: 0
      }, {
        position: new google.maps.LatLng(-33.91747, 151.22912),
        title: 'treto',
        completed: 1
      }, {
        position: new google.maps.LatLng(-33.91910, 151.22907),
        title: 'cetvrto',
        completed: 0
      }],
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
      console.log('%s', val)
      this.setMarkers(val)
    }
  },
  mounted () {
    this.map = new google.maps.Map(document.getElementById('gmap'), {
      zoom: 16,
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
    //this.fetchLocations()
    // MARKERS
    console.log(this.locationsprob)
    this.markersInfo.forEach((feature) => {
      // kontent za popup
      // let title = feature.title;
      //         let contentString = title + '<button>Edit</button>' + '<button>Delete</button>';

      let marker = null

      if (feature.completed) {
        marker = new google.maps.Marker({
          position: feature.position,
          map: this.map
          // icon: this.marker_completed
        })
        // this.markers.push(marker);
      } else {
        marker = new google.maps.Marker({
          position: feature.position,
          map: this.map
          // icon: this.marker_uncompleted
        })
      }
      this.markers.push(marker)

      let that = this

      google.maps.event.addListener(marker, 'click', function () {
        that.show()
      })
    })
  },
  methods: {
    ...mapActions([
      'fetchLocations'
    ]),
    show () {
      this.$modal.show('edit-location')
    },
    hide () {
      this.$modal.hide('edit-location')
    },
    beforeOpen (event) {
      console.log(event)
    },
    setMarkers (markerInfo) {
      markerInfo.forEach((feature) => {
        // kontent za popup
        // let title = feature.title;
        //         let contentString = title + '<button>Edit</button>' + '<button>Delete</button>';

        let marker = null
        console.log(feature.completed)
        let position = new google.maps.LatLng(feature.lat, feature.lng)

        if (feature.completed) {
          marker = new google.maps.Marker({
            position: position,
            map: this.map,
            icon: marker_completed
          })
          // this.markers.push(marker);
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
          that.show()
        })
      })
    }
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
