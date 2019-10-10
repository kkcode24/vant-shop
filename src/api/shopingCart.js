

import request from '@/utils/request'
// 获取所有水果
export function addFriutToCart(data) {
  return request({ url: '/shoppingCart/save', method: 'post', params: {info:JSON.stringify(data)} })
}
//查询购物车

export function getCartList(data) {
  return request({ url: '/shoppingCart/getDataList', method: 'get', params: data })
}