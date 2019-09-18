import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home/index'
import User from '@/views/user/index'
import Items from '@/views/items/index'
import Cart from '@/views/order/index'
// import Login from '@/views/login/index'
const Tabbar = () => import('@/components/Tabbar');
Vue.use(Router)

const router = new Router({
  routes: [{
      path: '/',
      name: 'index',
      components: {
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
      components: {
        default: Home,
        tabbar: Tabbar
      },
      meta: {
        requiresAuth: false,
        keepAlive: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/index'),
    },
    {
      path: '/order',
      name: 'cart',
      components: {
        default: Cart,
        tabbar: Tabbar
      },
      meta: {
        requiresAuth: true,
        keepAlive: true
      }
    },
    {
      path: '/items',
      name: 'items',
      components: {
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
      components: {
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

router.beforeEach((to, from, next) => {
  console.log(to);
  if (to.matched.some(r => r.meta.requiresAuth)) {
    // store.getters.loginStatus
    if (true) {
      next()
    } else {
      next({
        path: '/login'
      })
    }
  } else {
    next()
  }
})

export default router;
