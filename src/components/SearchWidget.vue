<template>
  <div class="card my-4">
    <h5 class="card-header">Tìm kiếm</h5>
    <div class="card-body">
      <div class="input-group">
        <multiselect v-model="keyword" :options="options" :multiple="false"
                     group-values="data" group-label="name" :group-select="true"
                     placeholder="Nhập từ khoá" track-by="name" label="name"
                     @search-change="onSearch"
                     :clearOnSelect="true"
                     :resetAfter="true"
                     @select="onSelect"
                     selectLabel="Tìm"
                     :loading="loading"
        >
          <span slot="noResult">Không tìm thấy kết quả.</span>
        </multiselect>
      </div>
    </div>
  </div>
</template>
<script>
  import {search} from '@/api'
  export default {
    data () {
      return {
        loading: false,
        keyword: '',
        options: []
      }
    },
    methods: {
      onSearch (v) {
        this.loading = true
        search(v)
          .then(d => {
            this.loading = false
            this.options = d.data
          })
      },
      onSelect (selectedOption, id) {
        let route
        switch (selectedOption.type) {
          case 0: {
            route = {name: 'CollectionDetail', params: {id: selectedOption.slug}}
            break
          }
          case 1: {
            route = {name: 'TagDetail', params: {id: selectedOption.slug}}
          }
        }
        if (route) {
          this.$router.push(route)
        }
      }

    }
  }
</script>

