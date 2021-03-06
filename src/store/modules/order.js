import { getUserOrder, setUserOrder,clearUserOrder } from '@/store/localStorage'
const order = {
    state: {
        orderList: JSON.parse(getUserOrder())
    },
  
    mutations: {
        SET_USERORDER: (state, orderList) => {
            state.orderList = orderList
        }
    },
  
    actions: {
        // 把提交的订单数据存到本地
        setOrderCache({ commit }, orderInfo){
            return new Promise(resolve => {
                let orderList = JSON.parse(getUserOrder()) || []
                if(Array.isArray(orderInfo)) {
                    orderList = [...orderInfo, ...orderList]
                } else {
                    orderList.push(orderInfo)
                }
                const order_list = JSON.stringify(orderList)
                commit('SET_USERORDER', orderList)
                setUserOrder(order_list)
                resolve()
            })
        },
        // 订单提交成功，清除本地订单信息
        clearOrderCache({ commit }) {
            return new Promise(resolve => {
                commit('SET_USERORDER',null)
                clearUserOrder()
                resolve()
            })
        }
    }
}
  
  export default order
  