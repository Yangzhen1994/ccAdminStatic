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
Mock.mock(/\/user\/info/, 'get', loginAPI.getUserInfo)
Mock.mock(/\/user\.*/, 'put', loginAPI.changePwd)
// 角色下用户
Mock.mock(/\/role\/.*\/user\/list\.*/, 'get', articleAPI.getRoleUserList)
Mock.mock(/\/role\/.*\/user\/delete\.*/, 'post', articleAPI.delRoleUser)
Mock.mock(/\/role\/.*\/user\/add\.*/, 'post', articleAPI.addRoleUser)
// 用户列表
Mock.mock(/\/user\/list\.*/, 'get', articleAPI.getUserList)
Mock.mock(/\/user\/state\.*/, 'post', articleAPI.changeUserState)
Mock.mock(/\/user\/delete\.*/, 'post', articleAPI.delUser)
Mock.mock(/\/user\/add\.*/, 'post', articleAPI.addUser)
Mock.mock(/\/user\/edit\.*/, 'post', articleAPI.editUser)
Mock.mock(/\/user\/changepwd\.*/, 'post', articleAPI.changeUserPwd)
// 应用列表
Mock.mock(/\/app\/list\.*/, 'get', articleAPI.getAppList)
Mock.mock(/\/app\/delete\.*/, 'post', articleAPI.delApp)
Mock.mock(/\/app\/add\.*/, 'post', articleAPI.addApp)
Mock.mock(/\/app\/edit\.*/, 'post', articleAPI.editApp)
// 角色列表
Mock.mock(/\/role\/list\.*/, 'get', articleAPI.getRoleList)
Mock.mock(/\/role\/delete\.*/, 'post', articleAPI.delRole)
Mock.mock(/\/role\/add\.*/, 'post', articleAPI.addRole)
Mock.mock(/\/role\/edit\.*/, 'post', articleAPI.editRole)

export default Mock
