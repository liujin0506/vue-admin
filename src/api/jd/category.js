import request from '@/utils/request'

/**
 * 栏目列表
 * @param params
 */
export const categoryList = (params) => request({
  url: 'jd/category',
  method: 'get',
  params: params
})

/**
 * 创建栏目
 * @param data
 */
export const createCategory = (data) => request({
  url: 'jd/category',
  method: 'post',
  data: data
})

/**
 * 更新栏目
 * @param data
 */
export const updateCategory = (id, data) => request({
  url: 'jd/category/' + id,
  method: 'put',
  data: data
})

/**
 * 删除栏目
 * @param id
 */
export const deleteCategory = (id) => request({
  url: 'jd/category/' + id,
  method: 'delete'
})
