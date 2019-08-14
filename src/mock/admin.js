/**
 * @author yz
 * @date 2019/5/28
 * @Description:admin mock
 */
import Mock from 'mockjs'
import { param2Obj } from '@/utils'

const List = []
const NodesList = []
const NodesListTest = []
const NodesListProd = []
const ContainersList = []
const count = 100
/* none|running|stopped|error|failed*/
for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    appdesc: +Mock.Random.date('T'),
    name: '@first',
    ip: '@ip',
    pods: '@integer(1, 10)',
    boxname: '@first',
    reviewer: '@first',
    appaddress: '@title(5, 10)',
    forecast: '@float(0, 100, 2, 2)',
    importance: '@integer(1, 3)',
    'type|1': ['CN', 'US', 'JP', 'EU'],
    'status|1': ['none', 'running', 'stopped', 'error', 'failed'],
    display_time: '@datetime',
    apptype: '@integer(300, 5000)',
    'env|1': ['test', 'prod', 'all']
  }))
  ContainersList.push(Mock.mock({
    id: '@increment',
    appdesc: +Mock.Random.date('T'),
    name: '@first',
    ip: '@ip',
    appname: '@first',
    nodes: '@integer(1, 10)',
    boxname: '@first',
    reviewer: '@first',
    appaddress: '@title(5, 10)',
    forecast: '@float(0, 100, 2, 2)',
    importance: '@integer(1, 3)',
    'type|1': ['CN', 'US', 'JP', 'EU'],
    'status|1': ['none', 'running', 'stopped', 'error', 'failed'],
    display_time: '@datetime',
    apptype: '@integer(300, 5000)',
    'env|1': ['test', 'prod', 'all']
  }))
  NodesList.push(Mock.mock({
    id: '@increment',
    appdesc: +Mock.Random.date('T'),
    name: '@first',
    ip: '@ip',
    pods: '@integer(1, 10)',
    reviewer: '@first',
    appaddress: '@title(5, 10)',
    forecast: '@float(0, 100, 2, 2)',
    importance: '@integer(1, 3)',
    'type|1': ['CN', 'US', 'JP', 'EU'],
    'status|1': ['none', 'running', 'stopped', 'error', 'failed'],
    display_time: '@datetime',
    apptype: '@integer(300, 5000)',
    'env|1': ['test', 'prod', 'all']
  }))
  NodesListTest.push(Mock.mock({
    id: '@increment',
    appdesc: +Mock.Random.date('T'),
    name: '@first',
    ip: '@ip',
    pods: '@integer(1, 10)',
    reviewer: '@first',
    appaddress: '@title(5, 10)',
    forecast: '@float(0, 100, 2, 2)',
    importance: '@integer(1, 3)',
    'type|1': ['CN', 'US', 'JP', 'EU'],
    'status|1': ['none', 'running', 'stopped', 'error', 'failed'],
    display_time: '@datetime',
    apptype: '@integer(300, 5000)',
    'env|1': ['test']
  }))
  NodesListProd.push(Mock.mock({
    id: '@increment',
    appdesc: +Mock.Random.date('T'),
    name: '@first',
    ip: '@ip',
    pods: '@integer(1, 10)',
    reviewer: '@first',
    appaddress: '@title(5, 10)',
    forecast: '@float(0, 100, 2, 2)',
    importance: '@integer(1, 3)',
    'type|1': ['CN', 'US', 'JP', 'EU'],
    'status|1': ['none', 'running', 'stopped', 'error', 'failed'],
    display_time: '@datetime',
    apptype: '@integer(300, 5000)',
    'env|1': ['prod']
  }))
}

export default {
  getClusterInfo: config => {
    return [
      {
        name: 'production',
        create_at: '2019-04-20 10:00:00.000',
        nodes: 3,
        apps: 5,
        containers: 12
      },
      {
        name: 'sandbox',
        create_at: '2019-04-20 10:00:00.000',
        nodes: 5,
        apps: 8,
        containers: 12
      }
    ]
  },
  getClusterInfoP: config => {
    return [
      {
        name: 'production',
        create_at: '2019-04-20 10:00:00.000',
        nodes: 3,
        apps: 5,
        containers: 12
      }
    ]
  },
  getClusterInfoS: config => {
    return [
      {
        name: 'sandbox',
        create_at: '2019-04-20 10:00:00.000',
        nodes: 5,
        apps: 8,
        containers: 12
      }
    ]
  },
  getClusterNodesSandbox: config => {
    console.log(config)
    const { importance, type, title, page = 1, size = 20, sort, env } = param2Obj(config.url)

    let mockList = NodesListTest.filter(item => {
      if (item.env !== env && env) return false
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
  getClusterNodesProduction: config => {
    console.log(config)
    const { importance, type, title, page = 1, size = 20, sort, env } = param2Obj(config.url)

    let mockList = NodesListProd.filter(item => {
      if (item.env !== env && env) return false
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
  getClusterNodesAll: config => {
    const { importance, type, title, page = 1, size = 20, sort, env } = param2Obj(config.url)
    const allNodes = NodesListProd.concat(NodesListTest)
    let mockList = allNodes.filter(item => {
      // if (item.env !== env && env) return false
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
  getClusterNodeInfo: (config) => {
    // alert('节点信息')
    const name = config.url.split('/').reverse()[0]
    const allNodes = NodesListProd.concat(NodesListTest)
    const mockList = allNodes.filter(item => {
      if (item.name === name) {
        return true
      }
    })
    return mockList[0]
  },
  getClusterNodeStatus: (config) => {
    // alert('获取节点状态')
    const name = config.url.split('/').reverse()[1]
    const allNodes = NodesListProd.concat(NodesListTest)
    const mockList = allNodes.filter(item => {
      if (item.name === name) {
        return true
      }
    })
    return {
      status: mockList[0].status
    }
  },
  getClusterStatus: (config) => {
    return {
      status: List[0].status
    }
  },
  getClusterNodeUsages: (config) => {
    // alert('获取节点资源使用量')
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
  getClusterNodeContainers: config => {
    const { importance, type, title, page = 1, size = 20, sort, env } = param2Obj(config.url)
    let mockList = ContainersList.filter(item => {
      // if (item.env !== env && env) return false
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
  })
}
