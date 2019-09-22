const shoppingCar = {
  state: {
    show: false,
    goodsList: []
  },

  mutations: {
    OPEN_SHOPPING (state) {
        state.show = true
    },
    CLOSE_SHOPPING (state) {
        state.show = false
    },
    ADD_GOODS (state) {
        state.goodsList = []
    }
  },

  actions: {
    
  }
}

export default shoppingCar
