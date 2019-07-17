import {
  queryDevices,
  delDeviceById,
  queryDeviceBySn,
  queryDeviceByAlarmInfo,
  queryDeviceType,
  queryAreaList,
  queryAreaByParentCode,
  deviceUpgradeBatch,
  queryFirmwareVersion,
  updateFirmwareVersion,
  batchOverhaulDevice,
  batchControlDoorState,
  batchControlDevice,
  checkUpgradePassword
} from "../services/manage";
import { routerRedux } from "dva/router";
import { message } from "antd";
import { formatState, formateDynamic } from "utils";

export default {
  namespace: "devices",

  state: {
    //设备列表
    dataSource: [],
    deviceInfos: [],

    dataUpTime: "", //数据上传时间
    firmwareVersion: "", //固件版本号

    deviceDynamicDTOS: [],
    sn: {},
    selectedRowKeys: [], // 选中的keys, sn string array
    deviceSnList: [],// 需要批量升级的设备的sn号列表

    deviceTypes: [],
    deviceState: [],
    regionList: [],

    deviceDetailModalVisible: false, // 设备详情弹框
    deviceDetailInfo: {}, // 设备详情
    deviceDetailAlarmInfo:{},// 设备预警列表信息

    queryParamsCache: null, // 查询参数缓存

    controlParamsModalVisible: false, // 控制设备弹窗
    passwordModalVisible:false, // 升级的时候要要在输入框中教研密码
    upgradePassword:"",// 升级需要输入的密码
    upgradeSn:"", // 需要升级的设备的sn号

    pagination: {
      current: 1,
      pageSize: 10,
      total: 0,
      showTotal: total => `共${total}条数据`,
      showQuickJumper: true,
      showSizeChanger: true
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === "/devicemanage") {
          dispatch({
            type: "queryDevices",
            payload: {
              page: "1",
              row: "10"
            }
          });

          dispatch({
            type: "queryDeviceType",
            payload: {
              page: "1",
              rows: "100",
              paramType: "sys-device-type"
            }
          });

          dispatch({
            type: "queryDeviceState",
            payload: {
              page: "1",
              rows: "100",
              paramType: "sys-device-state"
            }
          });

          dispatch({
            type: "queryAreaList",
            payload: {
              level: 1
            }
          });
        }
      });
    }
  },

  effects: {

    *queryDeviceByAlarmInfo({ payload }, { call, put }) {

      const resData = yield call(queryDeviceByAlarmInfo, payload);

      const deviceDetailAlarmInfo = {
        alarmInfo:[]
      };

      const alarmInfo = deviceDetailAlarmInfo.alarmInfo;
      if(resData.data.rows) {
        resData.data.rows.forEach(item => {
            alarmInfo.push({
            key: item.alarmCategoryName,
            label: item.alarmCategoryName,
            value: item.alarmInfo
          })
        });

        deviceDetailAlarmInfo.alarmInfo = alarmInfo;

        yield put({
          type: "save",
          payload: { deviceDetailAlarmInfo }
        });
      }
    },


    // 根据sn 查询设备详细信息
    *queryDeviceBySn({ payload }, { call, put }) {
      const resData = yield call(queryDeviceBySn, payload);

      if (resData.success) {
        const info = formatState(resData.data.rows[0].datDeviceDetailDTO); // 固定属性


        const deviceDetailInfo = {
          name: info.name,
          baseInfo: [],
          statusInfo: [],
          dynamicInfo: [],
          controlInfo:[],
          testInfo:[]
        };

        const baseInfo = deviceDetailInfo.baseInfo;

        baseInfo.push({
          key: "设备编码",
          label: "设备编码",
          value: info.code
        });

        baseInfo.push({
          key: "mac",
          label: "mac",
          value: info.mac
        });

        baseInfo.push({
          key: "设备类型",
          label: "设备类型",
          value: info.type
        });

        baseInfo.push({
          key: "固件版本",
          label: "固件版本",
          value: info.firmwareVersion
        });

        baseInfo.push({
          key: "硬件版本",
          label: "硬件版本",
          value: info.hardwareVersion
        });

        baseInfo.push({
          key: "设备状态",
          label: "设备状态",
          value: info.state
        });

        baseInfo.push({
          key: "安装地址",
          label: "安装地址",
          value: info.detailAddr
        });
        baseInfo.push({
          key: "更新时间",
          label: "更新时间",
          value: info.dataUpTime
        });
        baseInfo.push({
          key: "终端IP",
          label: "终端IP",
          value: resData.data.rows[0].deviceDynamicDTOS[22].attributeValue
        });

        // 动态属性
        const deviceDynamicDTOS = resData.data.rows[0].deviceDynamicDTOS;
        const dynamicInfo = [];
        const statusInfo = [];
        const controlInfo = [];

        if (deviceDynamicDTOS) {
          deviceDynamicDTOS.forEach(item => {
              if(item.attributeName != '终端IP') {
                item = formateDynamic(item);

                // 状态信息
                if (
                  item.attributeCode == "ACInput" || //交流输入状态
                  item.attributeCode == "leakageState" || //漏电状态
                  item.attributeCode == "DI1" || //门禁状态
                  //item.attributeCode == "incline" || //箱体倾斜状态
                  item.attributeCode == "DI2" ||   //防雷状态
                  item.attributeCode == "fanState" //风扇状态
                ) {
                  statusInfo.push({
                    key: item.attributeCode,
                    label: item.attributeName,
                    value: item.attributeValue
                  });
                } else if(
                  item.attributeCode == "ACCtrl1" || //第1路交流控制
                  item.attributeCode == "ACCtrl2" || //第2路交流控制
                  item.attributeCode == "DCCtrl1" || //第1路直流控制
                  item.attributeCode == "DCCtrl2" || //第2路直流控制
                  item.attributeCode == "DCCtrl3" || //第3路直流控制
                  item.attributeCode == "DCCtrl4" || //交换机控制
                  item.attributeCode == "DCCtrl5" || //风扇控制
                  item.attributeCode == "DCCtrl6"    //门锁控制
                ) {
                  //控制信息
                  controlInfo.push({
                    key: item.attributeCode,
                    label: item.attributeName,
                    value: item.attributeValue
                  });
                } else {
                  // 动态信息
                  dynamicInfo.push({
                    key: item.attributeCode,
                    label: item.attributeName,
                    value: item.attributeValue
                  });
                }
              }
            });
        }

        deviceDetailInfo.statusInfo = statusInfo;
        deviceDetailInfo.dynamicInfo = dynamicInfo;
        deviceDetailInfo.controlInfo = controlInfo;


        yield put({
          type: "save",
          payload: { deviceDetailInfo }
        });
      } else {
        message.error(resData.message);
      }
    },

    // 查询设备列表
    *queryDevices({ payload }, { call, put, select }) {
      const resData = yield call(queryDevices, payload);

      console.log('queryDevices',resData);

      if (resData.success && resData.data) {
        const devicesList = resData.data.rows.map((item, index) => {
          item = formatState(item);

          item.key = item.sn;
          item.index = index + 1;

          return item;
        });

        yield put({
          type: "updateState",
          payload: { dataSource: devicesList }
        });

        yield put({
          type: "updatePagination",
          payload: {
            total: resData.data.total,
            current: resData.data.curPage,
            pageSize: resData.data.pageSize
          }
        });
      } else {

        const KdevicesList = [];
        yield put({
          type: "updateState",
          payload: { dataSource: KdevicesList }
        });
        message.error(resData.message);
      }

      // 缓存查询参数
      yield put({
        type: "updateState",
        payload: { queryParamsCache: payload }
      });
    },

    // 删除设备
    *delDeviceById({ payload }, { call, put, select }) {
      const result = yield call(delDeviceById, payload);
      if (result.success) {
        //删除成功，更新dataSource
        yield put({
          type: "updateDeleteState",
          payload: payload
        });
      } else {
        message.error(result.message);
      }
    },

    // 升级设备输入密码教研接口
    *checkUpgradePassword({ payload }, { call, put, select }) {

      const result = yield call(checkUpgradePassword, payload);
      if (result.success) {

        // 密码教研成功
        yield put({
          type: "save",
          payload: {passwordModalVisible:false,
          upgradePassword: ""}
        });

        // 升级单个设备
        yield put({
          type: "upgradeDevice",
          payload: { sn: payload.sn }
        });

      } else {
        message.error("密码错误");
      }
    },

    //添加设备
    *addDevice({ payload }, { call, put, select }) {
      yield put(routerRedux.push("/adddevice"));
    },

    //跳转到控制页面
    *controlDevice({ payload }, { call, put, select }) {
      yield put(
        routerRedux.push({
          pathname: "/controldevice",
          query: {
            sn: payload
          }
        })
      );
    },

    //获取设备类型
    *queryDeviceType({ payload }, { call, put }) {
      const resData = yield call(queryDeviceType, payload);
      const types = [];
      if (resData.success) {
        for (let i = 0; i < resData.data.length; i++) {
          types.push({
            id: i,
            name: resData.data[i].name,
            value: resData.data[i].value
          });
        }
        yield put({
          type: "updateState",
          payload: {
            deviceTypes: types
          }
        });
      } else {
        message.error(resData.message);
      }
    },

    //获取设备状态
    *queryDeviceState({ payload }, { call, put }) {
      const resData = yield call(queryDeviceType, payload);
      const types = [];
      if (resData.success) {
        for (let i = 0; i < resData.data.length; i++) {
          types.push({
            id: i,
            name: resData.data[i].name,
            value: resData.data[i].value
          });
        }
        yield put({
          type: "updateState",
          payload: {
            deviceState: types
          }
        });
      } else {
        message.error(resData.message);
      }
    },

    // 获取区域
    *queryAreaList({ payload }, { call, put }) {
      const resData = yield call(queryAreaList, payload);
      const relist = [];

      if (resData.success) {
        resData.data.forEach(item => {
          relist.push({
            ...item,
            isLeaf: !item.isParent,
            label: item.name,
            value: item.code
          });
        });

        yield put({
          type: "updateState",
          payload: {
            regionList: relist
          }
        });
      } else {
        message.error(resData.message);
      }
    },

    // 区域查询ByParentCode
    *queryAreaByParentCode({ payload }, { call, put }) {
      const addressLength = payload.length;
      const targetOption = payload[addressLength - 1];
      targetOption.loading = true;

      const resData = yield call(queryAreaByParentCode, {
        parentCode: targetOption.value
      });
      targetOption.loading = false;
      if (resData.success) {
        targetOption.children = resData.data.map(item => {
          return {
            ...item,
            isLeaf: addressLength > 2,
            label: item.name,
            value: item.code
          };
        });
      } else {
        message.error(resData.message);
      }
    },

    // 批量升级
    *deviceUpgradeBatch({ payload }, { call, put }) {
      const resData = yield call(deviceUpgradeBatch, payload);
      if (resData.success) {
        yield put({
          type: "updateState",
          payload: { passwordModalVisible: payload.passwordModalVisible,
            upgradePassword: ""}
        });
        message.success("升级成功");
      } else {
        message.error(resData.message);
      }
    },

    // 批量检修/取消检修设备
    *batchOverhaulDevice({ payload }, { call, put }) {
      const resData = yield call(batchOverhaulDevice, payload);
      if (resData.success) {
        yield put({
          type: "updateState"
        });
        message.success("批量检修成功");
      } else {
        message.error(resData.message);
      }
    },

    // 批量控制门禁状态
    *batchControlDoorState({ payload }, { call, put }) {
      const resData = yield call(batchControlDoorState, payload);
      if (resData.success) {
        yield put({
          type: "updateState"
        });
        message.success("批量开门成功");
      } else {
        message.error(resData.message);
      }
    },

    // 批量控制设备
    *batchControlDevice({ payload }, { call, put }) {
      const resData = yield call(batchControlDevice, payload);

      if (resData.success) {
        yield put({ type: "updateState" });
        yield put({
          type: "save",
          payload: { controlParamsModalVisible: false }
        });
        message.success("批量重启成功");
      } else {
        message.error(resData.message);
      }
    },

    // 升级单个设备
    *upgradeDevice({ payload }, { call, put }) {
      const firmwareVersionData = yield call(queryFirmwareVersion, payload);
      if (firmwareVersionData.success) {
        const resData = yield call(updateFirmwareVersion, {
          sn: payload.sn,
          firmwareVersion: firmwareVersionData.data.firmwareVersion
        });
        if (resData.success) {
          message.success("升级成功");
        } else {
          message.error(resData.message);
        }
      } else {
        message.warn(firmwareVersionData.message);
      }
    }
  },

  reducers: {
    updatePagination(state, { payload }) {
      return {
        ...state,
        pagination: {
          ...state.pagination,
          ...payload
        }
      };
    },

    save(state, { payload }) {
      return {
        ...state,
        ...payload
      };
    },

    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
        selectedRowKeys: [],
        deviceSnList: []
      };
    },

    updateDeleteState(state, { payload }) {
      state.dataSource = state.dataSource.filter(item => item.id != payload.id); //eslint-disable-line
      return {
        ...state,
        ...payload
      };
    },

    updateSelect(state, { payload }) {
      return {
        ...state,
        selectedRowKeys: payload.selectedRowKeys,
        deviceSnList: payload.deviceSnList
      };
    }
  }
};
