let database = [
  {
    id: "1",
    icon: "dashboard",
    name: "首页",
    route: "/dashboard"
  },
  {
    id: "2",
    name: "统计报表",
    icon: "user",
    route: "/report"
  },

  {
    id: "4",
    name: "GIS信息",
    icon: "camera-o",
    route: "/gis"
  },
  {
    id: "51",
    bpid: "5",
    name: "设备管理",
    icon: "search",
    route: "/devicemanage"
  },
  {
    id: "52",
    name: "固件管理",
    icon: "bars",
    route: "/firmware"
  },
  {
    id: "53",
    name: "区域管理",
    icon: "bars",
    route: "/region"
  },
  {
    id: "61",
    bpid: "6",
    name: "用户管理",
    icon: "search",
    route: "/usermanage"
  },
  {
    id: "62",
    bpid: "6",
    name: "角色管理",
    icon: "search",
    route: "/manage/role"
  },
  {
    id: "63",
    bpid: "6",
    name: "登录信息",
    icon: "search",
    route: "/loginlog"
  }
];

module.exports = {
  [`GET /getMenu`](req, res) {
    res.status(200).json({
      result: "success",
      data: database,
      msg: "success"
    });
  },

  [`GET /query`](req, res) {
    res.status(200).json({
      result: "success",
      data: database,
      msg: "success"
    });
  }
};
