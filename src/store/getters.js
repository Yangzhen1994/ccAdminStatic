const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  status: state => state.user.status,
  roles: state => state.user.roles,
  userid: state => state.user.userid,
  setting: state => state.user.setting,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  errorLogs: state => state.errorLog.logs,
  appdata: state => state.user.appdata,
  servicedata: state => state.user.servicedata,
  configdata: state => state.user.configdata,
  colonyNodeData: state => state.user.colonyNodeData,
  en: state => state.user.en,
  systemconfig: state => state.user.systemconfig,
  scalep: state => state.user.scalep,
  scales: state => state.user.scales
}
export default getters