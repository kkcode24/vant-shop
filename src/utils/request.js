import axios from 'axios'
import { Notify } from 'vant'
const service = axios.create({
  baseURL: '/api',
  timeout: 2000000000
})

service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    error.msg = "请求参数错误";
    Promise.reject(error);
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.code != 0) {
      if (res.code === 401) {
        return Promise.reject('error')
      } else {
        Notify({
          type: 'danger',
          message: res.msg,
          duration: 3 * 1000
        });
        return response.data;
      }
    } else {
      return response.data
    }
  },
  error => {
    Notify({
      type: 'danger',
      message: '服务器未响应',
      duration: 3 * 1000
    });
    return Promise.reject(error)
  }
)

export default service
