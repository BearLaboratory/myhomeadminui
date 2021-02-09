import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'
import Layout from '@/views/Layout'
import DevRegist from '@/views/DevRegist'
import DashBoard from '@/views/innerpage/DashBoard'
import { getToken } from '@/utils/TokenUtil'
import ProductManage from '@/views/innerpage/ProductManage'
import DeviceManage from '@/views/innerpage/DeviceManage'
import AppVersionManage from '@/views/innerpage/AppVersionManage'

Vue.use(VueRouter)

const routes = [
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
      },
      {
        path: '/deviceManage',
        name: 'DeviceManage',
        meta: { title: '设备管理' },
        component: DeviceManage
      }
    ]
  }, {
    path: '/login',
    name: 'Login',
    meta: { title: '登录' },
    component: Login
  }, {
    path: '/devRegist',
    name: 'DevRegist',
    meta: { title: '开发者注册' },
    component: DevRegist
  }
]

const router = new VueRouter({
  routes
})
// 路由守卫监控是否登录
router.beforeEach((to, from, next) => {
  const baseTitle = 'MyHome'
  document.title = baseTitle + ' | ' + to.meta.title
  if (to.path === '/login' || to.path === '/devRegist') {
    // 如果去登录页直接放行到登录页
    next()
  } else {
    // 如果不是去登录页，则判断是否登录
    if (getToken() == null) {
      // 未登录,跳转到登录页
      next('/login')
    } else {
      // 登录，放行
      next()
    }
  }
})

export default router
