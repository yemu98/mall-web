import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

// 解决路由重复点击控制台报错(NavigationDuplicated vue-router)问题
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  mode: 'history',
  routes: [
    { 
      path: '/',
      name: '首页',
      component: () => import('../views/index'),
      meta: {
        title: '首页'
      }

    },
    {
      path: '/index',
      name: 'index',
      component: () => import('../views/index'),
      meta: {
        title: '首页'
      }

    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login'),
      meta: {
        title: '登录'
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/register'),
      meta: {
        title: '注册'
      }
    },
    {
      path: '/card',
      name: 'card',
      component: () => import('../components/goodsCard.vue'),
      meta: {
        title: '商品卡片'
      }
    },
    {
      path: '*/',
      name: '404',
      component: () => import('../views/404.vue'),
      meta: {
        title: '404'
      }
    },
    {
      path: '/search',
      name: '搜索',
      component: () => import('../views/search'),
      meta: {
        title: '搜索'
      }
    },
    {
      path: '/item',
      name: '商品详情',
      component: () => import('../views/item'),
      meta: {
        title: '商品详情'
      }
    },
    {
      path: '/cart',
      name: '购物车',
      component: () => import('../views/cart'),
      meta: {
        title: '购物车'
      }
    }
  ]
  
})
