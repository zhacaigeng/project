const router = new VueRouter({
    linkActiveClass: 'active',
    routes: [
      {path: '/', redirect: '/in_theaters'}, // 当访问 / 的时候，重定向到 /in_theaters
      {path: '/in_theaters', component: MovieList},
      {path: '/coming_soon', component: MovieList},
      {path: '/top250', component: MovieList},
      // 表示可以匹配二级路径
      // 其中第一级必须是 /detail
      // 第二级无所谓 /detail/a /detail/b /detail/1
      // 不能是大于2级的或者小于2级的，例如 /detail 不行，/detail/a/b 不行
      {name: 'MovieDetail', path: '/detail/:id', component: MovieDetail},
      {path: '/search', component: MovieList}
    ]
  })