import request from '@/utils/request'

// 更新供应商信息
export function updateSupplier(data) {
    return request({ url: '/planting/updatePlanting', method: 'POST',data})
}
// 获取供应商信息
export function getSupplier() {
    return request({ url: '/planting/selectByPlatingId', method: 'GET'})
}
// 供应商登录
export function login(data) {
    return request({ url: '/planting/login', method: 'POST', params:{account:data.account,password:data.password}})
}