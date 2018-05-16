import { api, request } from 'utils'

// 设备查询
export function queryRoleList(data) {
  return request({
    data,
    method: 'get',
    url: api.queryRoleList,
  })
}
