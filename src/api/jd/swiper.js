import request from '@/utils/request'

/**
 * 幻灯片列表
 * @param params
 */
export const swiperList = (params) => request({
  url: 'jd/swiper',
  method: 'get',
  params: params
})

/**
 * 全部幻灯片列表
 * @param params
 */
export const swiperListAll = (params) => request({
  url: 'jd/swiper/all',
  method: 'get',
  params: params
})

/**
 * 创建幻灯片
 * @param data
 */
export const createSwiper = (data) => request({
  url: 'jd/swiper',
  method: 'post',
  data: data
})

/**
 * 更新幻灯片
 * @param data
 */
export const updateSwiper = (id, data) => request({
  url: 'jd/swiper/' + id,
  method: 'put',
  data: data
})

/**
 * 删除幻灯片
 * @param id
 */
export const deleteSwiper = (id) => request({
  url: 'jd/swiper/' + id,
  method: 'delete'
})
