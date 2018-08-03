import request from '@/utils/request'

/**
 * 菜单列表
 * @param params
 */
export const menuList = (params) => request({
  url: 'system/aca',
  method: 'get',
  params: params
})

/**
 * 创建菜单
 * @param data
 */
export const createMenu = (data) => request({
  url: 'system/aca',
  method: 'post',
  data: data
})

/**
 * 更新菜单
 * @param data
 */
export const updateMenu = (data) => request({
  url: 'system/aca',
  method: 'put',
  data: data
})

/**
 * 删除菜单
 * @param id
 */
export const deleteMenu = (id) => request({
  url: 'system/aca',
  method: 'delete',
  data: { id: id }
})
