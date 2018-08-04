import request from '@/utils/request'

/**
 * 角色列表
 * @param params
 */
export const roleList = (params) => request({
  url: 'system/role',
  method: 'get',
  params: params
})

/**
 * 全部角色列表
 * @param params
 */
export const roleListAll = (params) => request({
  url: 'system/role/all',
  method: 'get',
  params: params
})

/**
 * 创建角色
 * @param data
 */
export const createRole = (data) => request({
  url: 'system/role',
  method: 'post',
  data: data
})

/**
 * 更新角色
 * @param data
 */
export const updateRole = (id, data) => request({
  url: 'system/role/' + id,
  method: 'put',
  data: data
})

/**
 * 删除角色
 * @param id
 */
export const deleteRole = (id) => request({
  url: 'system/role/' + id,
  method: 'delete'
})

/**
 * 获取角色权限
 * @param id
 */
export const menuListByRole = (id) => request({
  url: 'system/role/' + id + '/aca',
  method: 'get'
})

/**
 * 设置角色权限
 * @param data
 */
export const createMenuByRole = (id, data) => request({
  url: 'system/role/' + id + '/aca',
  method: 'post',
  data: { items: data }
})
