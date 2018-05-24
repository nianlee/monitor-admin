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
    method:'post',
    url:api.queryRegion,
  })
}
