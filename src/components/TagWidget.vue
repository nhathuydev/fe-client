<template>
  <div class="card my-4">
    <h5 class="card-header">Nhãn</h5>
    <div class="card-body">
      <router-link :to="{name: 'TagDetail', params: {id: tag.id}}" v-for="tag in tags.data" class="badge badge-pill badge-primary"
                   :key="tag.id"
                   :style="{ backgroundColor: '#' + tag.color, marginRight: '8px' }"
      >{{tag.name}}</router-link>

      <router-link :to="{name: 'TagList'}" class="btn btn-sm card-link">Tất cả  &rarr;</router-link>
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  data () {
    return {}
  },
  computed: mapGetters([
    'tags'
  ])
}
</script>
