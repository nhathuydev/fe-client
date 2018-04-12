<template>
  <div class="modal fade" id="modalLogin" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="modalLoginLabel">Đăng Nhập</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body omb_login">
          <form :onsubmit="submit">
            <div class="form-group">
              <label class="col-form-label">Email:</label>
              <input type="email" v-model="email" name="email" v-validate="'required|email'" placeholder="Nhập địa chỉ email" data-vv-delay="500"
                     :class="{'form-control': true, 'is-invalid': errors.has('email') }">
              <i v-show="errors.has('email')" class="fa fa-warning"></i>
              <small v-show="errors.has('email')" class="form-text text-danger">{{ errors.first('email') }}</small>
            </div>

            <div class="form-group">
              <label class="col-form-label">Mật khẩu:</label>
              <input type="password" v-model="password" name="password" v-validate="'required'" placeholder="Nhập địa chỉ mật khẩu"
                     :class="{'form-control': true, 'is-invalid': errors.has('password') }">
              <small v-show="errors.has('password')" class="form-text text-danger">{{ errors.first('password') }}</small>
            </div>
          </form>

          <div class="row omb_row-sm-offset-3 omb_loginOr">
            <div class="col-xs-12 col-sm-6">
              <hr class="omb_hrOr">
              <span class="omb_spanOr">hoặc</span>
            </div>
          </div>

          <div class="row omb_row-sm-offset-3 omb_socialButtons align-content-center">
            <div class="col-xs-4">
              <a href="#" class="btn btn-lg btn-block omb_btn-facebook" @click="authenticate('facebook')">
                <i class="fa fa-facebook visible-xs"></i>
                <span class="hidden-xs">Facebook</span>
              </a>
            </div>
            <div class="col-xs-4">
              <a href="#" class="btn btn-lg btn-block omb_btn-twitter" @click="authenticate('github')">
                <i class="fa fa-twitter visible-xs"></i>
                <span class="hidden-xs">Twitter</span>
              </a>
            </div>
            <div class="col-xs-4">
              <a href="#" class="btn btn-lg btn-block omb_btn-google">
                <i class="fa fa-google-plus visible-xs"></i>
                <span class="hidden-xs">Google+</span>
              </a>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Đóng</button>
          <button type="button" class="btn btn-primary" @click="submit">Xác Nhận</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  import {mapActions} from 'vuex'
  export default {
    name: 'login',
    // head: {
    //   title: {
    //     inner: 'Login'
    //   }
    // },
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
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.login({email: this.email, password: this.password})
              .then((d) => {
                // this.updateUser()
                $('#modalLogin').modal('hide')
              })
          }
        })
      },
      authenticate: async function (provider) {
        this.$auth.authenticate(provider)
          .then(function (data) {
            console.log(data)
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
  }
</script>
