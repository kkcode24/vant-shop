const getters = {
    isAuth: state => state.auth.isAuth,
    userInfo: state => state.auth.userInfo,
    userOrder: state => state.order.orderInfo
}
export default getters
  