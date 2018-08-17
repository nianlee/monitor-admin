import { api, request } from "utils";

// 根据sn 查询设备
export function queryDeviceBySn(data) {
  return request({
    data,
    method: "get",
    url: api.queryDeviceBySn
  });
}

// 统计设备状态对应设备数
export function queryDeviceCountByState(data) {
  return request({
    data,
    method: "get",
    url: api.queryDeviceCountByState
  });
}

// 根据区域查询设备量
export function queryDeviceCountByLevel1Area(data) {
  return request({
    data,
    method: "get",
    url: api.queryDeviceCountByLevel1Area
  });
}

// 统计设备状态对应设备数历史列表
export function queryDeviceCountByStateHis(data) {
  return request({
    data,
    method: "get",
    url: api.queryDeviceCountByStateHis
  });
}

// 统计设备离线列表
export function queryOfflineDevices(data) {
  return request({
    data,
    method: "get",
    url: api.queryOfflineDevices
  });
}

// 统计设备在线列表
export function queryOnlineDevices(data) {
  return request({
    data,
    method: "get",
    url: api.queryOnlineDevices
  });
}

// 统计设备预警列表
export function queryAlarmDevices(data) {
  return request({
    data,
    method: "get",
    url: api.queryAlarmDevices
  });
}

// 统计设备区域对应设备数
export function queryDeviceCountByArea(data) {
  return request({
    data,
    method: "get",
    url: api.queryDeviceCountByArea
  });
}

// 设备预警历史列表查询
export function queryAlarmResultHis(data) {
  return request({
    data,
    method: "get",
    url: api.queryAlarmResultHis
  });
}

// 一键巡检全量设备
export function batchInspectionDevices(data) {
  return request({
    data,
    method: "post",
    url: api.batchInspectionDevices
  });
}

// 一键巡检全量设备处理进度查询
export function queryBatchInspectionDevicesProgress(data) {
  return request({
    data,
    method: "post",
    url: api.queryBatchInspectionDevicesProgress
  });
}

// 设备预警数是否变化查询
export function queryAlarmDeviceCountWithLast(data) {
  return request({
    data,
    method: "post",
    url: api.queryAlarmDeviceCountWithLast
  });
}
