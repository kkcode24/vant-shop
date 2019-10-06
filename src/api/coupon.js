import request from '@/utils/request'

// 查询用户的优惠券
export function getUserCoupon() {
  return request({
    url: '/userCoupon/getDataList',
    method: 'get'
  })
}

// 领取优惠券
export function getCoupon(id) {
  return request({
    url: '/coupon/addCoupon',
    method: 'get',
    params: {couponId: id}
  })
}
// 查询优惠券list
export function getCouponList() {
  return request({
    url: '/coupon/ajaxList',
    method: 'get'
  })
}
