// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vant from 'vant';
import { Lazyload } from 'vant';
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'vant/lib/index.css';
import '@/styles/common.scss'
import 'swiper/dist/css/swiper.css'
import 'lib-flexible/flexible';
import store from './store'
import App from './App'
import router from './router'
import components from '@/components'
import appConfig from '@/utils/config'
import * as filters from './filters' 
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
// 应用全局配置项
Vue.prototype.app = appConfig;

Vue.use(Lazyload);
Vue.use(Vant);
Vue.use(components);
Vue.use(VueAwesomeSwiper, /* { default global options } */)

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
