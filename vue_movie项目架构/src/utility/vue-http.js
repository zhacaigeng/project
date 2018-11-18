import axios from 'axios'

export default {
  install (Vue, options) {
    Vue.prototype.$http = axios

    Vue.component('anchored-heading', {
      render: function (createElement) {
        return createElement(
          'h' + this.level,   // tag name 标签名称
          this.$slots.default // 子组件中的阵列
        )
      },
      props: {
        level: {
          type: Number,
          required: true
        }
      }
    })
  }
}
