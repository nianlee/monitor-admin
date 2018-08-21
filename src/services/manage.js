import { api, request } from "utils";

// 设备查询列表
export function queryDevices(data) {
  return request({
    data,
    method: "post",
    url: api.queryDevices
  });
}

// 查询某一个设备info
export function queryDeviceBySn(data) {
  return request({
    data,
    method: "post",
    url: api.queryDeviceBySn
  });
}

// 查询固件版本
export function queryFirmVersion(data) {
  return request({
    data,
    method: "post",
    url: api.queryFirmwareVersion
  });
}

// 固件升级
export function updateFirmwareVersion(data) {
  return request({
    data,
    method: "post",
    url: api.updateFirmwareVersion
  });
}

// 设备删除
export function delDeviceById(data) {
  return request({
    data,
    method: "get",
    url: api.delDeviceById
  });
}

// 添加设备
export function addDevice(data) {
  return request({
    data,
    method: "post",
    url: api.addDevice
  });
}

// 修改设备
export function editDeviceById(data) {
  return request({
    data,
    method: "post",
    url: api.editDeviceById
  });
}

// 控制设备
export function controlDevice(data) {
  return request({
    data,
    method: "post",
    url: api.controlDevice
  });
}

// 设备类型
export function queryDeviceType(data) {
  return request({
    data,
    method: "post",
    url: api.queryDeviceTypes
  });
}

// 获取区域树
export function getRegionList(data) {
  return request({
    data,
    method: "post",
    url: api.queryAreaList
  });
}

// 查询用户列表
export function queryUserList(data) {
  return request({
    data,
    method: "post",
    url: api.queryUserListInfo
  });
}

// 删除用户
export function deleteUserInfos(data) {
  return request({
    data,
    method: "post",
    url: api.deleteUser
  });
}

// 用户修改
export function modifyUserInfo(data) {
  return request({
    data,
    method: "post",
    url: api.modifyUserInfo
  });
}

// 查询单个用户
export function queryUserInfo(data) {
  return request({
    data,
    method: "post",
    url: api.queryUserInfo
  });
}

// 添加用户
export function addUser(data) {
  return request({
    data,
    method: "get",
    url: api.addUser
  });
}

// 区域列表查询
export function queryAreaList(data) {
  return request({
    data,
    method: "post",
    url: api.queryAreaList
  });
}

// 区域查询ByParentCode
export function queryAreaByParentCode(data) {
  return request({
    data,
    method: "post",
    url: api.queryAreaByParentCode
  });
}

// 批量升级
export function deviceUpgradeBatch(data) {
  return request({
    data,
    method: "post",
    url: api.deviceUpgradeBatch
  });
}

// 10.6查询固件列表
export function queryFirmwaresList(data) {
  return request({
    data,
    method: "post",
    url: api.queryFirmwareList
  });
}

// 查询单个固件信息
export function queryFirmwaresInfo(data) {
  return request({
    data,
    method: "post",
    url: api.queryFirmwareById
  });
}

// 添加固件
export function addFirmwares(data) {
  return request({
    data,
    method: "post",
    url: api.addFirmware
  });
}

// 删除固件
export function deleteFirmwares(data) {
  return request({
    data,
    method: "post",
    url: api.delFirmwareById
  });
}
