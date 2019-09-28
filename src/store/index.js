import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import shoppingCar from './modules/shoppingCar'
import auth from './modules/auth'
import order from './modules/order'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    auth,
    order,
    shoppingCar
  },
  getters
})

export default store
