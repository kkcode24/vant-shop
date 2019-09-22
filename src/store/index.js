import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from './modules/user'
import shoppingCar from './modules/shoppingCar'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    shoppingCar
  },
  getters
})

export default store
