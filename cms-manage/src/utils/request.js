import axios from 'axios'
import { baseURL } from '@/config'
import { Message } from 'element-ui'

// 创建请求实例
const service = axios.create({
  baseURL, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 20000 // request timeout
})

// 添加请求拦截器
service.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['X-token'] = token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 添加响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    console.log(res, 'res')
    // 接口请求失败提示
    if (res.code !== 10000) {
      Message.error(res.message);
    }
    if (res.code === -2) {
      localStorage.removeItem('token')
      window.location.href = location.origin + '/login'
    }
    return res
  },
  error => {
    console.log('err' + error) // for debug
    // Message({
    //   message: error.message,
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    return Promise.reject(error)
  }
)

export default service
