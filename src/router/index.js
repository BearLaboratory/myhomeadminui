import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'

import DevRegist from '@/views/DevRegist'
import DashBoard from '@/views/innerpage/DashBoard'
import ProductManage from '@/views/innerpage/ProductManage'
import DeviceManage from '@/views/innerpage/DeviceManage'
import AppVersionManage from '@/views/innerpage/AppVersionManage'
import Layout from '@/layout'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import UserManage from '@/views/system-page/UserManage'
import RoleManage from '@/views/system-page/RoleManage'
import PermissionManage from '@/views/system-page/PermissionManage'
import CategoryManage from '@/views/device-page/CategoryManage'

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
    redirect: '/dashBoard',
    children: [
      {
        path: '/dashBoard',
        name: 'DashBoard',
        meta: { title: '仪表台' },
        component: DashBoard
      },
      {
        path: '/productManage',
        name: 'ProductManage',
        meta: { title: '产品管理' },
        component: ProductManage
      },
      {
        path: '/appVersionManage',
        name: 'AppVersionManage',
        meta: { title: 'APP版本管理' },
        component: AppVersionManage
      }
    ]
  },
  {
    path: '/appConfig',
    name: 'Layout',
    component: Layout,
    children: [
      {
        path: '/appConfig/appAnalyse/deviceManage',
        name: 'DeviceManage',
        meta: { title: '设备管理' },
        component: DeviceManage
      }
    ]
  }, {
    path: '/deviceManage',
    name: 'Layout',
    component: Layout,
    children: [
      {
        path: '/deviceManage/categoryManage/categoryManage',
        name: 'CategoryManage',
        meta: { title: '设备分类' },
        component: CategoryManage
      }
    ]
  },
  {
    path: '/systemConfig',
    name: 'Layout',
    component: Layout,
    children:
      [
        {
          path: '/systemConfig/userRolePermission/userManage',
          name: 'UserManage',
          meta: { title: '人员管理' },
          component: UserManage
        },
        {
          path: '/systemConfig/userRolePermission/roleManage',
          name: 'RoleManage',
          meta: { title: '角色管理' },
          component: RoleManage
        },
        {
          path: '/systemConfig/userRolePermission/PermissionManage',
          name: 'PermissionManage',
          meta: { title: '权限管理' },
          component: PermissionManage
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
