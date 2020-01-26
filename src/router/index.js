import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '@/components/login'
import goodsCard from '@/components/goodsCard'
import index from '@/components/index'

Vue.use(Router)

// 解决路由重复点击控制台报错(NavigationDuplicated vue-router)问题
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: index,
      meta: {
        title: '首页'
      }

    },
    {
      path: '/index',
      name: 'index',
      component: index,
      meta: {
        title: '首页'
      }

    },
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld,
      meta: {
        title: 'hello'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: {
        title: '登录'
      }
    },
    {
      path: '/card',
      name: 'card',
      component: goodsCard,
      meta: {
        title: '商品卡片'
      }
    }
  ]
})
