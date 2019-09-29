import { getAddressList,saveAddress } from '@/api/address'
import { getUserAddress, setUserAddress } from '@/store/localStorage'
const address = {
  state: {
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
          if(response.data.length===0){
            setUserAddress(null);
          }else{
            setUserAddress(address_list);
          }
          resolve(response);
        }).catch(error => {
          reject(error);
        })
      })
    },
    // 新增用户收货地址
    saveWxUserAddress({commit},addressData){
      return new Promise((resolve, reject)=>{
        saveAddress(addressData).then(response=>{
          const addressList = JSON.parse(getUserAddress())
          addressList.forEach((v,i) => {
            addressList[i].isDefault = 1;
          });
          addressList.push(response.data);
          const address_list = JSON.stringify(addressList);
          commit('SET_USERADDRESS', addressList);
          setUserAddress(address_list);
          resolve(response);
        }).catch(error=>{
          reject(error);
        })
      })
    },
    // 本地更改用户默认地址=》作为订单选中地址
    selectAddress({commit},addressData){
      return new Promise((resolve, reject)=>{
          const addressList = JSON.parse(getUserAddress())
          addressList.forEach((v,i) => {
            addressList[i].isDefault = 1;
          });
          addressList.push(addressData);
          const address_list = JSON.stringify(addressList);
          commit('SET_USERADDRESS', addressList);
          setUserAddress(address_list);
          resolve();
      })
    }
  }
}

export default address
