import { param2Obj } from '@/utils'
import Mock from 'mockjs'

const userMap = {
  admin: {
    roles: ['admin'],
    token: 'admin',
    introduction: '我是超级管理员',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  editor: {
    roles: ['editor'],
    token: 'editor',
    introduction: '我是编辑',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  },
  userInfo: Mock.mock({
    id: '@increment',
    username: '@name',
    email: '@email',
    state: 'active',
    name: '@name',
    fullname: '@name',
    reviewer: '@first',
    created_at: '@datetime',
    last_sign_in_at: '@datetime',
    current_sign_in_at: '@now',
    projects_size: 100
  })
}

export default {
  loginByUsername: config => {
    const { username } = JSON.parse(config.body)
    if (username == 'admin') {
      userMap['userInfo'].projects_size = 100
    } else {
      userMap['userInfo'].projects_size = 200
    }
    // mock 永远返回超管
    return userMap['admin']
  },
  getUserInfo: config => {
    const { token } = param2Obj(config.url)
    if (userMap[token]) {
      return Object.assign(userMap[token], userMap['userInfo'])
    } else {
      return false
    }
  },
  logout: () => 'success',
  changePwd: (config) => {
    console.log(config.body)
    return {
      status: 'success'
    }
  }
}
