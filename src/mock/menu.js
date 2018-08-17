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
    id: "5",
    name: "管理策略",
    icon: "heart-o",
    children: [
      {
        id: "51",
        bpid: "5",
        name: "用户管理",
        icon: "search",
        route: "/usermanage"
      },
      {
        id: "52",
        bpid: "5",
        name: "设备管理",
        icon: "search",
        route: "/devicemanage"
      },
      {
        id: "53",
        bpid: "5",
        name: "角色管理",
        icon: "search",
        route: "/manage/role"
      },
      {
        id: "54",
        bpid: "5",
        name: "区域管理",
        icon: "search",
        route: "/region"
      }
    ]
  },
  {
    id: "6",
    name: "系统设置",
    icon: "bars",
    route: "/admin"
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
