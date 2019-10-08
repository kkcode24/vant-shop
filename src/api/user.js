import request from '@/utils/request'

// 获取微信进入的用户信息s
export function UserInfo() {
  return request({
    url: '/user/getForm',
    method: 'get'
  })
}

// 用户授权登录
export function goAuth() {
  return request({
    url: '/user/auth',
    method: 'get'
  })
}
