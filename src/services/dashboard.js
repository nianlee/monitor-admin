import { api, request } from 'utils'

// 统计设备状态对应设备数
export function queryDeviceCountByState (data) {
  return request({
    data,
    method: 'get',
    url: api.queryDeviceCountByState,
  })
}

// 统计设备离线列表
export function queryOfflineDevices (data) {
  return request({
    data,
    method: 'get',
    url: api.queryOfflineDevices,
  })
}

// 统计设备在线列表
export function queryOnlineDevices (data) {
  return request({
    data,
    method: 'get',
    url: api.queryOnlineDevices,
  })
}

// 统计设备预警列表
export function queryAlarmDevices (data) {
  return request({
    data,
    method: 'get',
    url: api.queryAlarmDevices,
  })
}

// 统计设备区域对应设备数
export function queryDeviceCountByArea (data) {
  return request({
    data,
    method: 'get',
    url: api.queryDeviceCountByArea,
  })
}