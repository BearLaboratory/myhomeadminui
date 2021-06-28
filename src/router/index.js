import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'

import DevRegist from '@/views/DevRegist'
import Layout from '@/layout'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import UserManage from '@/views/system-page/UserManage'
import RoleManage from '@/views/system-page/RoleManage'
import PermissionManage from '@/views/system-page/PermissionManage'
import CategoryManage from '@/views/device-page/CategoryManage'
import DeviceList from '@/views/device-page/DeviceList'
import DeviceDebug from '@/views/device-page/DeviceDebug'
import UserList from '@/views/operation-page/UserList'
import InnerLayout from '@/layout/InnerLayout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    meta: { title: '登录' },
    component: Login
  },
  // {
  //   path: '/404',
  //   meta: { title: '404' },
  //   component: () => import('@/views/error-page/404'),
  //   hidden: true
  // },
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    children: [
      // 运营管理
      {
        path: '/operationManage',
        name: 'InnerLayout',
        component: InnerLayout,
        children: [
          {
            path: '/operationManage/userManage/userData',
            name: 'UserList',
            meta: { title: '用户数据' },
            component: UserList
          }, {
            path: '/operationManage/userManage/userList',
            name: 'UserList',
            meta: { title: '用户列表' },
            component: UserList
          }
        ]
      },
      // app管理
      {
        path: '/appManage',
        name: 'InnerLayout',
        component: InnerLayout,
        children: [
          {
            path: '/appManage/appAnalyse/deviceManage',
            name: 'DeviceManage',
            meta: { title: 'APP管理' }
          }
        ]
      },
      // 设备管理
      {
        path: '/deviceManage',
        name: 'InnerLayout',
        component: InnerLayout,
        redirect: '/deviceManage/categoryManage/categoryManage',
        children: [
          {
            path: '/deviceManage/categoryManage/categoryManage',
            name: 'CategoryManage',
            meta: { title: '设备分类' },
            component: CategoryManage
          }, {
            path: '/deviceManage/deviceList/deviceList',
            name: 'deviceList',
            meta: { title: '设备列表' },
            component: DeviceList
          }, {
            path: '/deviceManage/developManage/deviceDebug',
            name: 'deviceDebug',
            meta: { title: '设备调试' },
            component: DeviceDebug
          }
        ]
      },
      // 系统管理
      {
        path: '/systemManage',
        name: 'InnerLayout',
        component: InnerLayout,
        redirect: '/systemManage/userRolePermission/userManage',
        children:
          [
            {
              path: '/systemManage/userRolePermission/userManage',
              name: 'UserManage',
              meta: { title: '人员管理' },
              component: UserManage
            },
            {
              path: '/systemManage/userRolePermission/roleManage',
              name: 'RoleManage',
              meta: { title: '角色管理' },
              component: RoleManage
            },
            {
              path: '/systemManage/userRolePermission/PermissionManage',
              name: 'PermissionManage',
              meta: { title: '权限管理' },
              component: PermissionManage
            }
          ]
      },
      {
        path: '/dashBoard',
        name: 'DashBoard',
        meta: { title: '信息汇总' },
        component: () => import('@/views/dashboard/DashBoard')
      }
    ]
  },
  {
    path: '/devRegist',
    name: 'DevRegist',
    meta: { title: '开发者注册' },
    component: DevRegist
  },
  {
    path: '*',
    redirect:
      '/404',
    hidden:
      true
  }
]

const router = new VueRouter({
  routes
})
// 路由守卫监控是否登录
router.beforeEach((to, from, next) => {
  NProgress.start()
  const baseTitle = 'MyHome'
  document.title = baseTitle + ' | ' + to.meta.title
  if (to.path === '/login' || to.path === '/devRegist') {
    // 如果去登录页直接放行到登录页
    next()
  } else {
    // 如果不是去登录页，则判断是否登录
    if (!window.sessionStorage.getItem('userToken')) {
      // 未登录,跳转到登录页
      next('/login')
    } else {
      // 登录，放行
      next()
    }
  }
})
router.afterEach(() => {
  NProgress.done()
})

export default router
