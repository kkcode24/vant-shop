import request from '@/utils/request'
// 获取所有水果
export function getFriutList(data) {
  return request({ url: '/type/getDataList', method: 'get', params: data })
}
// 根据id获取水果列表
export function getFriutListById(data) {
  return request({ url: '/fruit/queryByFruitTypeId', method: 'get', params: data })
}
//根据id 获取分类以及水果详情
export function getNromById(data) {
  return request({ url: '/fruit/' + data.id + '/getForm', method: 'get'})
}