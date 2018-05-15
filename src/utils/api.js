import config from './config'

export default {
  query: '/query',
  getMenu: '/getMenu', // 获取菜单
  queryDeviceSelective: `${config.apiHost}/device/queryDeviceSelective`, // 查询设备
  deleteDevice:`${config.apiHost}/device/delDeviceById`, //删除设备

  // 用户登录
  loginLoad: `${config.apiHost}/loginLoad`,

  // 用户管理
  queryManagerInfoById: `${config.apiHost}/manager/`,
}
