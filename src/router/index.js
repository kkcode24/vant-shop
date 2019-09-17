import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home/index'
import User from '@/views/user/index'
import Items from '@/views/items/index'
import Cart from '@/views/order/index'
const Tabbar = () => import('@/components/Tabbar');
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      components:{
        default: Home,
        tabbar: Tabbar
      },
      meta: {
        requiresAuth: false,
        keepAlive: true
      }
    },
    {
      path: '/home',
      name: 'home',
      components:{
        default: Home,
        tabbar: Tabbar
      },
      meta: {
        requiresAuth: false,
        keepAlive: true
      }
    },
    {
      path: '/order',
      name: 'cart',
      components:{
        default: Cart,
        tabbar: Tabbar
      },
      meta: {
        requiresAuth: false,
        keepAlive: true
      }
    },
    {
      path: '/items',
      name: 'items',
      components:{
        default: Items,
        tabbar: Tabbar
      },
      meta: {
        requiresAuth: false,
        keepAlive: true
      }
    },
    
    {
      path: '/user',
      name: 'user',
      components:{
        default: User,
        tabbar: Tabbar
      },
      meta: {
        requiresAuth: false,
        keepAlive: true
      }
    },
  ]
})
