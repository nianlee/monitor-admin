import { api, request } from "utils";

// 单个设备查询
export function queryDeviceSelective(data) {
  return request({
    data,
    method: "get",
    url: api.queryDeviceInfo
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

// 根据条件查询设备
export function queryDevices(data) {
  return request({
    data,
    method: "get",
    url: api.queryDevices
  });
}
