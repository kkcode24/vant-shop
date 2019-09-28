const getters = {
    isAuth: state => state.auth.isAuth,
    userInfo: state => state.auth.userInfo,
    userOrder: state => state.myOrder.order
}
export default getters
  