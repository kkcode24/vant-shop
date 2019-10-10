import { Promise, resolve, reject } from "q";

const shoppingCar = {
  state: {
    type: 1,
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
    SET_TYPE (state,type) {
      state.type = type
    },
    ADD_GOODS (state, fruit) {
      state.fruit = fruit;
      state.show = true;
    }
  },

  actions: {
    // 设置sku的类型
    openSku({ commit }, type){
      return new Promise(resolve => {
          commit('SET_TYPE', type)
          resolve()
      })
  },
  }
}

export default shoppingCar
