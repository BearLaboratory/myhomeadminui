import { createAPI } from '@/utils/request'

// 登录
export const getDashboardInfo = data => createAPI('/dashboard/getDashboardInfo', 'get', data)
