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
        setOrderCache({commit},orderInfo){
            return new Promise(resolve => {
                const order_info = JSON.stringify(orderInfo);
                commit('SET_USERORDER', order_info)
                setUserOrder(order_info)
                resolve()
            })
        },
        // 清除订单信息
        clearOrderCache({ commit }) {
            return new Promise(resolve => {
                clearUserOrder()
                resolve()
            })
        }
    }
}
  
  export default order
  