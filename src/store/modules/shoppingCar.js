const shoppingCar = {
  state: {
    show: false
  },

  mutations: {
    OPEN_SHOPPING (state) {
        state.show = true
    },
    CLOSE_SHOPPING (state) {
        state.show = false
    }
  },

  actions: {
    
  }
}

export default shoppingCar
