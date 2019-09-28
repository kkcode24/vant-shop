import { getUserOrder, setUserOrder,clearUserOrder } from '@/store/localStorage'
const order = {
    state: {
        orderInfo: JSON.parse(getUserOrder())
    },
  
    mutations: {
        SET_USERORDER: (state, orderInfo) => {
            state.orderInfo = orderInfo
        }
    },
  
    actions: {
        // 把提交的订单数据存到本地
        setOrderCache({commit},orderInfo){
            return new Promise(resolve => {
                const order_info = JSON.stringify(orderInfo);
                commit('SET_USERORDER', order_info)
                setUserOrder(order_info)
                resolve()
            })
        },
        // 订单提交成功，清除本地订单信息
        clearOrderCache({ commit }) {
            return new Promise(resolve => {
                clearUserOrder()
                resolve()
            })
        }
    }
}
  
  export default order
  