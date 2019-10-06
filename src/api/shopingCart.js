

import request from '@/utils/request'
// 获取所有水果
export function addFriutToCart(data) {
  return request({ url: '/shoppingCart/save', method: 'post', data })
}
//查询购物车

export function getCartList(data) {
  return request({ url: '/shoppingCart/ajaxList', method: 'get', params: data })
}