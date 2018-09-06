import request from '@/utils/request'

/**
 * 商品列表
 * @param params
 */
export const goodsList = (params) => request({
  url: 'jd/goods',
  method: 'get',
  params: params
})

/**
 * 批量添加商品
 * @param data
 */
export const uploadGoods = (data) => request({
  url: 'jd/goods/upload',
  method: 'post',
  data: data
})

/**
 * 添加商品
 * @param data
 */
export const createGoods = (data) => request({
  url: 'jd/goods',
  method: 'post',
  data: data
})

/**
 * 更新商品
 * @param data
 */
export const updateGoods = (id, data) => request({
  url: 'jd/goods/' + id,
  method: 'put',
  data: data
})
