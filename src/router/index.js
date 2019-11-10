import Vue from 'vue'
// 1.引入路由组件
import VueRouter from 'vue-router'
// 2.注册路由
Vue.use(VueRouter)
// 3.设置映射关系
const routes = [
  { path: '/login', name: 'login', component: () => import('@/views/login') },
  { path: '/home', name: 'home', component: () => import('@/views/Home') }
]
// 4.创建路由对象
const router = new VueRouter({
  routes
})
// 5.导出 路由对象到main.js
export default router
