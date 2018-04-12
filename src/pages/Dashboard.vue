<template>
  <div class="container">

    <div class="row">

      <!-- Blog Entries Column -->
      <div class="col-md-8">

        <h1 class="my-4">Đề Thi
          <small>mới nhất</small>
        </h1>

        <!-- Blog Post -->
        <div class="card mb-4" v-for="collection in collections.data">
          <img v-if="!!collection.image" class="card-img-top" :src="collection.image" alt="Card image cap">
          <div class="card-body">
            <h2 class="card-title">{{ collection.name }}</h2>
            <p class="card-text">{{ collection.description }}</p>
            <router-link :to="{name: 'CollectionDetail', params: {id: collection.slug}}" class="btn btn-primary">
              Chi tiết &rarr;
            </router-link>
          </div>
          <div class="card-footer text-muted">
            {{moment.unix(collection.created_at).fromNow()}}
          </div>
        </div>

        <!-- Pagination -->
        <nav aria-label="Page navigation example" v-if="collections.total / parseInt(collections.per_page, 10) > 1" style="margin-top: 16px;">
          <ul class="pagination">

            <ul class="pagination" style="visibility: visible;">
              <li class="page-item">
                <a @click="collections.current_page !== 1 && updatePageCollection(1)"title="First" class="page-link">
                  <span aria-hidden="true">&laquo;</span>
                  <span class="sr-only">First</span>
                </a>
              </li>
              <!--<li class="page-item">-->
              <!--<a @click="collections.current_page > 1 && updatePageCollection(collections.current_page-1)" title="Prev" class="page-link">-->
              <!--<span aria-hidden="true">&laquo;</span>-->
              <!--<span class="sr-only">Previous</span>-->
              <!--</a>-->
              <!--</li>-->
              <li v-for="n in collections.last_page"  :class="['page-item', collections.current_page === n ? 'active' : '']">
                <a v-if="(collections.current_page - 3 < n && collections.current_page + 3 > n) || n === 1 || n === 2 ||
                n === collections.last_page || n === (collections.last_page - 1)" @click.prevent="updatePageCollection(n)" class="page-link">
                  {{n}}
                </a>
              </li>
              <!--<li class="page-item">-->
              <!--<a @click="collections.current_page < collections.last_page && updatePageCollection(collections.current_page+1)"  title="Next" class="page-link">-->
              <!--<span aria-hidden="true">&raquo;</span>-->
              <!--<span class="sr-only">Next</span>-->
              <!--</a>-->
              <!--</li>-->
              <li class="page-item">
                <a @click="collections.current_page !== collections.last_page && updatePageCollection(collections.last_page)" title="Last" class="page-link">
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

        <!-- Categories Widget -->
        <TagWidget/>

      </div>

    </div>
    <!-- /.row -->

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
      // if (this.collections.current_page < 0) {
      //   this.updatePageCollection(1)
      // }
      this.updatePageCollection(1)
    },
    computed: mapGetters([
      'collections'
    ]),
    methods: {
      ...mapActions([
        'getCollection',
        'updateSizeCollection',
        'updatePageCollection',
        'deleteCollection',
        'publishCollection'
      ]),
      onChangeSize (event) {
        this.updateSizeCollection(event.srcElement.value)
      }
    }
  }
</script>
