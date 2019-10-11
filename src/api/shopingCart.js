import request from '@/utils/request'


// 从购物车中删除商品
export function delFromCartByIds(data) {
  return request({
    url: '/shoppingCart/batch/delete',
    method: 'post',
    params: {
      ids: data
    }
  })
}

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
export function getCartList() {
  return request({
    url: '/shoppingCart/getDataList',
    method: 'get'
  })
}
