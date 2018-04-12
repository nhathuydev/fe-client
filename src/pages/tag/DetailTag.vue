<template>
  <div class="container">

    <div class="row">

      <!-- Blog Entries Column -->
      <div class="col-md-8">
        <div v-if="tag">
          <h1 class="my-4">{{tag.name}}
            <small>#{{tag.id}}</small>
          </h1>

          <div class="card mb-4" v-for="collection in tag.collections">
            <img v-if="!!collection.image" class="card-img-top" :src="collection.image" alt="">
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
        </div>
      </div>
      <!-- Sidebar Widgets Column -->
      <div class="col-md-4">
        <!-- Search Widget -->
        <SearchWidget/>
      </div>

    </div>
    <!-- /.row -->

  </div>
</template>
<script>
  import {detailTag} from '@/api'
  export default {
    data: () => {
      return {
        tag: null
      }
    },
    created: function () {
      detailTag(this.$route.params.id)
        .then(result => {
          this.tag = result.data
        })
    }
  }
</script>
