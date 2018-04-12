<template>
  <div>
    <div class="container">

      <div class="row">

        <!-- Blog Entries Column -->
        <div class="col-md-8">

          <h1 class="my-4">Nhãn
            <small>danh sách</small>
          </h1>

          <router-link role="button" class="btn-lg badge badge-primary" v-for="tag in tags.data" :key="tag.id" :to="{name: 'TagDetail', params: {id: tag.slug}}"
                       :style="{marginRight: '4px', 'margin-bottom': '4px', backgroundColor: '#' + tag.color}"
          >
            {{tag.name}} <span class="badge badge-light">4</span>
          </router-link>

          <!-- Pagination -->
          <nav aria-label="Page navigation example" v-if="tags.total / parseInt(tags.per_page, 10) > 1" style="margin-top: 16px;">
            <ul class="pagination">

              <ul class="pagination" style="visibility: visible;">
                <li class="page-item">
                  <a @click="tags.current_page !== 1 && updatePageTag(1)"title="First" class="page-link">
                    <span aria-hidden="true">&laquo;</span>
                    <span class="sr-only">First</span>
                  </a>
                </li>
                <!--<li class="page-item">-->
                  <!--<a @click="tags.current_page > 1 && updatePageTag(tags.current_page-1)" title="Prev" class="page-link">-->
                    <!--<span aria-hidden="true">&laquo;</span>-->
                    <!--<span class="sr-only">Previous</span>-->
                  <!--</a>-->
                <!--</li>-->
                <li v-for="n in tags.last_page"  :class="['page-item', tags.current_page === n ? 'active' : '']">
                  <a v-if="(tags.current_page - 3 < n && tags.current_page + 3 > n) || n === 1 || n === 2 ||
                n === tags.last_page || n === (tags.last_page - 1)" @click.prevent="updatePageTag(n)" class="page-link">
                    {{n}}
                  </a>
                </li>
                <!--<li class="page-item">-->
                  <!--<a @click="tags.current_page < tags.last_page && updatePageTag(tags.current_page+1)"  title="Next" class="page-link">-->
                    <!--<span aria-hidden="true">&raquo;</span>-->
                    <!--<span class="sr-only">Next</span>-->
                  <!--</a>-->
                <!--</li>-->
                <li class="page-item">
                  <a @click="tags.current_page !== tags.last_page && updatePageTag(tags.last_page)" title="Last" class="page-link">
                    <span aria-hidden="true">&raquo;</span>
                    <span class="sr-only">Last</span>
                  </a>
                </li>
              </ul>
            </ul>
          </nav>

        </div>

        <!-- Sidebar Widgets Column -->
        <div class="col-md-4">

          <!-- Search Widget -->
          <SearchWidget/>

        </div>

      </div>
      <!-- /.row -->

    </div>
  </div>
</template>
<script>
  import {mapActions, mapGetters} from 'vuex'
  export default {
    data () {
      return {
        pageSizeOptions: [
          5,
          10,
          20,
          50,
          100
        ]
      }
    },
    created: function () {
      // if (this.tags.current_page < 0) {
      //   this.updatePageTag(1)
      // }
      this.updatePageTag(1)
    },
    computed: mapGetters([
      'tags'
    ]),
    methods: {
      ...mapActions([
        'getTag',
        'updateSizeTag',
        'updatePageTag'
      ]),
      onChangeSize (event) {
        alert(222)
        this.updateSizeTag(event.srcElement.value)
      },
      navigateTagDetail () {
        alert(333)
      }
    }
  }
</script>
