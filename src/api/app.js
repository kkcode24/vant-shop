import request from '@/utils/request'

// 用户某月签到日期list
export function querySignDateList(month) {
  return request({
    url: '/register/queryRegisterByMonth',
    method: 'get',
    params: {date:month}
  })
}
// 用户连续签到优惠券list
export function queryRegisterCoupon() {
  return request({
    url: '/register/queryRegisterIntegral',
    method: 'get'
  })
}
// 用户签到
export function signin() {
  return request({
    url: '/register/save',
    method: 'post'
  })
}
// 查询水果详情
export function getGoodDetail(fruitId) {
  return request({
    url: '/fruit/'+fruitId+'/getForm',
    method: 'get'
  })
}

// 首页轮播图
export function getIndexSwipeImages() {
  return request({
    url: '/getRotationChart',
    method: 'get'
  })
}

// 时令上新水果
export function getNewFruits(data) {
  return request({
    url: '/getIsNewFruit',
    method: 'get',
    data
  })
}

// 水果分类
export function getAllItems() {
  return request({
    url: '/type/getDataList',
    method: 'get'
  })
}
