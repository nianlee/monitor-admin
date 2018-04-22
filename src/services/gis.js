import { api, request } from 'utils'

// 设备查询
export function queryDeviceSelective(data) {
  return request({
    url: api.queryDeviceSelective,
    method: 'get',
    data,
  })
}
