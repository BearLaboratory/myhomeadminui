import { createAPI } from '@/utils/request'

// 登录
export const productPage = data => createAPI('/product/productPage', 'get', data)
// 查询产品列表
export const productList = data => createAPI('/product/productList', 'get', data)
// 新增产品
export const addProduct = data => createAPI('/product/addProduct', 'post', data)
