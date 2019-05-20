import React from "react";
import PropTypes from "prop-types";
import { Router, Route, Switch } from "dva/router";
import App from "routes/app";
import dynamic from "dva/dynamic";
import { LocaleProvider } from "antd";
import zh_CN from "antd/lib/locale-provider/zh_CN";
import "moment/locale/zh-cn";
import "@babel/polyfill";

const routes = [
  {
    path: "/dashboard",
    models: () => [import("./models/dashboard")],
    component: () => import("./routes/dashboard")
  },
  {
    path: "/onlinelist", // 在线设备列表
    component: () => import("./routes/dashboard/OnlineList")
  },
  {
    path: "/alarmlist", // 警告设备列表
    component: () => import("./routes/dashboard/AlarmList")
  },
  {
    path: "/offlinelist", // 离线设备列表
    component: () => import("./routes/dashboard/OfflineList")
  },
  {
    path: "/report",
    component: () => import("./routes/report")
  },
  {
    path: "/region",
    models: () => [import("./models/region")],
    component: () => import("./routes/region")
  },
  {
    path: "/controldevice/:s/:sn",
    models: () => [import("./models/controldevice")],
    component: () => import("./routes/controldevice")
  },
  {
    // 地图
    path: "/gis",
    models: () => [import("./models/gis")],
    component: () => import("./routes/gis")
  },
  {
    // 地图，传入sn值
    path: "/gis/:sn",
    models: () => [import("./models/gis")],
    component: () => import("./routes/gis")
  },
  {
    path: "/login",
    models: () => [import("./models/login")],
    component: () => import("./routes/login")
  },
  {
    path: "/loginnocode",
    models: () => [import("./models/login")],
    component: () => import("./routes/loginnocode")
  },
  {
    // 用户管理
    path: "/usermanage",
    models: () => [import("./models/users")],
    component: () => import("./routes/users")
  },
  {
    // 修改用户信息
    path: "/addorupdateuser/:id",
    models: () => [import("./models/addOrUpdateUser")],
    component: () => import("./routes/users/AddOrUpdateUser")
  },
  {
    // 新增用户
    path: "/addorupdateuser",
    models: () => [import("./models/addOrUpdateUser")],
    component: () => import("./routes/users/AddOrUpdateUser")
  },
  {
    // 固件
    path: "/firmware",
    models: () => [import("./models/firmware")],
    component: () => import("./routes/firmware")
  },
  {
    // 添加固件
    path: "/AddFirmware",
    models: () => [import("./models/addFirmware")],
    component: () => import("./routes/firmware/AddFirmware")
  },
  {
    // 设备管理
    path: "/devicemanage",
    models: () => [import("./models/devices")],
    component: () => import("./routes/devices")
  },
  {
    // 新增设备信息
    path: "/adddevice",
    models: () => [import("./models/addOrUpdateDevice")],
    component: () => import("./routes/addOrUpdateDevice")
  },
  {
    // 批量新增设备信息
    path: "/batchadddevice",
    models: () => [import("./models/batchAddDevice")],
    component: () => import("./routes/addOrUpdateDevice/batchAddDevice")
  },
  {
    // 修改设备信息
    path: "/device/:id",
    models: () => [import("./models/addOrUpdateDevice")],
    component: () => import("./routes/addOrUpdateDevice")
  },
  {
    path: "/updatedevice/:sn",
    models: () => [import("./models/updatedevice")],
    component: () => import("./routes/updatedevice")
  },
  {
    path: "/manage/role",
    models: () => [import("./models/role")],
    component: () => import("./routes/role")
  },
  {
    path: "/loginlog", // 登录日志查询
    models: () => [import("./models/loginlog")],
    component: () => import("./routes/loginlog")
  },
  {
    path: "/manage/role/:type",
    models: () => [import("./models/addOrUpdateRole")],
    component: () => import("./routes/role/AddOrUpdate")
  },
  {
    path: "/manage/role/:type/:id",
    models: () => [import("./models/addOrUpdateRole")],
    component: () => import("./routes/role/AddOrUpdate")
  }
];

function RouterConfig({ history, app }) {
  return (
    <Router history={history}>
      <LocaleProvider locale={zh_CN}>
        <App>
          <Switch>
            {routes.map(({ path, ...dynamics }, key) => (
              <Route
                key={key}
                exact
                path={path}
                component={dynamic({
                  app,
                  ...dynamics
                })}
              />
            ))}
          </Switch>
        </App>
      </LocaleProvider>
    </Router>
  );
}

RouterConfig.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object
};

export default RouterConfig;
