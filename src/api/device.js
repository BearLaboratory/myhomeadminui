import { createAPI } from '@/utils/request'

// 登录
export const devicePage = data => createAPI('/device/devicePage', 'get', data)

// 新增产品
export const addDevice = data => createAPI('/device/addDevice', 'post', data)
