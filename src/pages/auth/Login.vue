<template>
  <form class="login-form" @submit.prevent="submit()">
    <h3 v-if="false" class="form-title font-green">Log In</h3>
    <div v-if="false" :class="{alert: true, 'alert-danger': true, 'display-hide': errors.items.length <= 0}">
      <button class="close" data-close="alert"></button>
      <span v-for="error in errors.all()"> {{error}} </span>
    </div>
    <div v-if="false" class="form-group">
      <label for="email">Email address:</label>
      <input type="email" class="form-control" id="email" v-model="email" name="email" v-validate="'required|email'">
    </div>
    <div v-if="false" class="form-group">
      <label for="pwd">Password:</label>
      <input type="password" class="form-control" id="pwd" v-model="password" name="password" v-validate="'required'">
    </div>
    <div v-if="false" class="form-actions">
      <button type="submit" class="btn btn-block green uppercase">Login</button>
    </div>
    <button @click.prevent="authenticate('github')">auth Github</button>
    <button @click.prevent="authenticate('facebook')">auth Facebook</button>
  </form>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'login',
  head: {
    title: {
      inner: 'Login'
    }
  },
  data () {
    return {
      email: null,
      password: null
    }
  },
  methods: {
    ...mapActions([
      'login',
      'updateUser'
    ]),
    submit () {
      this.login({email: this.email, password: this.password})
        .then((d) => {
          console.log(d)
          this.updateUser()
          this.$router.push({name: 'Dashboard'})
        })
    },
    authenticate: async function (provider) {
      this.$auth.authenticate(provider)
      .then(function (data) {
        // console.log(data)
      })
    }
  }
}
</script>
