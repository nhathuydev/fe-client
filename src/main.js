// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'
import VeeValidate from 'vee-validate'
import Notification from 'vue-notification'
import VueHead from 'vue-head'
import vSelect from 'vue-select'
import Multiselect from 'vue-multiselect'
import VueAuthenticate from 'vue-authenticate'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store'
import router from './router'
import App from './App'
import {Pagebar, Navbar, Footerr, Sidebar} from '@/components'

Vue.use(Vuex)
Vue.use(VueHead)
Vue.use(VeeValidate)
Vue.use(Notification)
Vue.component('v-select', vSelect)
Vue.component('multiselect', Multiselect)
Vue.component('Pagebar', Pagebar)
Vue.component('Navbar', Navbar)
Vue.component('Footerr', Footerr)
Vue.component('Sidebar', Sidebar)
Vue.use(VueAxios, axios)
Vue.use(VueAuthenticate, {
  providers: {
    github: {
      clientId: '627352253ba0227e584a',
      redirectUri: 'http://tracnghiem.dev/auth/github' // Your client app URL
    },
    facebook: {
      clientId: '1534476963302469',
      redirectUri: 'http://tracnghiem.dev/auth/github' // Your client app URL
    }
  }
})

Vue.config.productionTip = false
Vue.prototype.moment = moment
global.token = JSON.parse(window.localStorage.getItem('user'))

/* eslint-disable no-new */
global.vm = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  store
})
