import request from '@/utils/request'

// 登录
export function loginByUsername(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

// 获取微信进入的用户信息s
export function UserInfo() {
  return new Promise(function (resolve, reject) {
    resolve({
      "data": {
        "isAuth": false,
        "universities": "东理",
        "sex": "男",
        "nickname": "哈哈",
        "username": "18679168426",
        "emailVerified": false,
        "mobilePhoneNumber": "18679168426",
        "avatar": "https://infinityicon.infinitynewtab.com/user-share-icon/2fc65bd66987ba1596324d55c01bddd7.png?imageMogr2/thumbnail/260x/format/webp/blur/1x0/quality/100|imageslim",
        "mobilePhoneVerified": true,
        "objectId": "5836c4ea67f3560065f52b5d",
        "createdAt": "2016-11-24T10:46:02.407Z",
        "updatedAt": "2017-02-21T14:54:27.169Z"
      },
      "success": true
    })
  })
  return request({
    url: '/user/userInfo',
    method: 'post'
  })
}

// 用户授权登录
export function goAuth() {
  return new Promise(function (resolve, reject) {
    resolve({
      "data": {
        "isAuth": true,
        "universities": "东理",
        "sex": "男",
        "nickname": "东三白",
        "username": "18679168426",
        "emailVerified": false,
        "mobilePhoneNumber": "18679168426",
        "avatar": "https://infinityicon.infinitynewtab.com/user-share-icon/2fc65bd66987ba1596324d55c01bddd7.png?imageMogr2/thumbnail/260x/format/webp/blur/1x0/quality/100|imageslim",
        "mobilePhoneVerified": true,
        "objectId": "5836c4ea67f3560065f52b5d",
        "createdAt": "2016-11-24T10:46:02.407Z",
        "updatedAt": "2017-02-21T14:54:27.169Z"
      },
      "success": true
    })
  })
  return request({
    url: '/user/auth',
    method: 'post'
  })
}
