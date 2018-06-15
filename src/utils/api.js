import config from './config'

export default {
  query: `${config.apiHost}/role/queryRoleList`, // 用户是否登录
  getMenu: '/getMenu', // 获取菜单

  // 设备管理
  queryDeviceSelective: `${config.apiHost}/device/queryDevices`, // 查询设备
  deleteDevice:`${config.apiHost}/device/delDeviceById`, // 删除设备
  addDevice:`${config.apiHost}/device/addDevice`, // 添加设备
  controlDevice:`${config.apiHost}/device/deviceControl`, //设备控制
  queryDeviceInfo:`${config.apiHost}/device/queryDeviceBySn`, //设备控制
  queryFirmwareVersion:`${config.apiHost}/device/queryFirmwareForUpgrade`, //设备控制
  updateFirmwareVersion:`${config.apiHost}/device/deviceUpgrade`, //设备控制
  queryDeviceTypes:`${config.apiHost}/param/queryParamListForDropdown`, //设备控制

  // 统计相关
  queryDeviceCountByState:`${config.apiHost}/statistic/queryDeviceCountByState`, // 统计设备状态对应设备数
  queryOfflineDevices:`${config.apiHost}/statistic/queryOfflineDevices`, // 统计设备离线列表
  queryOnlineDevices:`${config.apiHost}/statistic/queryOnlineDevices`, // 统计设备在线列表
  queryAlarmDevices:`${config.apiHost}/statistic/queryAlarmDevices`, // 统计设备预警列表
  queryDeviceCountByArea:`${config.apiHost}/statistic/queryDeviceCountByArea`, // 统计设备区域对应设备数
  
  // 用户登录
  loginLoad: `${config.apiHost}/manager/login`, // 用户登录
  loginout: `${config.apiHost}/manager/logout`, // 用户退出登录
  getVerifyCode: `${config.apiHost}/common/getVerifyCode`, // 获取验证码
  queryManagerInfoById: `${config.apiHost}/manager`,
  queryUserListInfo: `${config.apiHost}/manager/managerList`, // 用户列表信息查询
  deleteUser: `${config.apiHost}/manager/delManagerById`,
  modifyUserInfo:`${config.apiHost}/manager/editManagerById`,
  queryUserInfo:`${config.apiHost}/manager/queryManagerInfoById`,
  addUser:`${config.apiHost}/manager/addManager`,

  // 区域管理
  queryAreaList: `${config.apiHost}/area/queryAreaList`, // 查询区域列表
  addArea: `${config.apiHost}/area/addArea`, // 添加区域接口
  editAreaById: `${config.apiHost}/area/editAreaById`, // 修改区域接口
  delAreaById: `${config.apiHost}/area/delAreaById`, // 删除区域接口

  // 角色管理
  queryRoleList: `${config.apiHost}/role/queryRoleList`, // 角色列表查询
  addRole: `${config.apiHost}/role/addRole`, // 角色添加
  queryRoleInfoById: `${config.apiHost}/role/queryRoleInfoById`, // 角色信息查询
  editRoleById: `${config.apiHost}/role/editRoleById`, // 角色更新
  queryRoleMenuList: `${config.apiHost}/role/queryRoleMenuList`, // 角色菜单查询

  // 其他
  regeo: 'http://restapi.amap.com/v3/geocode/regeo', // 逆地理编码
}
