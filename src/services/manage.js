import { api, request } from 'utils'

// 设备查询列表
export function queryDeviceList(data) {
  return request({
    data,
    method: 'post',
    url: api.queryDeviceSelective,
  })
}

// 查询某一个设备info
export function queryDeviceInfo(data) {
  return request({
    data,
    method:'post',
    url:api.queryDeviceInfo,
  })
}

// 查询固件版本
export function queryFirmVersion(data) {
  return request({
    data,
    method:'post',
    url:api.queryFirmwareVersion,
  })
}

// 固件升级
export function updateFirmwareVersion(data) {
  return request({
    data,
    method:'post',
    url:api.updateFirmwareVersion,
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

// 控制设备
export function controlDevice(data) {
  return request({
    data,
    method:'post',
    url:api.controlDevice,
  })
}

// 设备类型
export function queryDeviceType(data) {
  return request({
    data,
    method:'post',
    url:api.queryDeviceTypes
  })
}

// 获取区域树
export function getRegionList(data) {
  return request({
    data,
    method:'post',
    url:api.queryAreaList,
  })
}

// 查询用户列表
export function queryUserList(data) {
  return request({
    data,
    method: 'post',
    url: api.queryUserListInfo,
  })
}

// 删除用户
export function deleteUserInfos(data) {
  return request({
    data,
    method:'post',
    url:api.deleteUser,
  })
}

// 用户修改
export function modifyUserInfo(data) {
  return request({
    data,
    method:'post',
    url:api.modifyUserInfo,
  })
}

// 查询单个用户
export function queryUserInfo(data) {
  return request({
    data,
    method:'post',
    url:api.queryUserInfo,
  })
}

// 添加用户
export function addUser(data) {
  return request({
    data,
    method:'post',
    url:api.addUser,
  })

}
