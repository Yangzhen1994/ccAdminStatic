import Mock from 'mockjs'
import {param2Obj} from '@/utils'

const List = []
const userList = []
const roleUserList = []
const appList = []
const roleList = []
const exampleArr = []
const count = 100

for (let i = 0; i < count; i++) {

  roleList.push(Mock.mock({
    id: '@guid',
    'rolename|1': ['委办局用户', '系统管理用户', '数据质量用户', '角色一'],
    roledesc: '@cparagraph(1,1)',
    relativeuser: '@integer(1,100)',
    relativeapp: '@integer(1,100)'
  }))
  appList.push(Mock.mock({
    id: '@guid',
    'apptype|1': ['专题应用', '基础平台', '数据中枢-数据服务', '数据中枢-数据治理', '数据中枢-资源目录', '数据中枢-数据湖', '数据中枢-数据通', '数据中枢-基础支撑与服务'],
    'appname|1': ['智慧城管', '城市运行管理平台', '数据共享服务平台', '数据质量管理平台', '资源目录管理系统'],
    appdesc: '@cparagraph(1,1)',
    'state|1': [true, false],
    indexurl: '@url',
    interface: '@ip',
    index: '@integer(0,100)',
    icon: '@image',
    iconname: 'test.png',
  }))
  userList.push(Mock.mock({
    id: '@guid',
    realname: '@cname',
    loginname: '@name',
    'belongApart|1': ['公安局', '统计局', '卫计委'],
    'belongRole|1': ['委办局用户', '系统管理用户', '数据质量用户', '角色一'],
    description: '',
    phonenumber: '13102127896',
    'state|1': ['started', 'disabled']
  }))
  roleUserList.push(Mock.mock({
    id: '@guid',
    realname: '@cname',
    loginname: '@name',
    'belongApart|1': ['公安局', '统计局', '卫计委'],
    description: '',
    phonenumber: '13102127896',
    'state|1': ['started', 'disabled']
  }))
  List.push(Mock.mock({
    id: '@guid',
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
    const data = JSON.parse(config.body);
    console.log(data)
    return {code: 200}
  },
  editUser: config => {
    const newUser = JSON.parse(config.body);
    console.log(newUser)
    userList.forEach((item, index) => {
      if (item.id == newUser.id) {
        userList.splice(index, 1)
        userList.splice(index, 0, Object.assign({}, item, newUser))
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
    let {importance, type, title, page = 1, size = 10, sort, apart, role,search} = param2Obj(config.url)
    let mockList = userList.filter(item => {
      if (importance && item.importance !== +importance) return false
      if (type && item.type !== type) return false
      if (title && item.title.indexOf(title) < 0) return false
      if (apart && item.belongApart.indexOf(apart) < 0 && apart != 'all') return false
      if (role && item.belongRole.indexOf(role) < 0 && role != 'all') return false
      if (search && item.loginname.indexOf(search) < 0 && item.realname.indexOf(search) < 0 && item.phonenumber.indexOf(search) < 0) return false
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
  getAppList: config => {
    const {importance, type, title, page = 1, size = 20, sort,search} = param2Obj(config.url)

    let mockList = appList.filter(item => {
      if (importance && item.importance !== +importance) return false
      if (type && item.type !== type) return false
      if (title && item.title.indexOf(title) < 0) return false
      if (search && item.appname.indexOf(search) < 0) return false
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
  editApp: config => {
    const newApp = JSON.parse(config.body);
    appList.forEach((item, index) => {
      if (item.id == newApp.id) {
        appList.splice(index, 1)
        appList.splice(index, 0, Object.assign({}, item, newApp))
      }
    })

    return {code: 200}
  },
  addApp: config => {
    const newApp = JSON.parse(config.body);
    newApp.id = appList.length + 1

    appList.push(newApp)

    return {code: 200}
  },
  delApp: config => {
    console.log(typeof config.body)
    const delarr = eval(config.body);
    console.log(delarr)
    delarr.forEach((itemdel, indexdel) => {
      appList.forEach((item, index) => {
        if (item.id == itemdel) {
          appList.splice(index, 1)
        }
      })
    })
    return {code: 200}
  },
  getRoleList: config => {
    const {importance, type, title, page = 1, size = 20, sort,search} = param2Obj(config.url)

    let mockList = roleList.filter(item => {
      if (importance && item.importance !== +importance) return false
      if (type && item.type !== type) return false
      if (title && item.title.indexOf(title) < 0) return false
      if (search && item.rolename.indexOf(search) < 0) return false
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
  editRole: config => {
    const newRole = JSON.parse(config.body);
    roleList.forEach((item, index) => {
      if (item.id == newRole.id) {
        roleList.splice(index, 1)
        roleList.splice(index, 0, Object.assign({}, item, newRole))
      }
    })

    return {code: 200}
  },
  addRole: config => {
    const newRole = JSON.parse(config.body);
    newRole.id = roleList.length + 1

    roleList.push(newRole)

    return {code: 200}
  },
  delRole: config => {
    const delObj = JSON.parse(config.body);
    roleList.forEach((item, index) => {
      if (item.id == delObj.id) {
        roleList.splice(index, 1)
      }
    })
    return {code: 200}
  },
  getRoleUserList: config => {
    console.log(config.url)
    let {importance, type, title, page = 1, size = 10, sort, apart, role,search} = param2Obj(config.url)
    let mockList = roleUserList.filter(item => {
      if (importance && item.importance !== +importance) return false
      if (type && item.type !== type) return false
      if (title && item.title.indexOf(title) < 0) return false
      if (search && item.loginname.indexOf(search) < 0 && item.realname.indexOf(search) < 0) return false
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
  addRoleUser: config => {
    const newRoleUser = JSON.parse(config.body);
    newRoleUser.id = roleUserList.length + 1
    roleUserList.push(newRoleUser)

    return {code: 200}
  },
  delRoleUser: config => {
    console.log(typeof config.body)
    const delarr = eval(config.body);
    console.log(delarr)
    delarr.forEach((itemdel, indexdel) => {
      roleUserList.forEach((item, index) => {
        if (item.id == itemdel) {
          roleUserList.splice(index, 1)
        }
      })
    })
    return {code: 200}
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
