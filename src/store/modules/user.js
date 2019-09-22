import { loginByUsername, logout } from '@/api/user'
import { getUserInfo, setUserInfo, removeUserInfo, clearLocalStorage } from '@/store/localStorage'
const user = {
  state: {
    // 用户登录状态
    loginStatus: JSON.parse(localStorage.getItem('loginStatus')) || false,
    // 用户登录信息
    userInfo: JSON.parse(getUserInfo())
  },

  mutations: {
    SET_USERINfO: (state, userInfo) => {
      state.userInfo = userInfo
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      const account = userInfo.account.trim();
      return new Promise((resolve, reject) => {
        loginByUsername({ account, password: userInfo.password }).then(response => {
          const data = response.data;
          const user_info = JSON.stringify(data.sysManager);
          commit('SET_USERINfO', user_info);
          setUserInfo(user_info);
          resolve();
        }).catch(error => {
          reject(error);
        })
      })
    },
    // 登出
    LogOut({ commit }) {
      return new Promise((resolve, reject) => {
        logout({}).then(response => {
          removeUserInfo();
          clearLocalStorage();
          resolve();
        }).catch(error => {
          reject(error);
        })
      })
    },
    // 前端登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        removeUserInfo();
        clearLocalStorage();
        resolve();
      })
    }
  }
}

export default user
