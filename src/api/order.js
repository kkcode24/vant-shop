import request from '@/utils/request'

// 创建订单
export function saveOrder(data) {
    return request({
        url: '/order/save',
        method: 'post',
        params: {info:JSON.stringify(data)}
    })
}