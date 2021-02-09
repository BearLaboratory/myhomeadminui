import { createAPI } from '@/utils/request'

// 登录
export const appVersionPage = data => createAPI('/appVersion/appVersionPage', 'get', data)
export const addAppVersion = data => createAPI('/appVersion/addAppVersion', 'post', data)
