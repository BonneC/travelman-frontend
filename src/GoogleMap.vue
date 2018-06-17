<template>
  <div class="main-map-container">
    <div class="google-map" id="gmap"></div>
    <!--<modal name="edit-location" @before-open="beforeOpen">-->
    <!--<button>Delete</button>-->
    <!--<p>{{foo}}</p>-->
    <!--</modal>-->
    <v-dialog/>
  </div>
</template>

<script>
/* eslint-disable no-undef */
import { mapActions } from 'vuex'
import markerCompleted from './assets/marker_completed.png'
import markerUncompleted from './assets/marker_uncompleted.png'

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

    window.onresize = this.changeMapHeight
  },
  computed: {
    locationsprob () {
      return this.$store.getters.getLocations
    }
  },
  watch: {
    locationsprob: function (val, oldVal) {
      this.setMarkers(val)

      if (val.length > oldVal.length) {
        let lastMarker = val[val.length - 1]
        this.map.panTo(new google.maps.LatLng(lastMarker.lat, lastMarker.lng))
      }
    }
  },
  mounted () {
    this.map = new google.maps.Map(document.getElementById('gmap'), {
      zoom: 2.5,
      maxZoom: 10,
      minZoom: 2.5,
      center: new google.maps.LatLng(32.0939, 7.202883),
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

    this.changeMapHeight()

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
        buttons: [
          {
            title: 'I\'ve been here',
            handler: () => {
              locationData.completed = 1
              if (this.updateLocation(locationData)) {
                this.hide()
              }
            }
          },
          {
            title: 'Delete',
            handler: () => {
              if (this.deleteLocation(locationData.id)) {
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
            icon: markerCompleted
          })
        } else {
          marker = new google.maps.Marker({
            position: position,
            map: this.map,
            icon: markerUncompleted
          })
        }
        this.markers.push(marker)

        let that = this

        google.maps.event.addListener(marker, 'click', function () {
          that.show(feature)
          that.map.panTo(position)
        })
      })
    },
    changeMapHeight () {
      let mapDom = document.getElementById('gmap')
      mapDom.style.height = (window.innerHeight - 120) + 'px'
    }
  }
}
</script>

<style>
  @media screen and (min-width: 768px) {
    .main-map-container {
      margin: -40px -30px 1px;
    }
  }

  .google-map {
    width: 100%;
    height: 800px;
    margin: 0 auto;
    background: gray;
  }

</style>
