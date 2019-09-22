import shoppingCar from './shoppingCar';
import authLogin from './authLogin';
export default {
  install(Vue, options) {
    Vue.component(authLogin.name, authLogin);
    Vue.component(shoppingCar.name, shoppingCar);
  }
}