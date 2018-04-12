<template>
  <div class="container">
    <div class="row" style="margin-top: 16px;">
      <!-- Sidebar Widgets Column -->
      <div class="col-md-3">
        <div v-if="!!user" class="card">
          <img class="card-img-top" src="https://scontent.fsgn7-1.fna.fbcdn.net/v/t1.0-9/16114598_784143988400871_799956445756955616_n.jpg?_nc_cat=0&oh=b13f7c7e4187a0da2545b35d3b57604a&oe=5B4490D4" alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">{{user.name}}</h5>
            <p class="card-text">{{user.email}}</p>
          </div>
        </div>

      </div>

      <!-- Blog Entries Column -->
      <div class="col-lg-9">
        <div class="card">
          <div class="card-body">
            <nav>
              <div class="nav nav-tabs" id="nav-tab" role="tablist">
                <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="false">Thông tin</a>
                <a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="true">Lịch sử</a>
                <a class="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Thông báo</a>
              </div>
            </nav>
            <div class="tab-content" id="nav-tabContent" style="margin-top: 24px;">
              <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                <form v-if="!!user">
                  <div class="form-group row">
                    <label class="col-sm-2 col-form-label">Tên</label>
                    <div class="col-sm-10">
                      <input type="email" class="form-control" placeholder="Nhập tên đầy đủ" :readonly="!editMode" v-model="user.name">
                    </div>
                  </div>

                  <div class="form-group row">
                    <label class="col-sm-2 col-form-label">Email</label>
                    <div class="col-sm-10">
                      <input type="email" class="form-control" placeholder="Nhập tên địa chỉ email" :readonly="!editMode" v-model="user.email">
                    </div>
                  </div>

                  <div class="form-group row">
                    <div class="col-sm-2"></div>
                    <div class="col-sm-10">
                      <button v-show="editMode" type="submit" class="btn btn-primary" @click.prevent="">Cập Nhật</button>
                      <button type="submit" class="btn btn-primary" @click.prevent="editMode=!editMode">{{!editMode ? 'Cập Nhật' : 'Huỷ'}}</button>
                    </div>
                  </div>
                </form>
              </div>
              <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                <div class="list-group">
                  <a href="#" class="list-group-item list-group-item-action flex-column align-items-start"
                    v-for="history in histories.data"
                  >
                    <div class="d-flex w-100 justify-content-between">
                      <h5 class="mb-1">{{history.name}}</h5>
                      <!--<small></small>-->
                    </div>
                    <p class="mb-1">Trạng thái: {{getStatusTextByid(history.status)}}</p>
                    <p class="mb-1">Kết quả: {{`${history.countCorrect}/${history.answer_sheet_detail_count}`}}</p>
                    <small>{{moment.unix(history.created_at).fromNow()}}</small>
                  </a>
                </div>

                <nav aria-label="Page navigation example" v-if="histories.total / parseInt(histories.per_page, 10) > 1" style="margin-top: 16px;">
                  <ul class="pagination">

                    <ul class="pagination" style="visibility: visible;">
                      <li class="page-item">
                        <a @click="histories.current_page !== 1 && updatePageHistory(1)"title="First" class="page-link">
                          <span aria-hidden="true">&laquo;</span>
                          <span class="sr-only">First</span>
                        </a>
                      </li>
                      <!--<li class="page-item">-->
                      <!--<a @click="histories.current_page > 1 && updatePageHistory(histories.current_page-1)" title="Prev" class="page-link">-->
                      <!--<span aria-hidden="true">&laquo;</span>-->
                      <!--<span class="sr-only">Previous</span>-->
                      <!--</a>-->
                      <!--</li>-->
                      <li v-for="n in histories.last_page"  :class="['page-item', histories.current_page === n ? 'active' : '']">
                        <a v-if="(histories.current_page - 3 < n && histories.current_page + 3 > n) || n === 1 || n === 2 ||
                n === histories.last_page || n === (histories.last_page - 1)" @click.prevent="updatePageHistory(n)" class="page-link">
                          {{n}}
                        </a>
                      </li>
                      <!--<li class="page-item">-->
                      <!--<a @click="histories.current_page < histories.last_page && updatePageHistory(histories.current_page+1)"  title="Next" class="page-link">-->
                      <!--<span aria-hidden="true">&raquo;</span>-->
                      <!--<span class="sr-only">Next</span>-->
                      <!--</a>-->
                      <!--</li>-->
                      <li class="page-item">
                        <a @click="histories.current_page !== histories.last_page && updatePageHistory(histories.last_page)" title="Last" class="page-link">
                          <span aria-hidden="true">&raquo;</span>
                          <span class="sr-only">Last</span>
                        </a>
                      </li>
                    </ul>
                  </ul>
                </nav>
              </div>
              <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">...</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- /.row -->

  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import {getASStatusTextByid} from '@/helpers'
  import {Pagebar} from '@/components'
  export default {
    name: 'profile',
    data () {
      return {
        user: null,
        editMode: false
      }
    },
    components: {
      Pagebar
    },
    computed: {
      ...mapGetters(['info', 'histories'])
    },
    mounted: function () {
      if (this.info) {
        this.user = {...this.info}
      }
    },
    created: function () {
      this.getHistory()
      getASStatusTextByid() // fuck
    },
    methods: {
      getStatusTextByid: getASStatusTextByid,
      ...mapActions(['getHistory', 'updatePageHistory'])

    }
  }
</script>
