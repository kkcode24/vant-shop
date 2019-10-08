import selectedNorm from './selectedNorm';
import authLogin from './authLogin';
export default {
  install(Vue, options) {
    Vue.component(authLogin.name, authLogin);
    Vue.component(selectedNorm.name, selectedNorm);
  }
}