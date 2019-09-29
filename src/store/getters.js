const getters = {
    isAuth: state => state.auth.isAuth,
    userInfo: state => state.auth.userInfo,
    userOrder: state => state.order.orderInfo,
    addressList: state => state.address.addressList
}
export default getters
  