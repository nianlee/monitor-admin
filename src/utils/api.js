import config from './config'

export default {
  query: `${config.apiHost}/role/queryRoleList`, // 用户是否登录
  getMenu: '/getMenu', // 获取菜单
  queryDeviceSelective: `${config.apiHost}/device/queryDeviceSelective`, // 查询设备
  deleteDevice:`${config.apiHost}/device/delDeviceById`, // 删除设备

  // 用户登录
  loginLoad: `${config.apiHost}/manager/login`, // 用户登录
  getVerifyCode: `${config.apiHost}/common/getVerifyCode`, // 获取验证码

  // 用户管理
  queryManagerInfoById: `${config.apiHost}/manager/`,

  // 角色管理
  queryRoleList: `${config.apiHost}/role/queryRoleList` // 角色列表查询
}
