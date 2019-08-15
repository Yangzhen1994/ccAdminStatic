import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const AppKey = 'appkey'
const RoleKey = 'rolekey'
const ServiceKey = 'servicekey'
const ConfigKey = 'configkey'
const colonyNodeKey = 'colonynodekey'
const enKey = 'env'
const sysKey = 'sysConfig'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getAppData() {
  return Cookies.get(AppKey) ? JSON.parse(Cookies.get(AppKey)) : Cookies.get(AppKey)
}

export function setAppData(data) {
  if (!data) {
    return
  }
  return Cookies.set(AppKey, JSON.stringify(data))
}

export function getRoleData() {
  return Cookies.get(RoleKey) ? JSON.parse(Cookies.get(RoleKey)) : Cookies.get(RoleKey)
}

export function setRoleData(data) {
  if (!data) {
    return
  }
  return Cookies.set(RoleKey, JSON.stringify(data))
}

export function getServiceData() {
  return Cookies.get(ServiceKey) ? JSON.parse(Cookies.get(ServiceKey)) : Cookies.get(ServiceKey)
}

export function setServiceData(data) {
  if (!data) {
    return
  }
  return Cookies.set(ServiceKey, JSON.stringify(data))
}

export function getConfigData() {
  return Cookies.get(ConfigKey) ? JSON.parse(Cookies.get(ConfigKey)) : Cookies.get(ConfigKey)
}

export function setConfigData(data) {
  if (!data) {
    return
  }
  return Cookies.set(ConfigKey, JSON.stringify(data))
}

export function getColonyNodeData() {
  return Cookies.get(colonyNodeKey) ? JSON.parse(Cookies.get(colonyNodeKey)) : Cookies.get(colonyNodeKey)
}

export function setColonyNodeData(data) {
  if (!data) {
    return
  }
  return Cookies.set(colonyNodeKey, JSON.stringify(data))
}
export function getEn() {
  return Cookies.get(enKey) ? JSON.parse(Cookies.get(enKey)) : Cookies.get(enKey)
}

export function setEn(data) {
  if (!data) {
    return
  }
  return Cookies.set(enKey, JSON.stringify(data))
}
// 系统配置
export function getSystemConfig() {
  return Cookies.get(sysKey) ? JSON.parse(Cookies.get(sysKey)) : Cookies.get(sysKey)
}

export function setSystemConfig(data) {
  if (!data) {
    return
  }
  return Cookies.set(sysKey, JSON.stringify(data))
}
