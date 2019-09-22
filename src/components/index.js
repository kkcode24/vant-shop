import shoppingCar from './shoppingCar';
export default {    
    install (Vue, options) {
    //   Vue.prototype.$loading = Loading
     Vue.component(shoppingCar.name, shoppingCar);
    }
  }