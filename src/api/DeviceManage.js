import { createAPI } from '@/utils/request'

// -----------------设备分类------------------
// 设备分类分页查询
export const categoryPageApi = data => createAPI('/device/deviceCategory/page', 'post', data)
// 新增或修改
export const categoryAddOrUpdateApi = data => createAPI('/device/deviceCategory/addOrUpdate', 'post', data)
// 删除分类
export const delCategoryApi = data => createAPI('/device/deviceCategory/delCategory', 'post', data)
// 查询分类集合
export const categoryListApi = data => createAPI('/device/deviceCategory/categoryList', 'get', data)

// -------------设备管理-----------------
// 设备分页查询
export const devicePageApi = data => createAPI('/device/device/page', 'post', data)
// 新增或者修改设备
export const addOrUpdateDeviceApi = data => createAPI('/device/device/addOrUpdateDevice', 'post', data)
export const delDeviceApi = data => createAPI('/device/device/delDevice', 'post', data)

// 发布设备
export const publishDeviceApi = data => createAPI('/device/device/publishDevice', 'post', data)
