import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: location.protocol + '//' + window.location.host + '/api',
  // headers: { "Content-Type": " multipart/form-data" },
  // baseURL: 'http://' + window.location.host + '/api',
  // baseURL: process.env.BASE_API, // api的base_url
  timeout: 30000 // 请求超时时间
})

// request interceptor
service.interceptors.request.use(config => {
  // Do something before request is sent
  if (store.getters.token) {
    config.headers['user-token'] = getToken() // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
  response => {
    /**
     * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
     * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
     */
    const res = response.data
    if (!res) {
      return response
    }
    if (res.code && res.code !== 20000 && res.code !== 200) {
      var errArr = {
        404: '请求迷路了~',
        500: '服务器开小差了~'
      }
      if (res.code.toString().charAt(0) == 5) {
        Message({
          message: errArr[500],
          type: 'error',
          duration: 5 * 1000
        })
      }
      if (res.code.toString().charAt(0) == 4) {
        Message({
          message: errArr[404],
          type: 'error',
          duration: 5 * 1000
        })
      }
      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      /* if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload()// 为了重新实例化vue-router对象 避免bug
          })
        })
      }*/
      return Promise.reject('error')
    } else {
      return response
    }
  },
  error => {
    console.log(error.response)
    console.log('err' + error)// for debug
    var errArr = {
      400: '用户认证失败',
      404: '请求迷路了~',
      409: '应用已有配置!',
      500: '服务器开小差了~'
    }
    if (error.message.indexOf('5') > -1) {
      Message({
        message: errArr[500],
        type: 'error',
        duration: 5 * 1000
      })
    } else if (error.response && error.response.status == 404) {
      console.log(404)
    }  else if (error.response && error.response.status == 409) {
      Message({
        message: errArr[409],
        type: 'error',
        duration: 5 * 1000
      })
    } else if (error.response && error.message.indexOf('4') > -1) {
      Message({
        message: error.response.data.message || errArr[404],
        type: 'error',
        duration: 5 * 1000
      })
    } else {
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
    }
    return Promise.reject(error)
  })

export default service
