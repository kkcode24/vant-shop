import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import shoppingCar from './modules/shoppingCar'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    shoppingCar
  },
  getters
})

export default store
