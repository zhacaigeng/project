<template>
<div>
  <h1>电影列表</h1>
  <div class="list-group">
    <router-link
      :to="{name: 'MovieDetail', params: {id: item.id}}"
      :key="item.id"
      class="list-group-item"
      v-for="item in movieList">
      <div class="media">
        <div class="media-left">
            <img class="media-object" :src="item.images.small" :alt="item.title">
        </div>
        <div class="media-body">
          <h4 class="media-heading">{{ item.title }}</h4>
          <p>电影详情介绍。。。</p>
        </div>
      </div>
    </router-link>
  </div>
  <button class="btn btn-default" @click="loadNext">点击加载更多。。。</button>
</div>
</template>

<script>
export default {
  data () {
    return {
      movieList: [],
      pageSize: 5,
      page: 1
    }
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route' () {
      this.page = 1
      this.movieList = []
      this.loadMovieList(this.page, this.pageSize)
    }
  },
  methods: {
    
    async loadMovieList (page, pageSize) {
      const {query, path} = this.$route;
      console.log(this.$route);
      const res = await this.$http.get(`/api/movie/${path}`, {
        params: {
          start: (page - 1) * pageSize,
          count: pageSize,
          q: query.q
        }
      })
      const subjects = res.data.subjects
      console.log(subjects.length)
      if (subjects.length === 0) {
        return window.alert('骚年，没有更多数据了。。。')
      }
      this.movieList = [...this.movieList, ...subjects]
    },
    loadNext () {
      this.page += 1
      this.loadMovieList(this.page, this.pageSize)
    }
  },
  created () {
    // /api/movie/in_theaters
    // http://api.douban.com/v2/api/movie/in_theaters
    // 这种路径称之为绝对的 URL 路径，发起的请求不会通过 dev-server
    // 它会直接跑到豆瓣 Server 那里
    // 本地正向代理：
    // 先请求自己的服务器
    // 自己的服务器帮你发起请求去请求豆瓣 Server
    // 豆瓣 Server 返回响应给你的 dev-server 服务器
    // 你的 dev-server 服务器将收到的结果发送给你
    // /a /b /c ... 请求路径
    // /data.json
    // 这里通过 url 前缀路径来区分哪些被代理，哪些不被代理
    // 所有需要被代理的接口，都以 /api 开头
    // /api/movie/intheaters
    // dev-server 发现这个请求是以 /api 开头的
    // dev-server 开始走代理
    this.loadMovieList(this.page, this.pageSize)
  }
}
</script>

<style>
  
</style>
