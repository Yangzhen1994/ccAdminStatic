import request from '@/utils/request'

export function loginByUsername(user, password) {
  /* var formData = new FormData()
  formData.append('user', user)
  formData.append('password', password)*/
  // mock
  const data = {
    username: user,
    password
  }
  return request({
    url: '/auth/login',
    method: 'post',
    data: data
    /* headers: { 'Content-Type': 'multipart/form-data;' }*/
  })
}

export function logout() {
  return request({
    url: '/auth/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/user',
    method: 'get',
    params: { token }
  })
}
export function changePwd(data) {
  return request({
    url: '/user/changepass',
    method: 'post',
    data,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
  })
}

// 获取系统配置
export function getSystemConfig(get) {
  return request({
    url: '/system/config',
    method: 'get'
  })
}
