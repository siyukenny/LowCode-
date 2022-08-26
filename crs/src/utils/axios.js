import axios from 'axios'
import UserInfo from '@/utils/getUserInfo'
import { Toast } from 'vant';

const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? window.location.origin + '/api' : '/api', // 接口地址
  timeout: 1000 * 15,
  headers: {'X-Custom-Header': 'foobar'}
})

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const token = UserInfo.GetToken();
  if (token) {
    config.headers["Authorization"] = token;
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  const { status, data } = response;

  if (status !== 200) {
    const message = "[Fetch]: 网络开了小差";
    return Promise.reject(new RequestError(message));
  }

  let res = new Promise(function() {});

  if (!data) {
    res = Promise.resolve({});
  }
  console.log(data)
  if (data.code === 10000) {
    res = data;
  } else if (data.code === 10017) {
    // 如果接口body或param中有noJumpToLogin参数，则登录失效时不跳转到登录页
    const { body, params } = response.request;
    const noJump =
      (body && body.noJumpToLogin) || (params && params.noJumpToLogin);
    if (!noJump && UserInfo.GetCanToLoginStatus()) {
      UserInfo.toLogin();
    }
    res = Promise.reject(data);
  } else {
    res = Promise.reject(data);
  }
  return res;
}, function (error) {
  // 对响应错误做点什么
  setTimeout(() => {
    Toast("网络异常，请稍后重试")
  }, 100);
  return Promise.reject(error)
})
export default instance
