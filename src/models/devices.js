import {
  queryDevices,
  delDeviceById,
  queryDeviceBySn,
  queryDeviceType,
  queryAreaList,
  queryAreaByParentCode,
  deviceUpgradeBatch,
  queryFirmwareVersion,
  updateFirmwareVersion,
  batchOverhaulDevice,
  batchControlDoorState,
  batchControlDevice
} from "../services/manage";
import { routerRedux } from "dva/router";
import { message } from "antd";
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
    deviceSnList: [],

    deviceTypes: [],
    deviceState: [],
    regionList: [],

    deviceDetailModalVisible: false, // 设备详情弹框
    deviceDetailInfo: {}, // 设备详情

    queryParamsCache: null, // 查询参数缓存

    controlParamsModalVisible: false, // 控制设备弹窗

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
    // 根据sn 查询设备详细信息
    *queryDeviceBySn({ payload }, { call, put }) {
      const resData = yield call(queryDeviceBySn, payload);

      if (resData.success) {
        const info = resData.data.rows[0].datDeviceDetailDTO; // 固定属性
        const deviceDetailInfo = {
          name: info.name,
          deviceDetailMetas: []
        };

        const deviceDetailMetas = deviceDetailInfo.deviceDetailMetas;

        deviceDetailMetas.push({
          key: "设备名称",
          title: "设备名称",
          description: info.name
        });

        deviceDetailMetas.push({
          key: "mac",
          title: "mac",
          description: info.mac
        });

        deviceDetailMetas.push({
          key: "设备类型",
          title: "设备类型",
          description: info.type
        });

        deviceDetailMetas.push({
          key: "设备状态",
          title: "设备状态",
          description: info.state
        });

        deviceDetailMetas.push({
          key: "硬件版本",
          title: "硬件版本",
          description: info.hardwareVersion
        });

        deviceDetailMetas.push({
          key: "设备地址",
          title: "设备地址",
          description: info.detailAddr
        });

        // 动态属性
        const deviceDynamicDTOS = resData.data.rows[0].deviceDynamicDTOS;
        if (deviceDynamicDTOS) {
          deviceDynamicDTOS.forEach(item => {
            deviceDetailMetas.push({
              key: item.attributeDesc,
              title: item.attributeName,
              description: item.attributeValue
            });
          });
        }

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

      if (resData.success && resData.data) {
        const devicesList = resData.data.rows.map((item, index) => {

          console.log('tt',item);

          if (item.state == "-1") {
            item.state = "故障";
          } else if (item.state == "0") {
            item.state = "离线";
          } else {
            item.state = "正常";
          }

          if (item.overhaulState == "1") {
            item.overhaulState = "检修";
          } else if (item.overhaulState == "0") {
            item.overhaulState = "正常";
          }

          item.key = item.sn;
          item.index = index + 1;

          return item;
        });

        yield put({
          type: "updateState",
          payload: {
            dataSource: devicesList,
            total: resData.data.total,
            pageSize: resData.data.pageSize,
            currentPage: resData.data.curPage
          }
        });

        yield put({
          type: "updatePagination",
          payload: {
            total: resData.data.total,
            pageIndex: resData.data.curPage,
            pageSize: resData.data.pageSize
          }
        });
      } else {
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
          type: "updateState"
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
