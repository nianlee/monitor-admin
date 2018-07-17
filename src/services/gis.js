import { api, request } from "utils";

// 设备查询
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
