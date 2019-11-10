import Vue from 'vue'
import App from './App.vue'
// index.js 和 index.vue文件不用刻意设置，所以默认就会自动寻找router下的index文件
import router from './router'
// 引入全局样式控制文件
import '@/assets/css/global.css'

// 完整引入elementui组件
import ElementUI from 'element-ui'
// 引入axios
import axios from 'axios'
// 设置axios公共跟地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn'
// 把axios通过原型继承的方式配置给Vue，使得组件内部可以直接访问
// 后期在组件内部就可以通过 this.$http 的方式获得axios对象
// $http:就是自定义名称，可以为其他
Vue.prototype.$http = axios
Vue.use(ElementUI) // 注册组件
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
