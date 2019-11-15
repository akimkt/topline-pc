import Vue from 'vue'
import App from './App.vue'
// index.js 和 index.vue文件不用刻意设置，所以默认就会自动寻找router下的index文件
import router from './router'
// 引入全局样式控制文件
import '@/assets/css/global.css'

// 完整引入elementui组件
import ElementUI from 'element-ui'

import './tools/ax'

Vue.use(ElementUI) // 注册组件
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
