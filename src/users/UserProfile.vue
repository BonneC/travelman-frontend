<template>
  <div class="container">
    <div class="row">
      <div class="card">
        <div class="card-body">
          <div class="col-md-3">
            <div class="card">
              <div class=" card-body bg-img text-center py-50">
                <img class="avatar avatar-xxl avatar-bordered" src="../assets/logo.png">

                <h5 class="mt-2 mb-0">
                  <span class="hover-primary ">
                    {{ userinfo.first_name + ' ' + userinfo.last_name }}
                  </span>
                </h5>
                <span>{{ userinfo.email }}</span>
              </div>
              <ul class="flexbox flex-justified text-center p-20">
                <li class="br-1 border-light">
                  <span class="text-muted">Locations visited</span><br>
                  <span class="fs-22">{{ visitedCount }}</span>
                </li>
                <li class="br-1 border-light">
                  <span class="text-muted">Planned visits</span><br>
                  <span class="fs-22">{{ plannedCount }}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-md-9">
            <div class="card left-border">
              <h4 class="card-title">Locations Log</h4>

              <div class="card-body">
                <div class="media-list media-list-divided media-list-hover">
                  <div class="media" v-for="(location, keyIndex) in locations" v-bind:key="keyIndex">
                    <a class="avatar avatar-lg" href="#">
                      <img src="../assets/marker_completed.png" v-if="location.completed" alt="...">
                      <img src="../assets/marker_uncompleted.png" v-if="!location.completed" alt="...">
                    </a>

                    <div class="media-body">
                      <p>
                        <a class="hover-primary" href="#"><strong>{{ location.address }}</strong></a>
                        <small class="sidetitle">{{ location.created_at }}</small>
                      </p>
                      <p>{{ location.completed ? 'I\'ve been here' : 'I plan to visit' }}</p>
                    </div>

                  </div>
                </div>

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
  mounted () {

  },
  computed: {
    userinfo () {
      return this.$store.getters.getUserInfo
    },
    locations () {
      return this.$store.getters.getLocations
    },
    visitedCount () {
      return this.$store.getters.getVisitedCount
    },
    plannedCount () {
      return this.$store.getters.getPlannedCount
    }
  },
  methods: {
    ...mapActions([
      'fetchUser',
      'fetchLocations',
      'fetchVisitedCount',
      'fetchPlannedCount'
    ])
  },
  created () {
    this.fetchLocations()
    this.fetchVisitedCount()
    this.fetchPlannedCount()
  }
}
</script>

<style>
  .left-border {
    border-left: 1px solid #ebebeb;
    padding-left: 20px;
    margin-top: 40px;
  }
</style>
