import request from '@/utils/request';

// 删除收货地址
export function deleteAddress(addressId) {
  return request({
    url: '/userAddress/'+addressId+'/delete',
    method: 'post'
  })
}

// 更新收货地址
export function updateAddress(data) {
  return request({
    url: '/userAddress/'+data.id+'/update',
    method: 'post',
    params: {entity:JSON.stringify(data)}
  })
}

// 查询收货地址
export function getUserAddressInfo(addressId) {
  return request({
    url: '/userAddress/'+addressId+'/getForm',
    method: 'get'
  })
}
// 保存收货地址
export function saveAddress(data) {
    return request({
        url: '/userAddress/save',
        method: 'post',
        params: {entity:JSON.stringify(data)}
    })
}

// 查询用户地址list
export function getAddressList() {
  return request({
    url: '/userAddress/getDataList',
    method: 'get'
  })
}