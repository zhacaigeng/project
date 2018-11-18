<template>
  <div>
    <h1>{{ movie.title }}</h1>
    <img :src="movie.images.small" alt="">
    <p>导演：</p>
    <p>演员：</p>
    <p>{{ movie.summary }}</p>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        movie: {}
      }
    },
    created () {
      const {id} = this.$route.params;
      this.getMovieDetail(id)
    },
    methods: {
      async getMovieDetail (id) {
        const res = await this.$http.get(`/api/movie/subject/${id}`)
        this.movie = res.data
      }
    }
  }
</script>

<style>
  
</style>
