import request from '@/utils/request'

// 登录
export function loginByUsername(data) {
  return request({ url: '/user/login', method: 'post', data })
}

// 登出
export function logout() {
  return request({ url: '/user/logout', method: 'post' })
}

// 获取用户信息
export function  UserInfo(data) {
  return request({ url: '/user/userInfo', method: 'post', data })
}