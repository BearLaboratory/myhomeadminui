import { createAPI } from '@/utils/request'

// 登录
export const login = data => createAPI('/sysUser/login', 'post', data)
// 获取用户信息
export const getUserInfo = data => createAPI('/sysUser/getUserInfo', 'get', data)
// 插叙权限树
export const getPermissionTree = data => createAPI('/sysUser/getPermissionTree', 'get', data)
export const addOrUpdateUserApi = data => createAPI('/sysUser/getPermissionTree', 'get', data)
export const delUserApi = data => createAPI('/sysUser/getPermissionTree', 'get', data)
export const pageQueryApi = data => createAPI('/sysUser/getPermissionTree', 'get', data)

// -----------------角色相关----------------------
// 条件分页查询
export const rolePageQueryApi = data => createAPI('/sysRole/page', 'post', data)
// 新增或修改角色
export const addOrUpdateRoleApi = data => createAPI('/sysRole/addOrUpdateRole', 'post', data)
// 删除角色
export const delRoleApi = data => createAPI('/sysRole/delRole', 'post', data)
// 查询角色列表（供下拉使用）
export const roleListApi = data => createAPI('/sysRole/roleList', 'get', data)

// --------------权限相关-------------------
export const permPageQueryApi = data => createAPI('/sysPermission/page', 'post', data)
// 新增或修改权限
export const permAddOrUpdateApi = data => createAPI('/sysPermission/addOrUpdate', 'post', data)
// 根据父ID查询子树
export const permGetByParentIdApi = data => createAPI('/sysPermission/getByParentId', 'get', data)
// 查询包含按钮的完整权限树
export const totalPermissionTreeApi = data => createAPI('/sysPermission/totalPermissionTree', 'get', data)
