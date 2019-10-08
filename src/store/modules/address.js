import { getAddressList,saveAddress,updateAddress,deleteAddress } from '@/api/address'
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
            commit('SET_USERADDRESS', null);
          }else{
            setUserAddress(address_list);
            commit('SET_USERADDRESS', response.data);
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
    // 更新用户收货地址
    updateWxUserAddress({commit},addressData){
      return new Promise((resolve, reject)=>{
        updateAddress(addressData).then(response=>{
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
    // 删除用户一个收货地址
    deleteWxUserAddress({commit},addressId){
      return new Promise((resolve, reject)=>{
        deleteAddress(addressId).then(response=>{
          const addressList = JSON.parse(getUserAddress())
          const tempAddressList = addressList.filter(item=>{
            return item.id !== addressId;
          })
          const address_list = JSON.stringify(tempAddressList);
          commit('SET_USERADDRESS', tempAddressList);
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
            if(addressList[i].id === addressData.id){
              addressList[i].isDefault = 0;
            }else{
              addressList[i].isDefault = 1;
            }
          });
          const address_list = JSON.stringify(addressList);
          commit('SET_USERADDRESS', addressList);
          setUserAddress(address_list);
          resolve();
      })
    }
  }
}

export default address
