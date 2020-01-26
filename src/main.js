// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import TopHeader from './components/TopHeader.vue'
import MallFooter from './components/MallFooter.vue'
import goodsCard from './components/goodsCard.vue'

Vue.config.productionTip = false
Vue.use(ElementUI)

// 全局注册组件
Vue.component('topHeader', TopHeader)
Vue.component('mallFooter', MallFooter)
Vue.component('goodsCard', goodsCard)

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
new Vue({
  el: '#app2',
  router,
  components: { App }
})
