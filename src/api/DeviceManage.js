import { createAPI } from '@/utils/request'

// 设备分类分页查询
export const categoryPageApi = data => createAPI('/deviceCategory/page', 'post', data)
export const categoryAddOrUpdateApi = data => createAPI('/deviceCategory/addOrUpdate', 'post', data)

// 登录
export const devicePage = data => createAPI('/device/devicePage', 'get', data)

// 新增产品
export const addDevice = data => createAPI('/device/addDevice', 'post', data)
