import { api, request } from "utils";

// 日志查询
export function queryLog(data) {
  return request({
    data,
    method: "post",
    url: api.queryLog
  });
}
