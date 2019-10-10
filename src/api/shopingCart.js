import request from '@/utils/request'

// 向购物车添加商品
export function addFriutToCart(data) {
  return request({
    url: '/shoppingCart/save',
    method: 'post',
    params: {
      info: JSON.stringify(data)
    }
  })
}

//查询购物车商品list
export function getCartList(data) {
  return request({
    url: '/shoppingCart/getDataList',
    method: 'get',
    params: data
  })
}
