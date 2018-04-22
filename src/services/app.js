import { api, request } from 'utils'

// 用户是否登录
export function query(data) {
  return request({
    url: api.query,
    method: 'get',
    data,
  })
}

// 用户登出
export function loginout(data) {
  return request({
    url: api.loginout,
    method: 'get',
    data,
  })
}

// 获取菜单
export function getMenu(data) {
  return request({
    url: api.getMenu,
    method: 'get',
    data,
  })
}