<template>
  <div class="container">
    <div class="row">
      <div class="card">
        <div class="card-body">
          <div class="col-md-3">
            <div class="card">
              <div class=" card-body bg-img text-center py-50">
                <div class="avatar-holder">
                  <div class="avatar-hover" @click="editAvatar()"><i class="fa fa-edit"></i><span>Edit</span></div>
                  <div class="avatar avatar-xxl avatar-bordered" v-bind:style="avatarStyle"></div>
                </div>

                <h5 class="mt-2 mb-0">
                  <span class="hover-primary">
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
                  <div class="media" v-if="!locations.length" v-bind:key="keyIndex">
                    <a class="avatar avatar-lg" href="#">
                      <img src="../assets/404.jpg" alt="...">
                    </a>

                    <div class="media-body">
                      <p>
                        <a class="hover-primary" href="#"><strong>No Locations Saved</strong></a>
                        <small class="sidetitle">Not found</small>
                      </p>
                      <p>Try again or add new locations</p>
                    </div>

                  </div>
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

    <div class="row edit-avatar" v-if="showAvatarEdit" @click="showAvatarEdit = false">
      <div class="col-md-8 col-lg-6 col-md-offset-3 col-sm-offset-2">
        <div class="card" v-on:click.stop>
          <header class="card-header">
            <h4 class="card-title">Edit Avatar Picture</h4>
          </header>

          <div class="card-body">
            <input type="file" id="avatar" name="avatar">
          </div>

          <footer class="card-footer">
            <button class="btn btn-primary" @click="saveAvatar()">Submit</button>
            <button class="btn btn-secondary" @click="showAvatarEdit = false">Cancel</button>
          </footer>
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
      showAvatarEdit: false
    }
  },
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
    },
    avatarStyle () {
      return {
        background: 'url(http://localhost:8000/' + this.userinfo.id + '/avatar) no-repeat center'
      }
    }
  },
  methods: {
    ...mapActions([
      'fetchUser',
      'fetchLocations',
      'fetchVisitedCount',
      'fetchPlannedCount',
      'updateAvatar'
    ]),
    editAvatar () {
      this.showAvatarEdit = true
    },
    hideEditAvatar () {
      this.showAvatarEdit = false
    },
    saveAvatar () {
      let avatarFile = document.getElementById('avatar').files[0]
      let avatarForm = new FormData()
      avatarForm.append('avatar', avatarFile, avatarFile.name)

      this.updateAvatar(avatarForm)
        .then((response) => {
          console.log('success')
          this.hideEditAvatar()
          this.$forceUpdate()
        })
        .catch((error) => {
          console.log('error')
        })
    }
  },
  created () {
    this.fetchLocations()
    this.fetchVisitedCount()
    this.fetchPlannedCount()
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

  .avatar-hover {
    position: absolute;
    left: 37%;
    z-index: 9;
    top: 36%;
    color: #686868;
    background: #fffc;
    padding: 3px 8px;
    cursor: pointer;
    font-size: 16px;
    display: none;
  }

  .avatar-holder:hover .avatar-hover {
    display: inline-block;
  }

  .avatar {
    background-size: 96px !important;
  }

  .edit-avatar {
    background: rgba(128, 128, 128, 0.83);
    position: fixed;
    top: 0;
    left: 15px;
    width: 100%;
    height: 100%;
    padding-top: 100px;
  }

</style>
