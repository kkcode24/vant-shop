import { getAddressList } from '@/api/address'
import { getUserAddress, setUserAddress } from '@/store/localStorage'
const address = {
  state: {
    // 用户收货地址
    addressList: JSON.parse(getUserAddress())
  },

  mutations: {
    SET_USERADDRESS: (state, addressList) => {
      state.addressList = addressList
    }
  },

  actions: {
    // 获取用户收货地址
    getWxUserAddress({commit}){
      return new Promise((resolve, reject) => {
        getAddressList().then(response => {
          const address_list = JSON.stringify(response.data);
          commit('SET_USERADDRESS', address_list);
          setUserAddress(address_list);
          resolve(response);
        }).catch(error => {
          reject(error);
        })
      })
    }
  }
}

export default address
