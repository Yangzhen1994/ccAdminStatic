import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/article/list',
    method: 'get',
    params: query
  })
}

export function fetchArticle() {
  return request({
    url: '/article/detail',
    method: 'get'
  })
}

export function fetchPv(pv) {
  return request({
    url: '/article/pv',
    method: 'get',
    params: { pv }
  })
}

export function createArticle(data) {
  return request({
    url: '/article/create',
    method: 'post',
    data
  })
}

export function updateArticle(data) {
  return request({
    url: '/article/update',
    method: 'post',
    data
  })
}

export function fetchBuildHistory(query) {
  console.log(query)
  return request({
    url: '/article/list',
    method: 'get',
    params: query
  })
}
export function getUserList(url,query) {
  return request({
    url: url,
    method: 'get',
    params: query
  })
}

export function changeState(url,data) {
  return request({
    url: url,
    method: 'post',
    data
  })
}
export function delUser(url,data) {
  return request({
    url: url,
    method: 'post',
    data
  })
}
export function addUser(data) {
  return request({
    url: '/user/add',
    method: 'post',
    data
  })
}
export function editUser(data) {
  return request({
    url: '/user/edit',
    method: 'post',
    data
  })
}
export function changePwd(data) {
  return request({
    url: '/user/changepwd',
    method: 'post',
    data
  })
}

