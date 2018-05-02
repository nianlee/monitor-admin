import config from './config'

export default {
  query: '/query',
  getMenu: '/getMenu', // 获取菜单
  queryDeviceSelective: `${config.apiHost}/device/queryDeviceSelective`,

  // 用户登录
  loginLoad: `${config.apiHost}/loginLoad`,
}