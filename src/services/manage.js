import { api, request } from 'utils'

// 设备查询
export function queryDeviceList(data) {
  return request({
    data,
    method: 'get',
    url: api.queryDeviceSelective,
  })
}

// 设备删除
export function deleteDevice(data) {
  return request({
    data,
    method:'get',
    url:api.deleteDevice,
  })
}

// 添加设备
export function addDevice(data) {
  return request({
    data,
    method:'post',
    url:api.addDevice,
  })
}

// 获取区域树
export function getRegionList(data) {
  return request({
    data,
    method:'get',
    url:api.queryRegion,
  })
}

// 用户查询
export function queryUserList(data) {
  return request({
    data,
    method: 'post',
    url: api.queryUserListInfo,
  })
}

// 删除用户
export function deleteUserInfo(data) {
  return request({
    data,
    method:'post',
    uri:api.deleteUserInfo,
  })

}
