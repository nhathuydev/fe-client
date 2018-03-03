<template>
  <!--<div class="page-header navbar navbar-fixed-top">-->
    <!--&lt;!&ndash; BEGIN HEADER INNER &ndash;&gt;-->
    <!--<div class="page-header-inner ">-->
      <!--&lt;!&ndash; BEGIN LOGO &ndash;&gt;-->
      <!--<div class="page-logo">-->
        <!--<div class="menu-toggler sidebar-toggler"></div>-->
      <!--</div>-->
      <!--&lt;!&ndash; BEGIN RESPONSIVE MENU TOGGLER &ndash;&gt;-->
      <!--<a href="javascript:;" class="menu-toggler responsive-toggler" data-toggle="collapse" data-target=".navbar-collapse"> </a>-->
      <!--&lt;!&ndash; END RESPONSIVE MENU TOGGLER &ndash;&gt;-->
      <!--&lt;!&ndash; BEGIN TOP NAVIGATION MENU &ndash;&gt;-->
      <!--<div class="top-menu">-->
        <!--<ul class="nav navbar-nav pull-right">-->
          <!--<li class="dropdown dropdown-user">-->
            <!--<a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">-->
              <!--&lt;!&ndash;<img alt="" class="img-circle" src="../static/layouts/layout/img/avatar3_small.jpg" />&ndash;&gt;-->
              <!--<span class="username username-hide-on-mobile"> {{user.info.name}} </span>-->
              <!--<i class="fa fa-angle-down"></i>-->
            <!--</a>-->
            <!--<ul class="dropdown-menu dropdown-menu-default">-->
              <!--<li>-->
                <!--<router-link :to="{name: 'Profile'}">-->
                  <!--<i class="icon-user"></i> My Profile </router-link>-->
              <!--</li>-->
              <!--<li class="divider"> </li>-->
              <!--<li>-->
                <!--<a>-->
                  <!--<i class="icon-lock"></i> Lock Screen </a>-->
              <!--</li>-->
              <!--<li>-->
                <!--<router-link @click.native="logout()" :to="{name: 'Login'}">-->
                  <!--<i class="icon-key"></i> Log Out-->
                <!--</router-link>-->
              <!--</li>-->
            <!--</ul>-->
          <!--</li>-->
        <!--</ul>-->
      <!--</div>-->
      <!--&lt;!&ndash; END TOP NAVIGATION MENU &ndash;&gt;-->
    <!--</div>-->
    <!--&lt;!&ndash; END HEADER INNER &ndash;&gt;-->
  <!--</div>-->
</template>
<script>
  import {mapState, mapActions} from 'vuex'
  export default {
    data () {
      return {
        aaa: ''
      }
    },
    computed: {
      ...mapState({
        user: state => state.user
      }),
      ...mapActions([
        'logout'
      ])
    }
  }
</script>
