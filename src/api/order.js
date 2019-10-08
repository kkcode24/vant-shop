import request from '@/utils/request'

// 修改订单状态=》支付成功
export function modifyOrderStatus(id) {
    return request({
        url: '/order/updateOrderStatus',
        method: 'post',
        params: {orderId: id}
    })
}

// 查询订单支付结果
export function queryOrderPayResult(id) {
    return request({
        url: '/order/queryorder',
        method: 'post',
        params: {orderId: id}
    })
}

// 我的订单
export function getMyOrder(data) {
    return request({
        url: '/order/getDataList',
        method: 'get',
        params: data
    })
}

// 订单支付（微信）
export function billWXPay(id) {
    return request({
        url: '/order/orderCharge',
        method: 'post',
        params: {orderId: id}
    })
}

// 创建订单
export function saveOrder(data) {
    return request({
        url: '/order/save',
        method: 'post',
        data
    })
}