// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vant from 'vant';
import { Lazyload } from 'vant';
import 'vant/lib/index.css';
import '@/styles/common.scss'
import 'lib-flexible/flexible';
import store from './store'
import App from './App'
import router from './router'
import components from '@/components'

Vue.use(Lazyload);
Vue.use(Vant);
Vue.use(components);

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
