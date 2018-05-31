import { api, request } from 'utils'

// 逆地理编码
export function regeo (data) {
  return request({
    data,
    method: 'get',
    url: api.regeo,
  })
}