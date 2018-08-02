import { api, request } from "utils";

// 根据sn 查询设备
export function queryDeviceBySn(data) {
  return request({
    data,
    method: "get",
    url: api.queryDeviceBySn
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
