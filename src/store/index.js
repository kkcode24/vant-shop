import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import shoppingCar from './modules/shoppingCar'
import auth from './modules/auth'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    auth,
    shoppingCar
  },
  getters
})

export default store
