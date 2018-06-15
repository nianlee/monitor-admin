import { api, request } from 'utils'

// 设备查询
export function loginLoad(data) {
  return request({
    data,
    method: 'post',
    url: api.loginLoad,
  })
}

// 用户详细信息查询
export function queryUserInfo(data) {
  return request({
    data,
    method: 'get',
    url: api.queryUserInfo,
  })
}
