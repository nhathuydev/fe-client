<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <div class="container">
      <router-link class="navbar-brand" :to="{name: 'Dashboard'}">
        <img src="http://placehold.it/300x60?text=Logo" width="150" height="30" alt="">
      </router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item active">
            <a v-if="!(!!this.user.info)" class="nav-link" href="#" data-toggle="modal" data-target="#modalLogin">Đăng Nhập
              <span class="sr-only">(current)</span>
            </a>
          </li>
          <li v-if="!!this.user.info" class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownBlog" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {{this.user.info.name}}
            </a>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownBlog">
              <router-link class="dropdown-item" :to="{name: 'Profile'}">Cá nhân</router-link>
              <router-link class="dropdown-item" :to="{name: 'Profile'}">Thiết lập</router-link>
              <div class="dropdown-divider"></div>
              <!--<router-link class="dropdown-item" :to="{name: 'Profile'}"></router-link>-->
              <a class="dropdown-item" @click="logout()">Đăng Xuất</a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
  import {mapState, mapActions} from 'vuex'
  export default {
    data () {
      return {
        aaa: ''
      }
    },
    created () {
      console.log(this.user)
    },
    computed: {
      ...mapState({
        user: state => state.user
      })
    },
    methods: {
      ...mapActions([
        'logout'
      ])
    }
  }
</script>
