import config from './config'

export default {
  query: `${config.apiHost}/role/queryRoleList`, // 用户是否登录
  getMenu: '/getMenu', // 获取菜单

  // 设备管理
  queryDeviceSelective: `${config.apiHost}/device/queryDeviceSelective`, // 查询设备
  deleteDevice:`${config.apiHost}/device/delDeviceById`, // 删除设备
  addDevice:`${config.apiHost}/device/addDevice`, // 添加设备

  // 用户登录
  loginLoad: `${config.apiHost}/manager/login`, // 用户登录
  getVerifyCode: `${config.apiHost}/common/getVerifyCode`, // 获取验证码

  // 用户管理
  queryManagerInfoById: `${config.apiHost}/manager/`,

  // 角色管理
  queryRoleList: `${config.apiHost}/role/queryRoleList`, // 角色列表查询
  addRole: `${config.apiHost}/role/addRole`, // 角色添加
  queryRoleInfoById: `${config.apiHost}/role/queryRoleInfoById`, // 角色信息查询
  editRoleById: `${config.apiHost}/role/editRoleById`, // 角色更新
  queryRoleMenuList: `${config.apiHost}/role/queryRoleMenuList`, // 角色菜单查询

  // 区域管理
  queryRegion:`${config.apiHost}/area/queryAreaList`, // 查询区域树
}
