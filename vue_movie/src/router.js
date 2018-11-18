// 实例化 VueRouter 实例
// 配置路由表
// 导出路由实例 -> 给根实例加载使用

// 1. 加载 Vue
// 2. 加载 vue-router
// 3. 将 VueRouter 挂在到 Vue 上
// 4. 配置路由表
// 5. 导出 router 实例
// 6. 在根实例上通过 router 选项挂载当前模块中导出的 router 实例
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './Home.vue'
import MovieList from './components/movie/List.vue'
import MovieDetail from './components/movie/Detail.vue'

// 为什么在模块化环境中需要显示的去 use 加载
// 因为在非模块化环境中，vue-router 会去查找全局的 Vue 为其扩展成员
// 但是在模块化环境中，由于都是私有作用域，没有全局的 Vue
// 所以在模块化中需要显示的使用 use 去加载 vue-router 这个插件
Vue.use(VueRouter)

// 配置路由表
const router = new VueRouter({
  linkActiveClass: 'active',
  routes: [
    {path: '/', redirect: '/in_theaters'}, // 当访问 / 的时候，重定向到 /in_theaters
    {path: '/in_theaters', component: MovieList},
    {path: '/coming_soon',  component: MovieList},
    {path: '/top250', component: MovieList},
    // 表示可以匹配二级路径
    // 其中第一级必须是 /detail
    // 第二级无所谓 /detail/a /detail/b /detail/1
    // 不能是大于2级的或者小于2级的，例如 /detail 不行，/detail/a/b 不行
    {name: 'MovieDetail', path: '/detail/:id', component: MovieDetail},
    {path: '/search', component: MovieList}
  ]
})

export default router
