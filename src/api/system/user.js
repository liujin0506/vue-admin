import request from '@/utils/request'

/**
 * 用户列表
 * @param params
 */
export const userList = (params) => request({
  url: 'system/user',
  method: 'get',
  params: params
})

/**
 * 创建用户
 * @param data
 */
export const createUser = (data) => request({
  url: 'system/user',
  method: 'post',
  data: data
})

/**
 * 更新用户
 * @param data
 */
export const updateUser = (id, data) => request({
  url: 'system/user/' + id,
  method: 'put',
  data: data
})

/**
 * 删除用户
 * @param id
 */
export const deleteUser = (id) => request({
  url: 'system/user/' + id,
  method: 'delete'
})

/**
 * 禁用/启用
 * @param id
 * @param type
 */
export const changeStatus = (id, type) => request({
  url: 'system/user/' + id + '/change_status',
  method: 'post',
  data: { type: type }
})

/**
 * 修改用户密码
 * @param id
 * @param password
 */
export const changePassword = (id, data) => request({
  url: 'system/user/' + id + '/change_password',
  method: 'post',
  data: data
})

/**
 * 获取用户角色
 * @param id
 */
export const roleListByUser = (id) => request({
  url: 'system/user/' + id + '/role',
  method: 'get'
})

/**
 * 设置用户角色
 * @param data
 */
export const createRoleByUser = (id, data) => request({
  url: 'system/user/' + id + '/role',
  method: 'post',
  data: { items: data }
})
