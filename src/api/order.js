import request from '@/utils/request'

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