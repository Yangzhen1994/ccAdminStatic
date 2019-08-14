import Vue from 'vue'
import Router from 'vue-router'

const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/** note: submenu only apppear when children.length>=1
 *   detail see  https://panjiachen.github.io/vue-element-admin-site/#/router-and-nav?id=sidebar
 **/

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the warning show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
 **/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/authredirect', component: _import('login/authredirect'), hidden: true },
  { path: '/404', component: _import('errorPage/404'), hidden: true },
  { path: '/401', component: _import('errorPage/401'), hidden: true }

]

export const asyncRouterMap = [
  {
    path: '',
    component: Layout,
    redirect: 'index',
    meta: {
      roles: ['admin', 'editor', 'user']
    },
    hidden: true,
    children: [{
      path: 'index',
      component: _import('dashboard/index'),
      name: 'index',
      meta: { title: '概览', icon: 'dashboard', noCache: true, roles: ['admin', 'editor', 'user'] }
    }]
  },
  {
    path: '/usermanager',
    component: Layout,
    redirect: '/usermanager/userindex',
    meta: {
      roles: ['admin', 'editor', 'user']
    },
    hidden: false,
    children: [{
      path: 'userindex',
      component: _import('usermanager/index'),
      name: 'usermanager',
      meta: { title: '用户管理', icon: 'dashboard', noCache: true, roles: ['admin', 'editor', 'user'] }
    }]
  },
  {
    path: '/rolemanager',
    component: Layout,
    redirect: '/rolemanager/roleindex',
    meta: {
      roles: ['admin', 'editor', 'user']
    },
    hidden: false,
    children: [
      {
        path: 'roleindex',
        component: _import('rolemanager/index'),
        name: 'rolemanager',
        meta: { title: '角色管理', icon: 'dashboard', noCache: true, roles: ['admin', 'editor', 'user'] }
      },
      {
        hidden: true,
        path: 'roleindex/roleusermanager',
        component: _import('rolemanager/roleusermanager'),
        name: 'roleusermanager',
        meta: { title: '角色用户管理', icon: 'dashboard', noCache: true, roles: ['admin', 'editor', 'user'] }
      },
      {
        hidden: true,
        path: 'roleindex/roleappmanager',
        component: _import('rolemanager/roleappmanager'),
        name: 'roleappmanager',
        meta: { title: '角色应用管理', icon: 'dashboard', noCache: true, roles: ['admin', 'editor', 'user'] }
      }
    ]
  },
  {
    path: '/appmanager',
    component: Layout,
    redirect: '/appmanager/appindex',
    meta: {
      roles: ['admin', 'editor', 'user']
    },
    hidden: false,
    children: [{
      path: 'appindex',
      component: _import('appmanager/index'),
      name: 'appmanager',
      meta: { title: '应用管理', icon: 'dashboard', noCache: true, roles: ['admin', 'editor', 'user'] }
    }]
  },
  { path: '*', redirect: '/404', hidden: true }

]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap.concat(asyncRouterMap)
})
