import { api, request } from "utils";

// 查询区域列表
export function queryAreaList(data) {
  return request({
    data,
    method: "get",
    url: api.queryAreaList
  });
}

// 区域查询ByParentCode
export function queryAreaByParentCode(data) {
  return request({
    data,
    method: "get",
    url: api.queryAreaByParentCode
  });
}

// 添加区域接口
export function addArea(data) {
  return request({
    data,
    method: "post",
    url: api.addArea
  });
}

// 修改区域接口
export function editAreaById(data) {
  return request({
    data,
    method: "post",
    url: api.editAreaById
  });
}

// 删除区域接口
export function delAreaByCode(data) {
  return request({
    data,
    method: "post",
    url: api.delAreaByCode
  });
}
