import request from '@/utils/request'

/**
 * 权限列表
 * @param params
 */
export const acaList = (params) => request({
  url: 'system/aca',
  method: 'get',
  params: params
})

/**
 * 创建权限
 * @param data
 */
export const createAca = (data) => request({
  url: 'system/aca',
  method: 'post',
  data: data
})

/**
 * 更新权限
 * @param data
 */
export const updateAca = (id, data) => request({
  url: 'system/aca/' + id,
  method: 'put',
  data: data
})

/**
 * 删除权限
 * @param id
 */
export const deleteAca = (id) => request({
  url: 'system/aca/' + id,
  method: 'delete'
})
