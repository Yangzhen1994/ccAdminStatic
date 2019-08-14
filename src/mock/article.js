import Mock from 'mockjs'
import {param2Obj} from '@/utils'

const List = []
const userList = []
const exampleArr = []
const count = 100

for (let i = 0; i < count; i++) {
  userList.push(Mock.mock({
    id: '@increment',
    realname: '@cname',
    loginname: '@name',
    'belongApart|1': ['公安局', '统计局', '卫计委'],
    'belongRole|1': ['委办局用户', '系统管理用户', '数据质量用户', '角色一'],
    description: '',
    phonenumber: '13102127896',
    'state|1': ['started', 'disabled']
  }))
  List.push(Mock.mock({
    id: '@increment',
    appdesc: +Mock.Random.date('T'),
    appname: '@first',
    reviewer: '@first',
    appaddress: '@title(5, 10)',
    forecast: '@float(0, 100, 2, 2)',
    importance: '@integer(1, 3)',
    'type|1': ['CN', 'US', 'JP', 'EU'],
    'status|1': ['正常', '错误', '关闭'],
    display_time: '@datetime',
    apptype: '@integer(300, 5000)',
    created_time: '@datetime',
    latest_build: '@pick(["v1.2.0","v1.2.1","v1.2.3"])',
    testenv: {
      'build|1': [true, false],
      example: {
        currentVal: '@integer(1,10)',
        totalVal: '@integer(10,1000)'
      },
      version: '@pick(["v1.1.0","v1.1.1","v1.1.2"])',
      url: '@url',
      'status|1': ['none', 'running', 'stopped', 'error', 'failed']
    },
    prodenv: {
      'build|1': [true, false],
      example: {
        currentVal: '@integer(1,10)',
        totalVal: '@integer(10,1000)'
      },
      version: '@pick(["v1.1.0","v1.1.1","v1.1.2"])',
      url: '@url',
      'status|1': ['none', 'running', 'stopped', 'error', 'failed']
    },
    appResmirror: '@url',
    codeAddress: '@url'
  }))
}

export default {
  changeUserPwd: config => {
    const  data = JSON.parse(config.body);
    console.log(data)
    return {code: 200}
  },
  editUser: config => {
    const newUser = JSON.parse(config.body);
    console.log(newUser)
    userList.forEach((item, index) => {
      if(item.id == newUser.id ){
        userList.splice(index,1)
        userList.splice(index,0,Object.assign({}, item, newUser))
      }
    })

    return {code: 200}
  },
  addUser: config => {
    const newUser = JSON.parse(config.body);
    newUser.id = userList.length + 1
    newUser.state = 'started'
    newUser.belongApart = newUser.roleList.join(',')
    userList.push(newUser)

    return {code: 200}
  },
  delUser: config => {
    console.log(typeof config.body)
    const delarr = eval(config.body);
    console.log(delarr)
    delarr.forEach((itemdel, indexdel) => {
      userList.forEach((item, index) => {
        if (item.id == itemdel) {
          userList.splice(index, 1)
        }
      })
    })
    return {code: 200}
  },
  changeUserState: config => {
    const {id, state} = JSON.parse(config.body)
    userList.forEach((item, index) => {
      if (item.id == id) {
        item.state = state
      }
    })
    return {code: 200}
  },
  getUserList: config => {
    console.log(config.url)
    let {importance, type, title, page = 1, size = 10, sort, apart, role} = param2Obj(config.url)
    let mockList = userList.filter(item => {
      if (importance && item.importance !== +importance) return false
      if (type && item.type !== type) return false
      if (title && item.title.indexOf(title) < 0) return false
      if (apart && item.belongApart.indexOf(apart) < 0 && apart != 'all') return false
      if (role && item.belongRole.indexOf(role) < 0 && role != 'all') return false
      return true
    })

    if (sort === '-id') {
      mockList = mockList.reverse()
    }

    const pageList = mockList.filter((item, index) => index < size * page && index >= size * (page - 1))
    console.log(page, size)
    return {
      total: mockList.length,
      items: pageList
    }
  },
  getList: config => {
    const {importance, type, title, page = 1, size = 20, sort} = param2Obj(config.url)

    let mockList = List.filter(item => {
      if (importance && item.importance !== +importance) return false
      if (type && item.type !== type) return false
      if (title && item.title.indexOf(title) < 0) return false
      return true
    })

    if (sort === '-id') {
      mockList = mockList.reverse()
    }

    const pageList = mockList.filter((item, index) => index < size * page && index >= size * (page - 1))

    return {
      total: mockList.length,
      items: pageList
    }
  },
  getPv: () => ({
    pvData: [{key: 'PC', pv: 1024}, {key: 'mobile', pv: 1024}, {key: 'ios', pv: 1024}, {key: 'android', pv: 1024}]
  }),
  getArticle: () => ({
    id: 120000000001,
    author: {key: 'mockPan'},
    source_name: '原创作者',
    category_item: [{key: 'global', name: '全球'}],
    comment_disabled: true,
    content: '<p>我是测试数据我是测试数据</p><p><img class="wscnph" src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943" data-wscntype="image" data-wscnh="300" data-wscnw="400" data-mce-src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>"',
    content_short: '我是测试数据',
    display_time: +new Date(),
    image_uri: 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3',
    platforms: ['a-platform'],
    source_uri: 'https://github.com/PanJiaChen/vue-element-admin',
    status: 'published',
    tags: [],
    title: 'vue-element-admin'
  }),
  createArticle: () => ({
    data: 'success'
  }),
  updateArticle: () => ({
    data: 'success'
  })
}
