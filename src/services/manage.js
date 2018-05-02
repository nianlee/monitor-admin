import { api, request } from 'utils'

// 设备查询
export function queryDeviceList(data) {
  return request({
    data,
    method: 'get',
    url: api.queryDeviceSelective,
  })
}
