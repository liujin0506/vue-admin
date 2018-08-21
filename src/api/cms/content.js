import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: '/cms/content',
    method: 'get',
    params: query
  })
}

export function fetchContent(id) {
  return request({
    url: '/cms/content/' + id,
    method: 'get'
  })
}

export function fetchPv(pv) {
  return request({
    url: '/cms/content/pv',
    method: 'get',
    params: { pv }
  })
}

export function createContent(data) {
  return request({
    url: '/cms/content',
    method: 'post',
    data
  })
}

export function updateContent(data) {
  return request({
    url: '/cms/contnt',
    method: 'put',
    data
  })
}
