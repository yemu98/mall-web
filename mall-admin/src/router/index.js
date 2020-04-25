import Vue from 'vue'
import VueRouter from 'vue-router'
import layout from '../layout/'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: layout,
    meta: [
      {
        title: '首页',
        url: '/index'
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/product',
    component: layout,
    meta: [
      {
        title: '商品管理',
        name: '/product'
      }
    ],
    children: [
      {
        path: '',
        redirect: 'index'
      },
      {
        path: 'index',
        component: () => import('../views/product'),
        name: 'product',
        meta: [
          { title: '商品管理', url: '/product' },
          { title: '商品列表', url: '/product/index' },
        ]
      },
      {
        path: 'add',
        component: () => import('../views/product/add.vue'),
        name: 'addproduct',
        meta: [
          { title: '商品管理', url: '/product' },
          { title: '添加商品', url: '/product/add' }]
      },
      {
        path: ':id/edit',
        component: () => import('../views/product/edit.vue'),
        name: 'productEdit',
        meta: [
          { title: '商品管理', url: '/product' },
          { title: '商品列表', url: '/product/index' },
          { title: '商品编辑', url: '/product/edit' }
        ]
      }
    ]

  },
  {
    path: '/order',
    component: layout,
    children: [
      {
        path: '',
        redirect: 'index'
      },
      {
        path: 'index',
        component: () => import('../views/order'),
        name: 'order',
        meta: [
          { title: '订单管理', url: '/order', },
          { title: '订单列表', url: '/order/index' }
        ]
      }
    ]
  },
  {
    path: '/carousel',
    component: layout,
    children: [
      {
        path: '',
        redirect: 'index'
      },
      {
        path: 'index',
        component: () => import('../views/carousel'),
        name: 'carousel',
        meta: [
          { title: '轮播图管理', url: '/carousel' },
          { title: '列表', url: '/carousel/index' }
        ]
      },
      {
        path: 'add',
        component: () => import('../views/carousel/add'),
        name: 'carouselAdd',
        meta: [
          {title: '轮播图管理',url: '/carousel'},
          {title: '添加',url: '/carousel/add'}
        ]
      },
      {
        path: ':id/edit',
        component: () => import('../views/carousel/edit'),
        name: 'carouselEdit',
        meta: [
          { title: '轮播图管理', url: '/carousel' },
          { title: '列表', url: '/carousel/index' },
          { title: '编辑', url: '' }
        ]
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
