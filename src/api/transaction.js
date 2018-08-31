import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/cms/content',
    method: 'get',
    params: query
  })
}
