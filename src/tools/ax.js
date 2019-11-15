import Vue from 'vue'
import router from '../router'
// 引入axios
import axios from 'axios'

import JSONBIG from 'json-bigint'
// 设置axios公共跟地址
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn'
// 把axios通过原型继承的方式配置给Vue，使得组件内部可以直接访问
// 后期在组件内部就可以通过 this.$http 的方式获得axios对象
// $http:就是自定义名称，可以为其他
Vue.prototype.$http = axios
// 设置请求拦截器，发送请求时如果有token就带上
axios.interceptors.request.use(config => {
  let userinfo = window.sessionStorage.getItem('userinfo')
  if (userinfo) {
    let { token } = JSON.parse(userinfo)
    config.headers.Authorization = 'Bearer ' + token
  }
  return config
}, (error) => {
  return Promise.reject(error)
}
)

axios.defaults.transformResponse = function (res) {
  if (res) { // 如果响应里有数据，就将数据通过大数字处理，（原理是做成数组存放，用的时候拼接起来，避免变形）
    return JSONBIG.parse(res)
  } else {
    return res// 如果响应里没有数据不能处理否则报错
  }
}
axios.interceptors.response.use(res => {
  return res// 成功时正常返回
}, error => { // 报错时的处理程序
  // 通过dir可以看到下面的条件数据
  if (error.response.status === 401) {
    // 在当前页引入router，在js中用router，在组件用this.$router
    return router.push('/login')
  }
  // 如果不是401，正常返回报错信息
  return Promise.reject(error)
})
