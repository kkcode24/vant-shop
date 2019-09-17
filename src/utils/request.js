import axios from 'axios'
import {
  Notify
} from 'vant'
const service = axios.create({
  baseURL: 'http://localhost:8080/',
  timeout: 20000
})

// request interceptor
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
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
    console.log('err' + error) // for debug
    Notify({
        type: 'danger',
        message: error.message,
        duration: 3 * 1000
      });

    return Promise.reject(error)
  }
)

export default service
