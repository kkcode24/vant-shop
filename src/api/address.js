import request from '@/utils/request'

// 保存收货地址
export function saveAddress(data) {
    return request({
        url: '/userAddress/save',
        method: 'post',
        data
    })
}

// 查询用户地址list
export function getAddressList() {
  return request({
    url: '/userAddress/getDataList',
    method: 'get'
  })
}