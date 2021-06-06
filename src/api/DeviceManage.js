import { createAPI } from '@/utils/request'

// -----------------设备分类------------------
// 设备分页查询
export const categoryPageApi = data => createAPI('/deviceCategory/page', 'post', data)
// 新增或修改
export const categoryAddOrUpdateApi = data => createAPI('/deviceCategory/addOrUpdate', 'post', data)
// 删除分类
export const delCategoryApi = data => createAPI('/deviceCategory/delCategory', 'post', data)
