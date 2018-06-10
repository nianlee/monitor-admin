import { api, request } from 'utils'

// 用户登录
export function loginLoad(data) {
  return request({
    data,
    method: 'post',
    url: api.loginLoad,
  })
}

