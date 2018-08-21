import request from '@/utils/request'

export function loginByUsername(username, password) {
  const data = {
    email: username,
    password: password
  }
  return request({
    url: '/system/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/system/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/system/user/detail',
    method: 'get',
    params: { token }
  })
}

