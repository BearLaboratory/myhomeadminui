import { createAPI } from '@/utils/request'

// 登录
export const login = data => createAPI('/sysUser/login', 'post', data)
// 开发者注册
export const devRegist = data => createAPI('/sysUser/devRegist', 'post', data)
// 获取用户信息
export const getUserInfo = data => createAPI('/sysUser/getUserInfo', 'get', data)
