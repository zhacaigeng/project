import Vue from 'vue'
import App from './App.vue' // vue-loader 会把它编译为 render 函数处理使用
import router from './router'
import VueHttp from './utility/vue-http'

// 加载 bootstrap
// 加载自定义样式文件
import 'bootstrap/dist/css/bootstrap.css'
import './assets/css/main.css'

Vue.use(VueHttp)

new Vue({
  el: '#app',
  router,
  render: c => c(App) // 将组建编译为 render 函数，比 template 效率高
})










// 1. 模块化：历史问题
// 2. CommonJS AMD、CMD、UMD、ES6 Module
// 3. 在模块化构建系统中，默认 import 得到是是 vue.runtime.esm.js 非完整版 vue ，支持 render
// 4. Vue 分为两种模板构建方式：
//    4.1 template 模板构建：在运行的时候再编译构建
//    4.2 render 提前编译好的，执行效率比 template 要高效
//    4.3 如果没有使用 webpack 模块化构建系统，则更好方式就是 template
//    4.4 如果使用了 webpack + vue-loader 的方式，则单文件组件会被 vue-loader 编译为 render 渲染函数






























// 模块系统启动入口
// 也是 Vue 程序的启动入口
// 1. 实例化根实例
// 2. 挂载路由
// 3. 挂载根组件
// 。。。其他全局配置选项

// Vue 中不同版本的构建
// 1. 完整版 template 或者 render（更底层的一种模板编译方式）
// 2. runtime 运行时构建版本 不支持 template 只支持 render
// 3. webpack 1 只能使用 CommonJS 方式，默认加载到的是 vue.runtime.common.js
// 5. webpack2 支持 ES6 Module 和 CommonJS ，这两种方式默认加载的是 vue.runtime.esm.js


// 找 node_modules
// 找 node_modules/vue
// 找 node_modules/vue/package.json 文件
// 接下来：
//  如果使用的是 CommonJS 的方式，则找 main ，然后加载该文件
//  如果使用的是 ES6 Module 的方式，则找 module ，然后加载该文件
// import Vue from 'vue'
// webpack 1 不支持 import，如果想要支持需要依赖于 babel
// webpack 2 原生支持 import ，这里应该是把 require 也当做 ES6 Module 的方式来处理了

// vue.runtime.esm.js 只支持 render 的方式，不支持 template
// 到底使用谁？
// 如果使用的是 template ，则 Vue 会在执行的时候再去编译
// 如果是直接写的 render ，则 Vue 会直接将模板编译为渲染函数，执行的时候直接调用，效率更高
// render 的效率 比 template 高
// 这里只需要给一个 render: (createElement) => { return  createElement(给一个组件) }
