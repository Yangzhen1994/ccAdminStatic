import Mock from 'mockjs'
import loginAPI from './login'
import articleAPI from './article'
import adminAPI from './admin'
import editorAPI from './editor'
import remoteSearchAPI from './remoteSearch'
import transactionAPI from './transaction'

// Mock.setup({
//   timeout: '350-600'
// })

// 登录相关
Mock.mock(/\/auth\/login/, 'post', loginAPI.loginByUsername)
Mock.mock(/\/auth\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/user\.*/, 'get', loginAPI.getUserInfo)
Mock.mock(/\/user\.*/, 'put', loginAPI.changePwd)

// 文章相关
Mock.mock(/\/article\/list/, 'get', articleAPI.getList)
Mock.mock(/\/article\/detail/, 'get', articleAPI.getArticle)
Mock.mock(/\/article\/pv/, 'get', articleAPI.getPv)
Mock.mock(/\/article\/create/, 'post', articleAPI.createArticle)
Mock.mock(/\/article\/update/, 'post', articleAPI.updateArticle)

// 搜索相关
Mock.mock(/\/search\/user/, 'get', remoteSearchAPI.searchUser)

// 账单相关
Mock.mock(/\/transaction\/list/, 'get', transactionAPI.getList)

// admin相关
// 节点资源使用
Mock.mock(/\/clusters\/.*\/nodes\/.*\/usages\/cpu/, 'get', adminAPI.getClusterNodeUsages)
Mock.mock(/\/clusters\/.*\/nodes\/.*\/usages\/memory/, 'get', adminAPI.getClusterNodeUsages)
Mock.mock(/\/clusters\/.*\/nodes\/.*\/usages\/disk/, 'get', adminAPI.getClusterNodeUsages)
Mock.mock(/\/clusters\/.*\/nodes\/.*\/usages/, 'get', adminAPI.getClusterNodeUsages)
// 集群资源使用
Mock.mock(/\/clusters\/sandbox\/usages\/cpu/, 'get', adminAPI.getClusterNodeUsages)
Mock.mock(/\/clusters\/sandbox\/usages\/memory/, 'get', adminAPI.getClusterNodeUsages)
Mock.mock(/\/clusters\/sandbox\/usages\/disk/, 'get', adminAPI.getClusterNodeUsages)
Mock.mock(/\/clusters\/sandbox\/usages/, 'get', adminAPI.getClusterNodeUsages)
Mock.mock(/\/clusters\/production\/usages\/cpu/, 'get', adminAPI.getClusterNodeUsages)
Mock.mock(/\/clusters\/production\/usages\/memory/, 'get', adminAPI.getClusterNodeUsages)
Mock.mock(/\/clusters\/production\/usages\/disk/, 'get', adminAPI.getClusterNodeUsages)
Mock.mock(/\/clusters\/production\/usages/, 'get', adminAPI.getClusterNodeUsages)
// 模拟容器列表
Mock.mock(/\/clusters\/nodes\/.*\/containers/, 'get', adminAPI.getClusterNodeContainers)
// 节点列表
Mock.mock(/\/clusters\/sandbox\/nodes?.*$/, 'get', adminAPI.getClusterNodesSandbox)
Mock.mock(/\/clusters\/production\/nodes?.*$/, 'get', adminAPI.getClusterNodesProduction)
// 节点状态
Mock.mock(/\/clusters\/.*\/nodes\/.*\/status$/, 'get', adminAPI.getClusterNodeStatus)
// 节点信息
Mock.mock(/\/clusters\/.*\/nodes\/.*$/, 'get', adminAPI.getClusterNodeInfo)
Mock.mock(/\/clusters\/nodes?.*$/, 'get', adminAPI.getClusterNodesAll)
// 集群状态
Mock.mock(/\/clusters\/production\/status/, 'get', adminAPI.getClusterStatus)
Mock.mock(/\/clusters\/sandbox\/status/, 'get', adminAPI.getClusterStatus)
// 集群信息
Mock.mock(/\/clusters\/production$/, 'get', adminAPI.getClusterInfoP)
Mock.mock(/\/clusters\/sandbox$/, 'get', adminAPI.getClusterInfoS)
Mock.mock(/\/clusters$/, 'get', adminAPI.getClusterInfo)

Mock.mock(/\/article\/detail/, 'get', adminAPI.getArticle)
Mock.mock(/\/article\/pv/, 'get', adminAPI.getPv)
Mock.mock(/\/article\/create/, 'post', adminAPI.createArticle)
Mock.mock(/\/article\/update/, 'post', adminAPI.updateArticle)
// editor相关
Mock.mock(/\/apps\/.*\/deploy\/sandbox\/spec/, 'get', editorAPI.getAppConfigsSandbox)
Mock.mock(/\/apps\/.*\/deploy\/production\/spec/, 'get', editorAPI.getAppConfigsProduction)
Mock.mock(/\/apps\/.*\/deploy\/sandbox\/spec/, 'post', editorAPI.setAppConfigsSandbox)
Mock.mock(/\/apps\/.*\/deploy\/production\/spec/, 'post', editorAPI.setAppConfigsProduction)
Mock.mock(/\/apps\/.*\/usages\/sandbox\/cpu/, 'get', editorAPI.getAppUsages)
Mock.mock(/\/apps\/.*\/usages\/sandbox\/memory/, 'get', editorAPI.getAppUsages)
Mock.mock(/\/apps\/.*\/usages\/sandbox\/disk/, 'get', editorAPI.getAppUsages)
Mock.mock(/\/apps\/.*\/usages\/sandbox\/visited/, 'get', editorAPI.getAppUsages)
Mock.mock(/\/apps\/.*\/usages\/sandbox/, 'get', editorAPI.getAppUsages)
Mock.mock(/\/apps\/.*\/usages\/production\/cpu/, 'get', editorAPI.getAppUsages)
Mock.mock(/\/apps\/.*\/usages\/production\/memory/, 'get', editorAPI.getAppUsages)
Mock.mock(/\/apps\/.*\/usages\/production\/disk/, 'get', editorAPI.getAppUsages)
Mock.mock(/\/apps\/.*\/usages\/production\/visited/, 'get', editorAPI.getAppUsages)
Mock.mock(/\/apps\/.*\/usages\/production/, 'get', editorAPI.getAppUsages)

Mock.mock(/\/apps\/.*\/coderepo\/versions$/, 'get', editorAPI.fetchCodeRepoV)
Mock.mock(/\/apps\/.*\/imagerepo\/versions$/, 'get', editorAPI.fetchImageRepoV)
Mock.mock(/\/apps\/.*\/builds\/.*\/report$/, 'get', editorAPI.fetchBuildReport)
Mock.mock(/\/apps\/.*\/builds\/.*/, 'get', editorAPI.fetchBuildState)
Mock.mock(/\/apps\/.*\/builds/, 'get', editorAPI.fetchBuildHistory)
Mock.mock(/\/apps\/.*\/builds$/, 'post', editorAPI.createBuild)
Mock.mock(/\/apps\/.*\/resource\/sandbox/, 'get', editorAPI.getAppResourceSandbox)
Mock.mock(/\/apps\/.*\/resource\/production/, 'get', editorAPI.getAppResourceProduction)
Mock.mock(/\/apps\/.*\/resource\/sandbox/, 'post', editorAPI.setAppResourceSandbox)
Mock.mock(/\/apps\/.*\/resource\/production/, 'post', editorAPI.setAppResourceProduction)
Mock.mock(/\/apps\/.*\/resource\/sandbox/, 'put', editorAPI.changeAppResourceSandbox)
Mock.mock(/\/apps\/.*\/resource\/production/, 'put', editorAPI.changeAppResourceProduction)
Mock.mock(/\/apps\/.*\/config\/delport\/sandbox$/, 'post', editorAPI.setAppConfigDelPortSandbox)
Mock.mock(/\/apps\/.*\/config\/delport\/production$/, 'post', editorAPI.setAppConfigDelPortProduction)
Mock.mock(/\/apps\/.*\/config\/sandbox/, 'post', editorAPI.setAppConfigSandbox)
Mock.mock(/\/apps\/.*\/config\/production/, 'post', editorAPI.setAppConfigProduction)
Mock.mock(/\/apps\/.*\/deploy\/sandbox/, 'put', editorAPI.rearrangeAppSandbox)
Mock.mock(/\/apps\/.*\/deploy\/production/, 'put', editorAPI.rearrangeAppProduction)
Mock.mock(/\/apps\/.*\/deploy\/sandbox/, 'delete', editorAPI.delArrangeAppSandbox)
Mock.mock(/\/apps\/.*\/deploy\/production/, 'delete', editorAPI.delArrangeAppProduction)
Mock.mock(/\/apps\/.*\/deploy\/production/, 'post', editorAPI.arrangeAppProduction)
Mock.mock(/\/apps\/.*\/deploy\/sandbox/, 'post', editorAPI.arrangeAppSandbox)

Mock.mock(/\/apps\/.*\/version\/sandbox/, 'get', editorAPI.getCurrentArrangeVersionSandbox)
Mock.mock(/\/apps\/.*\/version\/production/, 'get', editorAPI.getCurrentArrangeVersionProduction)
Mock.mock(/\/apps\/.*\/logtail\/sandbox/, 'get', editorAPI.getAppLogSandbox)
Mock.mock(/\/apps\/.*\/logtail\/production/, 'get', editorAPI.getAppLogProduction)
Mock.mock(/\/apps\/.*\/.*\/logtail\/sandbox/, 'get', editorAPI.getAppLogContainerSandbox)
Mock.mock(/\/apps\/.*\/.*\/logtail\/production/, 'get', editorAPI.getAppLogContainerProduction)

Mock.mock(/\/apps\/.*\/config\/sandbox/, 'get', editorAPI.getAppConfigSandbox)
Mock.mock(/\/apps\/.*\/config\/production/, 'get', editorAPI.getAppConfigProduction)
Mock.mock(/\/apps\/.*\/status\/sandbox/, 'get', editorAPI.getAppStateSandbox)
Mock.mock(/\/apps\/.*\/status\/production/, 'get', editorAPI.getAppStateProd)
Mock.mock(/\/apps\/.*\/status$/, 'get', editorAPI.getAppGyState)
Mock.mock(/\/apps\/.*\/coderepo\/create/, 'get', editorAPI.createCodeRes)
Mock.mock(/\/apps\/.*\/coderepo$/, 'get', editorAPI.getCodeRepoConfigs)
Mock.mock(/\/apps\/.*\/coderepo$/, 'post', editorAPI.setCodeRepoConfigs)
Mock.mock(/\/apps\/?.*/, 'get', editorAPI.searchAppByKeyword)
Mock.mock(/\/apps\/.*/, 'get', editorAPI.getAppInfo)
Mock.mock(/\/apps\/.*/, 'put', editorAPI.changeAppInfo)
Mock.mock(/\/apps/, 'get', editorAPI.fetchAppList)
Mock.mock(/\/apps/, 'post', editorAPI.createApp)
Mock.mock(/\/imagerepos\/search?.*/, 'get', editorAPI.searchIsoByKeyword)
Mock.mock(/\/imagerepos\/.*\/versions/, 'get', editorAPI.getIsoVersions)
Mock.mock(/\/imagerepos/, 'get', editorAPI.fetchIsoList)

Mock.mock(/\/configs\/.*\/versions\/.*/, 'get', editorAPI.getConfigVersion)
Mock.mock(/\/configs\/.*\/versions\/.*/, 'delete', editorAPI.delConfigVersion)
Mock.mock(/\/configs\/.*\/versions$/, 'get', editorAPI.getConfigVersions)
Mock.mock(/\/configs\/.*\/versions$/, 'post', editorAPI.createConfigVersion)

Mock.mock(/\/configs/, 'post', editorAPI.createConfig)
Mock.mock(/\/configs/, 'delete', editorAPI.delConfig)
Mock.mock(/\/configs\/.*$/, 'get', editorAPI.getConfigInfo)
Mock.mock(/\/configs\/?.*/, 'get', editorAPI.fetchConfigsList)

export default Mock
