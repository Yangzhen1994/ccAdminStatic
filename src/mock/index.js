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

// 用户列表
Mock.mock(/\/user\/list\.*/, 'get', articleAPI.getUserList)
Mock.mock(/\/user\/state\.*/, 'post', articleAPI.changeUserState)
Mock.mock(/\/user\/delete\.*/, 'post', articleAPI.delUser)
Mock.mock(/\/user\/add\.*/, 'post', articleAPI.addUser)
Mock.mock(/\/user\/edit\.*/, 'post', articleAPI.editUser)
Mock.mock(/\/user\/changepwd\.*/, 'post', articleAPI.changeUserPwd)
export default Mock
