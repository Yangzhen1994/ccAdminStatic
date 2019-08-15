import { loginByUsername, logout, getUserInfo } from '@/api/login'
import { getToken, setToken, removeToken, getAppData, setAppData, getColonyNodeData, setColonyNodeData, getServiceData, setServiceData, getConfigData, setConfigData, getEn, setEn, getSystemConfig, setSystemConfig, getRoleData, setRoleData } from '@/utils/auth'

const user = {
  state: {
    user: '',
    userid: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    setting: {
      articlePlatform: []
    },
    appdata: getAppData(),
    servicedata: getServiceData(),
    configdata: getConfigData(),
    roledata: getRoleData(),
    colonyNodeData: getColonyNodeData(),
    en: getEn() || '',
    systemconfig: getSystemConfig() || null,
    scalep: 0,
    scales: 0
  },

  mutations: {
    SET_SYSTEM_CONFIG: (state, data) => {
      state.systemconfig = data
    },
    SET_EN: (state, data) => {
      state.en = data
    },
    SET_COLONY_NODE_DATA: (state, data) => {
      state.colonyNodeData = data
    },
    SET_ROLE_DATA: (state, data) => {
      state.roledata = data
    },
    SET_DATA: (state, data) => {
      state.appdata = data
    },
    SET_SERVICE_DATA: (state, data) => {
      state.servicedata = data
    },
    SET_CONFIG_DATA: (state, data) => {
      state.configdata = data
    },
    SET_SCALE_P: (state, data) => {
      state.scalep = data
    },
    SET_SCALE_S: (state, data) => {
      state.scales = data
    },
    SET_CODE: (state, code) => {
      state.code = code
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_USER_ID: (state, userid) => {
      state.userid = userid
    }
  },

  actions: {
    //存储当前系统配置
    saveSystemConfig({ commit }, data){
      setSystemConfig(data)
      commit('SET_SYSTEM_CONFIG', data)
    },
    // 存储当前构建
    // 储存环境
    saveEn({ commit }, data) {
      setEn(data)
      commit('SET_EN', data)
    },
    // 存储角色数据
    saveRoleData({ commit }, data) {
      setRoleData(data)
      commit('SET_ROLE_DATA', data)
    },
    // 储存节点
    saveColonyNodeData({ commit }, data) {
      setColonyNodeData(data)
      commit('SET_COLONY_NODE_DATA', data)
    },
    // 储存appdata row
    saveAppData({ commit }, data) {
      setAppData(data)
      commit('SET_DATA', data)
    },
    // 储存servicedata row
    saveServiceData({ commit }, data) {
      setServiceData(data)
      commit('SET_SERVICE_DATA', data)
    },
    // 储存configdata row
    saveConfigData({ commit }, data) {
      setConfigData(data)
      commit('SET_CONFIG_DATA', data)
    },
    // 储存scale
    savaScaleP({ commit }, data) {
      commit('SET_SCALE_P', data)
    },
    // 储存scale
    savaScaleS({ commit }, data) {
      commit('SET_SCALE_S', data)
    },
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      const username = userInfo.user.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password).then(response => {
          const data = response.data
          commit('SET_TOKEN', data.token)
          setToken(data.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token).then(response => {
          console.log(response.data)
          if (!response.data) { // 由于mockjs 不支持自定义状态码只能这样hack
            reject('error')``
          }
          const data = response.data
          /*if(data.role.toLocaleLowerCase() == 'admin'){
            var roles = ['admin']
            data.introduction = '我是超级管理员'
            data.avatar = 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
          }else if(data.role.toLocaleLowerCase() == 'user'){
            var roles = ['editor']
            data.introduction = '我是普通用户'
            data.avatar = 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
          }else{
            // todo跳转应用
            var roles = ['guest']
            data.introduction = '我是游客'
            data.avatar = 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
          }*/
          commit('SET_USER_ID', data.id)
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.fullname)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_USER_ID', '')
          commit('SET_NAME', '')
          commit('SET_EN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },

    // 动态修改权限
    ChangeRoles({ commit }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getUserInfo(role).then(response => {
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          commit('SET_INTRODUCTION', data.introduction)
          resolve()
        })
      })
    }
  }
}

export default user
