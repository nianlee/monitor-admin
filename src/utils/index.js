import api from "./api";
import config from "./config";
import request from "./request";

// 刷新数据
export const refreshData = (dispatch, useNamespace) => {
  window.GLOBAL_INTERVAL = setInterval(function() {
    if (useNamespace) {
      dispatch({ type: "dashboard/intervalData" });
    } else {
      dispatch({ type: "intervalData" });
    }
  }, 10 * 1000);
};

// 停止刷新数据
export const stopRefreshData = () => {
  clearInterval(window.GLOBAL_INTERVAL);
};

export { api, config, request };
