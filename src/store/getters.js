const getters = {
    isAuth: state => state.auth.isAuth,
    userInfo: state => state.auth.userInfo,
    orderList: state => state.order.orderList,
    addressList: state => state.address.addressList
}
export default getters
  