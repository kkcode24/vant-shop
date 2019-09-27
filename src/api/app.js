import request from '@/utils/request'

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
