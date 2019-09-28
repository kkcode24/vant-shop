import request from '@/utils/request'

// 查询用户地址list
export function getAddressList(fruitId) {
  return request({
    url: '/fruit/'+fruitId+'/getForm',
    method: 'get'
  })
}