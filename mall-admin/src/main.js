import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css';
import router from './router'
import store from './store'
// 导入axios组件
import axios from 'axios'
import qs from 'qs'
// 引入接口地址js
import apiURL from './js/apiURL';

// vue生产环境提示
Vue.config.productionTip = true
Vue.use(ElementUI)
// 全局注册axios
Vue.prototype.$axios = axios
Vue.prototype.qs = qs
// 全局注册
Vue.prototype.apiURL = apiURL
// 接口根地址 生产环境和开发环境地址自动配置
// axios.defaults.baseURL = 'http://39.105.184.23:8082'
axios.defaults.baseURL = process.env.VUE_APP_ADMINURL
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})