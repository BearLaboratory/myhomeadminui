import { createAPI } from '@/utils/request'

// -----------------设备分类------------------
// 设备分类分页查询
export const categoryPageApi = data => createAPI('/deviceCategory/page', 'post', data)
// 新增或修改
export const categoryAddOrUpdateApi = data => createAPI('/deviceCategory/addOrUpdate', 'post', data)
// 删除分类
export const delCategoryApi = data => createAPI('/deviceCategory/delCategory', 'post', data)

// -------------设备管理-----------------
// 设备分页查询
export const devicePageApi = data => createAPI('/device/page', 'post', data)

// 发布设备
export const publishDeviceApi = data => createAPI('/device/publishDevice', 'post', data)
