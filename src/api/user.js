import request from '@/utils/request'

// 登录
export function loginByUsername(data) {
  return request({ url: '/users/login', method: 'post', data })
}

// 登出
export function logout() {
  return request({ url: '/users/logout', method: 'post' })
}

  // 用户注册
export function Regist(data) {
  return request({ url: '/users/userRegist', method: 'post', data })
}

// 发送注册验证码
export function RegistVerifiCode(data) {
  return request({ url: '/users/registVerifiCode', method: 'post', data })
}

// 获取用户信息
export function  UserInfo(data) {
  return request({ url: '/users/userInfo', method: 'post', data })
}