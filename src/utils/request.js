import axios from 'axios'
import { Notify } from 'vant'
const service = axios.create({
  baseURL: '/api',
  timeout: 20000
})

service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    Promise.reject(error)
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
          message: res.message,
          duration: 3 * 1000
        });
      }
    } else {
      return response.data
    }
  },
  error => {
    Notify({
      type: 'danger',
      message: error.message,
      duration: 3 * 1000
    });
    return Promise.reject(error)
  }
)

export default service
