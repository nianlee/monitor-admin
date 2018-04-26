import { api, request } from 'utils'

// 设备查询
export function loginLoad(data) {
  return request({
    data,
    method: 'post',
    url: api.loginLoad,
  })
}
