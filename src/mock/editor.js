/**
 * @author yz
 * @date 2019/5/30
 * @Description:
 */
import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const AppList = []
const List = []
const IsoList = []
let ConfigsList = []
const fetchCodeRepoVList = []
const fetchImageRepoVList = []
const resourceDataList = []
const configDataList = []
const count = 100

for (let i = 0; i < count; i++) {
  AppList.push(Mock.mock({
    id: '@increment',
    name: '@first',
    reviewer: '@first',
    code_repo: '@url',
    image_repo: '@url',
    domain: '@domain',
    definition: '@cparagraph(2)',
    forecast: '@float(0, 100, 2, 2)',
    importance: '@integer(1, 3)',
    'type|1': ['simple', 'compose'],
    'state|1': ['进行中', '完成', '失败'],
    report: '@url',
    display_time: '@datetime',
    apptype: '@integer(300, 5000)',
    start_at: '@datetime',
    created_at: '@datetime',
    latest_build: '@pick(["v1.2.0","v1.2.1","v1.2.3"])',
    version: '@pick(["v1.1.0","v1.1.1","v1.1.2"])',
    appResmirror: '@url',
    codeAddress: '@url',
    'testbuild|1': [true, false],
    'prodbuild|1': [true, false]
  }))
  List.push(Mock.mock({
    id: '@increment',
    buildno: '@increment',
    appdesc: +Mock.Random.date('T'),
    appname: '@first',
    reviewer: '@first',
    appaddress: '@title(5, 10)',
    forecast: '@float(0, 100, 2, 2)',
    importance: '@integer(1, 3)',
    'type|1': ['CN', 'US', 'JP', 'EU'],
    report: '@url',
    display_time: '@datetime',
    apptype: '@integer(300, 5000)',
    start_at: '@datetime',
    build_at: '@datetime',
    'result|1': ['Successed', 'Failed', 'Abort'],
    latest_build: '@pick(["v1.2.0","v1.2.1","v1.2.3"])',
    version: '@pick(["v1.1.0","v1.1.1","v1.1.2"])',
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
  IsoList.push(Mock.mock({
    image: 'user1/app1',
    id: '@increment',
    description: '@cparagraph(1, 3)',
    isoname: '@first',
    reviewer: '@first',
    isoaddress: '@url',
    forecast: '@float(0, 100, 2, 2)',
    importance: '@integer(1, 3)',
    'type|1': ['CN', 'US', 'JP', 'EU'],
    'status|1': ['进行中', '完成', '失败'],
    report: '@url',
    display_time: '@datetime',
    apptype: '@integer(300, 5000)',
    start_at: '@datetime',
    created_at: '@datetime',
    last_version: '@pick(["v1.2.0","v1.2.1","v1.2.3"])',
    version: '@pick(["v1.1.0","v1.1.1","v1.1.2"])',
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
  ConfigsList.push(Mock.mock({
    id: '@increment',
    description: '@cparagraph(1)',
    name: '@first',
    owner: 'uesr1',
    reviewer: '@first',
    configaddress: '@url',
    forecast: '@float(0, 100, 2, 2)',
    importance: '@integer(1, 3)',
    'type|1': ['CN', 'US', 'JP', 'EU'],
    'status|1': ['进行中', '完成', '失败'],
    report: '@url',
    createTime: '@datetime',
    apptype: '@integer(300, 5000)',
    start_at: '@datetime',
    last_version: '@pick(["v1.2.0","v1.2.1","v1.2.3"])',
    latest_build: '@pick(["v1.2.0","v1.2.1","v1.2.3"])',
    version: '@pick(["v1.1.0","v1.1.1","v1.1.2"])',
    versions: [
      'v1',
      'v2'
    ],
    testenv: {
      'build|1': [true, false],
      example: {
        currentVal: '@integer(1,10)',
        totalVal: '@integer(10,1000)'
      },
      version: ['v1.1.0', 'v1.1.1', 'v1.1.2'],
      url: '@url',
      'status|1': ['none', 'running', 'stopped', 'error', 'failed']
    },
    prodenv: {
      'build|1': [true, false],
      example: {
        currentVal: '@integer(1,10)',
        totalVal: '@integer(10,1000)'
      },
      version: ['v1.1.0', 'v1.1.1', 'v1.1.2'],
      url: '@url',
      'status|1': ['none', 'running', 'stopped', 'error', 'failed']
    },
    appResmirror: '@url',
    codeAddress: '@url'
  }))
}

for (let i = 0; i < 2; i++) {
  const strArr = ['v2.1.0', 'v2.0.0']
  fetchCodeRepoVList.push(strArr[i])
  fetchImageRepoVList.push(strArr[i])
  resourceDataList.push(Mock.mock({
    'scale': '@integer(1,10)',
    'size|1': ['tiny', 'standard', 'large', 'huge'],
    'autoRecovery|1': [true, false]
  }))
  configDataList.push(Mock.mock({
    version: '1.0.1',
    versions: ['v1.1.0', 'v1.1.1', 'v1.1.2'],
    ports: [{
      outport: '8080',
      inport: '80'
    }, {
      outport: '8081',
      inport: '81'
    }]
  }))
}

export default {
  fetchAppList: config => {
    const { importance, type, title, page = 1, size = 20, sort } = param2Obj(config.url)

    let mockList = AppList.filter(item => {
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
  searchAppByKeyword: config => {
    const { importance, type, title, page = 1, size = 20, sort, owner, search } = param2Obj(config.url)
    let mockList = AppList.filter(item => {
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
    console.log({
      total: mockList.length,
      items: pageList
    })
    return {
      total: mockList.length,
      items: pageList
    }
  },
  searchIsoByKeyword: config => {
    const { importance, type, title, page = 1, size = 20, sort, owner, search } = param2Obj(config.url)
    let mockList = IsoList.filter(item => {
      if (importance && item.importance !== +importance) return false
      if (type && item.type !== type) return false
      if (title && item.title.indexOf(title) < 0) return false
      if (search && item.isoname.indexOf(search) < 0) return false
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
  getIsoVersions: (config) => {
    return ['v2.1.1', 'v2.2.1']
  },
  createApp: (config) => {
    const newApp = JSON.parse(config.body)
    console.log(config.body)
    AppList.push(Mock.mock({
      id: '@increment',
      name: '@first',
      appname: newApp.name,
      reviewer: '@first',
      code_repo: '@url',
      image_repo: '@url',
      domain: '@domain',
      definition: newApp.description,
      forecast: '@float(0, 100, 2, 2)',
      importance: '@integer(1, 3)',
      'type|1': ['simple', 'compose'],
      'state|1': ['进行中', '完成', '失败'],
      report: '@url',
      display_time: '@datetime',
      apptype: '@integer(300, 5000)',
      start_at: '@datetime',
      created_at: '@datetime',
      latest_build: '@pick(["v1.2.0","v1.2.1","v1.2.3"])',
      version: '@pick(["v1.1.0","v1.1.1","v1.1.2"])',
      appResmirror: '@url',
      codeAddress: '@url',
      'testbuild|1': [true, false],
      'prodbuild|1': [true, false]
    }))
    const length = AppList.length - 1
    return {
      data: AppList[length]
    }
  },
  getAppInfo: (config) => {
    let sendData = null
    const name = config.url.split('/').reverse()[0]
    sendData = AppList.filter((item) => {
      return item.appname === name
    })
    return sendData[0]
  },
  changeAppInfo: (config) => {
    // alert(config.url)
  },
  getAppResourceSandbox: (config) => {
    return resourceDataList[0]
  },
  getAppResourceProduction: (config) => {
    return resourceDataList[1]
  },
  setAppResourceSandbox: (config) => {
    const { size, scale, autoRecovery } = JSON.parse(config.body)
    resourceDataList[0] = { size, scale, autoRecovery }
    return { size, scale, autoRecovery, status: 'success' }
  },
  setAppResourceProduction: (config) => {
    const { size, scale, autoRecovery } = JSON.parse(config.body)
    resourceDataList[1] = { size, scale, autoRecovery }
    return { size, scale, autoRecovery, status: 'success' }
  },
  changeAppResourceSandbox: (config) => {
    alert(config.url)
  },
  changeAppResourceProduction: (config) => {
    alert(config.url)
  },
  setAppConfigSandbox: (config) => {
    const { version, port } = JSON.parse(config.body)
    if (version) {
      configDataList[0].version = version
    }
    if (port) {
      configDataList[0].ports.push(port)
    }
    return Object.assign({}, configDataList[0], { status: 'success' })
  },
  setAppConfigProduction: (config) => {
    const { version, port } = JSON.parse(config.body)
    if (version) {
      configDataList[1].version = version
    }
    if (port) {
      configDataList[1].ports.push(port)
    }
    return Object.assign({}, configDataList[1], { status: 'success' })
  },
  setAppConfigDelPortSandbox: (config) => {
    const { del } = JSON.parse(config.body)
    if (del) {
      configDataList[0].ports = configDataList[0].ports.filter((item) => {
        return item.outport !== del.outport
      })
    }
    return Object.assign({}, configDataList[0], { status: 'success' })
  },
  setAppConfigDelPortProduction: (config) => {
    const { del } = JSON.parse(config.body)
    if (del) {
      configDataList[1].ports = configDataList[1].ports.filter((item) => {
        return item.outport !== del.outport
      })
    }
    return Object.assign({}, configDataList[1], { status: 'success' })
  },
  getAppConfigSandbox: (config) => {
    return configDataList[0]
  },
  getAppConfigProduction: (config) => {
    return configDataList[1]
  },
  getAppStateSandbox: (config) => {
    return Mock.mock({
      version: '1.0.1',
      example: {
        currentVal: '@integer(1,10)',
        totalVal: '@integer(10,1000)'
      },
      containers: [
        {
          id: '@increment',
          'status|1': ['none', 'running', 'stopped', 'error', 'failed'],
          name: '@first',
          created_at: '@datetime',
          node: '@integer(1, 50)'
        },
        {
          'id': '@increment',
          'status|1': ['none', 'running', 'stopped', 'error', 'failed'],
          name: '@first',
          created_at: '@datetime',
          node: '@integer(1, 50)'
        }
      ],
      url: '@url',
      'status|1': ['none', 'running', 'stopped', 'error', 'failed']
    })
  },
  getAppStateProd: (config) => {
    return Mock.mock({
      version: '1.0.1',
      example: {
        currentVal: '@integer(1,10)',
        totalVal: '@integer(10,1000)'
      },
      containers: [
        {
          id: '@increment',
          'status|1': ['none', 'running', 'stopped', 'error', 'failed'],
          name: '@first',
          created_at: '@datetime',
          node: '@integer(1, 50)'
        },
        {
          'id': '@increment',
          'status|1': ['none', 'running', 'stopped', 'error', 'failed'],
          name: '@first',
          created_at: '@datetime',
          node: '@integer(1, 50)'
        }
      ],
      url: '@url',
      'status|1': ['none', 'running', 'stopped', 'error', 'failed']
    })
  },
  rearrangeAppSandbox: (config) => {
    return {
      status: 'success'
    }
  },
  rearrangeAppProduction: (config) => {
    return {
      status: 'success'
    }
  },
  delArrangeAppSandbox: (config) => {
    return {
      status: 'success'
    }
  },
  delArrangeAppProduction: (config) => {
    return {
      status: 'success'
    }
  },
  arrangeAppSandbox: (config) => {
    const { version, configvalue } = JSON.parse(config.body)
    return {
      configvalue,
      version,
      status: 'success'
    }
  },
  arrangeAppProduction: (config) => {
    const { version, configvalue } = JSON.parse(config.body)
    return {
      configvalue,
      version,
      status: 'success'
    }
  },
  getCurrentArrangeVersionSandbox: (config) => {
    return {
      version: 'v2.2.0'
    }
  },
  getCurrentArrangeVersionProduction: (config) => {
    return {
      version: 'v2.2.1'
    }
  },
  getAppLogSandbox: (config) => {
    return Mock.mock({
      log: '@cparagraph(3)'
    })
  },
  getAppLogProduction: (config) => {
    return Mock.mock({
      log: '@cparagraph(3)'
    })
  },
  getAppLogContainerSandbox: (config) => {
    // alert(1)
    return Mock.mock({
      log: '@cparagraph(3)'
    })
  },
  getAppLogContainerProduction: (config) => {
    return Mock.mock({
      log: '@cparagraph(3)'
    })
  },
  createCodeRes: (config) => {
    return {
      data: 'success'
    }
  },
  fetchCodeRepoV: (config) => {
    return fetchCodeRepoVList
  },
  fetchImageRepoV: (config) => {
    return fetchImageRepoVList
  },
  fetchBuildState: (config) => {
    return Mock.mock({
      'status|1': ['进行中', '完成', '失败'],
      start_at: '@datatime',
      end_at: '@datatime',
      log: '@cparagraph(2)'
    })
  },
  fetchBuildHistory: config => {
    const { importance, type, title, page = 1, size = 20, sort } = param2Obj(config.url)

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
    pvData: [{ key: 'PC', pv: 1024 }, { key: 'mobile', pv: 1024 }, { key: 'ios', pv: 1024 }, { key: 'android', pv: 1024 }]
  }),
  getArticle: () => ({
    id: 120000000001,
    author: { key: 'mockPan' },
    source_name: '原创作者',
    category_item: [{ key: 'global', name: '全球' }],
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
  }),
  fetchBuildReport: (config) => {
    return {
      data: 'success'
    }
  },
  createBuild: (config) => {
    List.push(Mock.mock({
      buildno: '@increment',
      id: '@increment',
      appdesc: +Mock.Random.date('T'),
      appname: '@first',
      reviewer: '@first',
      appaddress: '@title(5, 10)',
      forecast: '@float(0, 100, 2, 2)',
      importance: '@integer(1, 3)',
      'type|1': ['CN', 'US', 'JP', 'EU'],
      'status|1': ['完成'],
      report: '@url',
      display_time: '@datetime',
      apptype: '@integer(300, 5000)',
      start_at: '@now',
      build_at: '@now',
      latest_build: '@pick(["v1.2.0","v1.2.1","v1.2.3"])',
      version: '@pick(["v1.1.0","v1.1.1","v1.1.2"])',
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
    const length = List.length - 1
    return {
      'status': '启动',
      'start_at': new Date(),
      'buildno': List[length].buildno
    }
  },
  getAppUsages: (config) => {
    const type = config.url.split('/').reverse()[0]
    if (type === 'cpu') {
      return Mock.mock({
        requestNum: '@float(0, 0, 2, 3)',
        sizeNum: '@float(0, 0, 2, 3)',
        totalNum: 1
      })
    } else if (type === 'memory') {
      return Mock.mock({
        requestNum: '@float(0, 0, 2, 3)',
        sizeNum: '@float(0, 0, 2, 3)',
        totalNum: 1
      })
    } else if (type === 'disk') {
      return Mock.mock({
        requestNum: '@float(0, 0, 2, 3)',
        sizeNum: '@float(0, 0, 2, 3)',
        totalNum: 1
      })
    } else if (type === 'visited') {
      return {
        data: [120, 90, 100, 138, 142, 130, 130]
      }
    } else {
      return Mock.mock({
        cpu: {
          requestNum: '@float(0, 0, 2, 3)',
          sizeNum: '@float(0, 0, 2, 3)',
          totalNum: 1
        },
        memory: {
          requestNum: '@float(0, 0, 2, 3)',
          sizeNum: '@float(0, 0, 2, 3)',
          totalNum: 1
        },
        disk: {
          requestNum: '@float(0, 0, 2, 3)',
          sizeNum: '@float(0, 0, 2, 3)',
          totalNum: 1
        },
        container: {
          percentage: '@integer(1,100)%'
        }
      })
    }
  },
  fetchIsoList: (config) => {
    const { importance, type, title, page = 1, size = 20, sort } = param2Obj(config.url)

    let mockList = IsoList.filter(item => {
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
  fetchConfigsList: (config) => {
    const { importance, type, title, page = 1, size = 20, sort, search, owner } = param2Obj(config.url)

    let mockList = ConfigsList.filter(item => {
      if (importance && item.importance !== +importance) return false
      if (type && item.type !== type) return false
      if (title && item.title.indexOf(title) < 0) return false
      if (search && item.name.indexOf(search) < 0) return false
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
  getConfigInfo: (config) => {
    const id = config.url.split('/').reverse()[0]
    const returnList = ConfigsList.filter(item => {
      return item.id == id
    })
    console.log(returnList[0])
    return returnList[0]
  },
  getConfigVersions: (config) => {
    const id = config.url.split('/').reverse()[1]
    const returnList = ConfigsList.filter(item => {
      return item.id == id
    })
    console.log(returnList[0])
    return returnList[0].versions
  },
  getConfigVersion: (config) => {
    const id = config.url.split('/').reverse()[2]
    const version = config.url.split('/').reverse()[0]
    const returnList = ConfigsList.filter(item => {
      return item.id == id
    })
    console.log(returnList[0])
    return {
      key1: 'value1',
      key2: 'value2'
    }
  },
  createConfig: (config) => {
    const sendData = null
    const { name, description } = JSON.parse(config.body)
    /* alert(name)
    ConfigsList.forEach((item, index) => {
      if (item.name == name) {
        sendData = { ...item }
      }
    })*/
    ConfigsList.push(Mock.mock({
      id: '@increment',
      description: description,
      name: name,
      owner: 'uesr1',
      reviewer: '@first',
      configaddress: '@url',
      forecast: '@float(0, 100, 2, 2)',
      importance: '@integer(1, 3)',
      'type|1': ['CN', 'US', 'JP', 'EU'],
      'status|1': ['进行中', '完成', '失败'],
      report: '@url',
      createTime: '@datetime',
      apptype: '@integer(300, 5000)',
      start_at: '@datetime',
      last_version: '@pick(["v1.2.0","v1.2.1","v1.2.3"])',
      latest_build: '@pick(["v1.2.0","v1.2.1","v1.2.3"])',
      version: '@pick(["v1.1.0","v1.1.1","v1.1.2"])',
      versions: [
        'v1',
        'v2'
      ],
      testenv: {
        'build|1': [true, false],
        example: {
          currentVal: '@integer(1,10)',
          totalVal: '@integer(10,1000)'
        },
        version: ['v1.1.0', 'v1.1.1', 'v1.1.2'],
        url: '@url',
        'status|1': ['none', 'running', 'stopped', 'error', 'failed']
      },
      prodenv: {
        'build|1': [true, false],
        example: {
          currentVal: '@integer(1,10)',
          totalVal: '@integer(10,1000)'
        },
        version: ['v1.1.0', 'v1.1.1', 'v1.1.2'],
        url: '@url',
        'status|1': ['none', 'running', 'stopped', 'error', 'failed']
      },
      appResmirror: '@url',
      codeAddress: '@url'
    }))
    return {
      'status': '完成',
      'start_at': new Date(),
      'id': ConfigsList[ConfigsList.length - 1].id
    }
  },
  delConfig: (config) => {
    const id = config.url.split('/').reverse()[0]
    ConfigsList = ConfigsList.filter(item => {
      return item.id != id
    })
    return {
      code: 200
    }
  },
  createConfigVersion: (config) => {
    const id = config.url.split('/').reverse()[1]
    const list = ConfigsList.filter(item => {
      return item.id == id
    })
    list[0].versions.push('V3')
    return {
      code: 200
    }
  },
  delConfigVersion: (config) => {
    const id = config.url.split('/').reverse()[2]
    const version = config.url.split('/').reverse()[0]
    const list = ConfigsList.filter(item => {
      return item.id == id
    })
    list[0].versions.forEach((item, index) => {
      if (item == version) {
        list[0].versions.splice(index, 1)
      }
    })
    return {
      code: 200
    }
  },
  getAppConfigsSandbox: (config) => {
    return Mock.mock({
      version: '@pick(["v1.1.0","v1.1.1","v1.1.2"])',
      scale: '@integer(1, 3)',
      'size|1': ['standard', 'tiny', 'large', 'huge'],
      'autoRecycle|1': [true, false],
      ports: [
        {
          'type|1': ['CLUSTERIP', 'INGRESS', 'NODEPORT'],
          port: 80,
          nodeport: 8080
        },
        {
          'type|1': ['CLUSTERIP', 'INGRESS', 'NODEPORT'],
          port: 81,
          nodeport: 8080
        }
      ],
      config: {
        'v1.0.9': 'v1.0.9',
        'v1.1.0': 'v1.1.0'
      }
    })
  },
  getAppConfigsProduction: (config) => {
    return Mock.mock({
      version: '@pick(["v1.1.0","v1.1.1","v1.1.2"])',
      scale: '@integer(1, 3)',
      'size|1': ['standard', 'tiny', 'large', 'huge'],
      'autoRecycle|1': [true, false],
      ports: [
        {
          'type|1': ['CLUSTERIP', 'INGRESS', 'NODEPORT'],
          port: 83,
          nodeport: 8088
        },
        {
          'type|1': ['CLUSTERIP', 'INGRESS', 'NODEPORT'],
          port: 82,
          nodeport: 8087
        }
      ],
      config: {
        'v1.0.9': 'v1.0.9',
        'v1.1.0': 'v1.1.0'
      }
    })
  },
  setAppConfigsSandbox: (config) => {
    console.log(JSON.parse(config.body))
    return {
      status: 'success'
    }
  },
  setAppConfigsProduction: (config) => {
    console.log(JSON.parse(config.body))
    return {
      status: 'success'
    }
  },
  getAppGyState: (config) => {
    return {
      'id': 1,
      'name': 'test_app',
      'code_repo': {
        'type': 'GIT|SVN',
        'address': 'http://xxx.xx.xx',
        'branch': 'master'
      },
      'image_repo': 'https://registry.mscx.cn/user1/test_app',
      'create_time': '2012-05-23T08:00:58Z',
      'last_version': 'v1.2.0',
      'last_build_time': '2012-05-23T08:00:58Z',
      'deployment': {
        'production': {
          'state': 'running',
          'pods': '2/2',
          'version': 'v1.2.0',
          'domain': 'test-app.appcloud.cn'
        },
        'sandbox': {
          'state': 'running',
          'pods': '1/1',
          'version': 'v1.3.0',
          'domain': 'test-app.test.appcloud.cn'
        }
      }
    }
  },
  getCodeRepoConfigs: (config) => {
    const id = config.url.split('/').reverse()[1]
    return Mock.mock(
      {
        'scm|1': ['GIT', 'SVN'],
        'type|1': ['local', 'remote'],
        address: '@url',
        inCodeRepo: '@url',
        'branch': 'master',
        'authType|1': ['UserPassword', 'SSHKey', 'OAuth'],
        'credential': 'YANGZH\n32131'
      }
    )
  },
  setCodeRepoConfigs: (config) => {
    const data = JSON.parse(config.body)
    console.log(data)
    return {
      status: 200
    }
  }
}
