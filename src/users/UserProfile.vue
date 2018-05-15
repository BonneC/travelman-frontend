<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <div class="card">
          <div class=" card-body bg-img text-center py-50">
            <a href="#">
              <img class="avatar avatar-xxl avatar-bordered" src="../assets/logo.png">
            </a>
            <h5 class="mt-2 mb-0">
              <a class="hover-primary " href="#">
                {{ userinfo.first_name + ' ' + userinfo.last_name }}
              </a>
            </h5>
            <span>{{ userinfo.email }}</span>
          </div>
          <ul class="flexbox flex-justified text-center p-20">
            <li class="br-1 border-light">
              <span class="text-muted">Locations visited</span><br>
              <span class="fs-22">18</span>
            </li>
            <li class="br-1 border-light">
              <span class="text-muted">Planned visits</span><br>
              <span class="fs-22">426</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-md-9">

        <div class="media-list media-list-divided media-list-hover">


          <div class="media">
            <a class="avatar avatar-lg status-success" href="#">
              <img src="../assets/logo.png" alt="...">
            </a>

            <div class="media-body">
              <p>
                <a class="hover-primary" href="#"><strong>Random Location</strong></a>
                <small class="sidetitle">Info</small>
              </p>
              <p>Other</p>
            </div>

            <div class="media-right gap-items">
              <a class="media-action lead" href="#" data-provide="tooltip" title="Orders"><i
                class="ti-shopping-cart"></i></a>
              <a class="media-action lead" href="#" data-provide="tooltip" title="Receipts"><i
                class="ti-receipt"></i></a>
              <div class="btn-group">
                <a class="media-action lead" href="#" data-toggle="dropdown"><i
                  class="ti-more-alt rotate-90"></i></a>
                <div class="dropdown-menu dropdown-menu-right">
                  <a class="dropdown-item" href="#"><i class="fa fa-fw fa-user"></i> Profile</a>
                  <a class="dropdown-item" href="#"><i class="fa fa-fw fa-comments"></i> Messages</a>
                  <a class="dropdown-item" href="#"><i class="fa fa-fw fa-phone"></i> Call</a>
                  <div class="dropdown-divider"></div>
                  <a class="dropdown-item" href="#"><i class="fa fa-fw fa-remove"></i> Remove</a>
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
    }
  },
  methods: {
    ...mapActions([
      'fetchUser'
    ])
  }
}
</script>
