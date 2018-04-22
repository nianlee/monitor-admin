let database = [
  {
    id: '1',
    icon: 'dashboard',
    name: '首页',
    route: '/dashboard',
  },
  {
    id: '2',
    name: '统计报表',
    icon: 'user',
    route: '/report',
    // children: [
    //   {
    //     id: '21',
    //     bpid: '2',
    //     name: '报表子菜单1',
    //     icon: 'shopping-cart',
    //     route: '/report/1',
    //   },
    //   {
    //     id: '22',
    //     bpid: '2',
    //     name: '报表子菜单2',
    //     route: '/report/2',
    //   },
    // ]
  },
  {
    id: '3',
    name: '实时监控',
    icon: 'api',
    route: '/monitor',
  },
  {
    id: '4',
    name: 'GIS信息',
    icon: 'camera-o',
    route: '/gis',
  },
  {
    id: '5',
    name: '管理策略',
    icon: 'heart-o',
    route: '/manage',
  },
  {
    id: '6',
    name: '系统设置',
    icon: 'bars',
    route: '/admin',
    children: [
      {
        id: '61',
        bpid: '6',
        name: '用户管理',
        icon: 'search',
        route: '/admin/user',
      }
    ]
  },
]

module.exports = {
  [`GET /getMenu`] (req, res) {
    res.status(200).json({
      result: 'success',
      data: database,
      msg: 'success',
    })
  },

  [`GET /query`] (req, res) {
    res.status(200).json({
      result: 'success',
      data: database,
      msg: 'success',
    })
  },
}
