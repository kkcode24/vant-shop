import { UserInfo,goAuth } from '@/api/user'
import { getUserInfo, setUserInfo,getUserAuth,setUserAuth } from '@/store/localStorage'
const auth = {
  state: {
    // 用户授权状态
    isAuth: JSON.parse(getUserAuth()) || false,
    // 是否显示Popup授权框
    show: false,
    // 用户登录信息
    userInfo: JSON.parse(getUserInfo())
  },

  mutations: {
    OPEN_AUTH(state) {
      state.show = true;
    },
    CLOSE_AUTH(state) {
      state.show = false;
    },
    SET_AUTH(state,isAuth) {
      state.isAuth = isAuth;
    },
    SET_USERINfO: (state, userInfo) => {
      state.userInfo = userInfo
    }
  },

  actions: {
    // 获取微信用户信息
    getActionWxUserInfo({commit}){
      return new Promise((resolve, reject) => {
        UserInfo().then(response => {
          const user_info = JSON.stringify(response.data);
          commit('SET_AUTH', false);
          commit('SET_USERINfO', user_info);
          setUserInfo(user_info);
          setUserAuth(false);
          resolve(response.data);
        }).catch(error => {
          reject(error);
        })
      })
    },
    // 用户授权登录
    goActionAuth({ commit }) {
      return new Promise((resolve, reject) => {
        goAuth().then(response => {
          const user_info = JSON.stringify(response.data);
          commit('SET_AUTH', true);
          commit('SET_USERINfO', user_info);
          setUserInfo(user_info);
          setUserAuth(true);
          resolve();
        }).catch(error => {
          reject(error);
        })
      })
    }
  }
}

export default auth
