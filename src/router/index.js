import Vue from 'vue'
// 1.引入路由组件
import VueRouter from 'vue-router'
// const routerPush = Router.prototype.push
// Router.prototype.push = function push (location) {
//   return routerPush.call(this, location).catch(error => error)
// }

// 2.注册路由
Vue.use(VueRouter)
// 3.设置映射关系
const routes = [
  { path: '/', redirect: '/index' },
  { path: '/login', name: 'login', component: () => import('@/views/login') },
  { path: '/reg', name: 'reg', component: () => import('@/views/reg') },
  { path: '/index',
    name: 'index',
    component: () => import('@/views/index'),
    redirect: '/main',
    children: [
      { path: '/main', name: 'main', component: () => import('@/views/main') },
      { path: '/article', name: 'article', component: () => import('@/views/article') },
      { path: '/articleadd', name: 'articleadd', component: () => import('@/views/articleadd') }
    ]

  }

]
// 4.创建路由对象
const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  let userinfo = window.sessionStorage.getItem('userinfo')
  if (!userinfo && to.path !== '/login') {
    return next('/login')
  }
  next()
})
// 5.导出 路由对象到main.js
export default router
