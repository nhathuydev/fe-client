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
import {Pagebar, Navbar, Footerr, Sidebar, TagWidget, SearchWidget} from '@/components'

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
Vue.component('TagWidget', TagWidget)
Vue.component('SearchWidget', SearchWidget)
Vue.use(VueAxios, axios)
Vue.use(VueAuthenticate, {
  providers: {
    tokenName: 'access_token',
    baseUrl: 'http://localhost:4000',
    storageType: 'cookieStorage',
    github: {
      clientId: '627352253ba0227e584a',
      redirectUri: 'http://localhost:8080/auth/github' // Your client app URL
    },
    facebook: {
      clientId: '1534476963302469',
      redirectUri: 'http://localhost:8089/login?driver=facebook' // Your client app URL
    }
  }
})
// Vue.use(VueSocketio, 'http://localhost:3000')

Vue.config.productionTip = false
moment.locale('vi')
Vue.prototype.moment = moment

/* eslint-disable no-new */
global.vm = new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  store
})
