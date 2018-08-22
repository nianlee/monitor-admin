import config from "./config";

export default {
  query: `${config.apiHost}/role/queryRoleList`, // 用户是否登录
  getMenu: "/getMenu", // 获取菜单

  // 设备管理
  queryDevices: `${config.apiHost}/device/queryDevices`, // 查询设备
  delDeviceById: `${config.apiHost}/device/delDeviceById`, // 删除设备
  addDevice: `${config.apiHost}/device/addDevice`, // 添加设备
  editDeviceById: `${config.apiHost}/device/editDeviceById`, // 修改设备
  controlDevice: `${config.apiHost}/device/deviceControl`, // 设备控制
  queryDeviceBySn: `${config.apiHost}/device/queryDeviceBySn`, // 根据sn查询设备
  queryDeviceTypes: `${config.apiHost}/param/queryParamListForDropdown`, // 设备控制
  deviceUpgradeBatch: `${config.apiHost}/device/deviceUpgradeBatch`, // 设备控制批量升级
  queryAlarmResultHis: `${config.apiHost}/device/queryAlarmResultHis`, // 设备预警历史列表查询
  batchOverhaulDevice: `${config.apiHost}/device/batchOverhaulDevice`, // 批量检修/取消检修设备
  batchControlDoorState: `${config.apiHost}/device/batchControlDoorState`, // 批量控制门禁状态
  batchControlDevice: `${config.apiHost}/device/batchControlDevice`, // 批量控制设备

  // 统计相关
  queryDeviceCountByState: `${
    config.apiHost
  }/statistic/queryDeviceCountByState`, // 统计设备状态对应设备数
  queryOfflineDevices: `${config.apiHost}/statistic/queryOfflineDevices`, // 统计设备离线列表
  queryOnlineDevices: `${config.apiHost}/statistic/queryOnlineDevices`, // 统计设备在线列表
  queryAlarmDevices: `${config.apiHost}/statistic/queryAlarmDevices`, // 统计设备预警列表
  queryDeviceCountByArea: `${config.apiHost}/statistic/queryDeviceCountByArea`, // 统计设备区域对应设备数
  queryDeviceCountByLevel1Area: `${
    config.apiHost
  }/statistic/queryDeviceCountByLevel1Area`, //根据区域查询设备数据量

  // 统计设备状态对应设备数历史列表
  queryDeviceCountByStateHis: `${
    config.apiHost
  }/statistic/queryDeviceCountByStateHis`,

  // 设备预警数是否变化查询
  queryAlarmDeviceCountWithLast: `${
    config.apiHost
  }/statistic/queryAlarmDeviceCountWithLast`,

  // 一键巡检全量设备
  batchInspectionDevices: `${config.apiHost}/device/batchInspectionDevices`,
  queryBatchInspectionDevicesProgress: `${
    config.apiHost
  }/device/queryBatchInspectionDevicesProgress`, // 一键巡检全量设备处理进度查询

  // 用户登录
  loginLoad: `${config.apiHost}/manager/login`, // 用户登录
  loginout: `${config.apiHost}/manager/logout`, // 用户退出登录
  getVerifyCode: `${config.apiHost}/common/getVerifyCode`, // 获取验证码
  queryUserListInfo: `${config.apiHost}/manager/managerList`, // 用户列表信息查询
  deleteUser: `${config.apiHost}/manager/delManagerById`,
  modifyUserInfo: `${config.apiHost}/manager/editManagerById`,
  queryUserInfo: `${config.apiHost}/manager/queryManagerInfoById`, // 用户详细信息查询
  addUser: `${config.apiHost}/manager/addManager`, // 添加用户
  queryLog: `${config.apiHost}/log/queryLog`, // 日志列表查询

  // 区域管理
  queryAreaList: `${config.apiHost}/area/queryAreaList`, // 查询区域列表
  queryAreaByParentCode: `${config.apiHost}/area/queryAreaByParentCode`, // 区域查询ByParentCode
  addArea: `${config.apiHost}/area/addArea`, // 添加区域接口
  editAreaById: `${config.apiHost}/area/editAreaByCode`, // 修改区域接口
  delAreaByCode: `${config.apiHost}/area/delAreaByCode`, // 删除区域接口

  // 角色管理
  queryRoleList: `${config.apiHost}/role/queryRoleList`, // 角色列表查询
  addRole: `${config.apiHost}/role/addRole`, // 角色添加
  deleteRole: `${config.apiHost}/role/delRoleById`, // 删除添加
  queryRoleInfoById: `${config.apiHost}/role/queryRoleInfoById`, // 角色信息查询
  editRoleById: `${config.apiHost}/role/editRoleById`, // 角色更新
  queryRoleMenuList: `${config.apiHost}/role/queryRoleMenuList`, // 角色菜单查询
  queryRoleListForDropdown: `${config.apiHost}/role/queryRoleListForDropdown`, // 角色列表查询-下拉框
  queryMenuList: `${config.apiHost}/menu/queryMenuList`, // 查询菜单列表

  // 其他
  regeo: "http://restapi.amap.com/v3/geocode/regeo", // 逆地理编码

  // 固件
  queryFirmwareList: `${config.apiHost}/firmware/queryFirmwares`, // 查询固件列表
  queryFirmwareById: `${config.apiHost}/firmware/queryFirmwareById`, // 查询固件-通过ID
  delFirmwareById: `${config.apiHost}/firmware/delFirmwareById`, // 删除固件
  addFirmware: `${config.apiHost}/firmware/addFirmware`, //添加升级固件
  queryFirmwareVersion: `${config.apiHost}/device/queryFirmwareForUpgrade`, //设备升级固件查询
  updateFirmwareVersion: `${config.apiHost}/device/deviceUpgrade`, //设备固件升级
  uploadFirmware: `${config.apiHost}/firmware/uploadFirmware` //上传固件,
};
