import { Promise, resolve, reject } from "q";

const shoppingCar = {
  state: {
    show: false,
    fruit: {}
  },

  mutations: {
    OPEN_SHOPPING (state) {
      state.show = true
    },
    CLOSE_SHOPPING (state) {
        state.show = false
    },
    ADD_GOODS (state, fruit) {
      state.fruit = fruit
      console.log(state.fruit)
      state.show = true
    }
  },

  actions: {
    
  }
}

export default shoppingCar
