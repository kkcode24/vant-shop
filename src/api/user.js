import request from '@/utils/request'

// 获取微信进入的用户信息s
export function UserInfo() {
  return request({
    url: '/user/queryUserInfo',
    method: 'POST'
  })
}

// 用户授权登录
export function goAuth() {
  return request({ url: '/user/auth', method: 'get' })
}

// 更新用户信息
export function updateUserInfo(data) {
  return request({ url: '/user/updateUser', method: 'POST', data})
}
