import { api, request } from 'utils'

// 逆地理编码
export function regeo (data) {
  return request({
    data,
    method: 'get',
    url: api.regeo,
    withCredentials: false, // 去除cookie 登录验证
  })
}