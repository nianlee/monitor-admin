import {
  queryDeviceList,
  deleteDevice,
  queryDeviceInfo,
  queryDeviceType,
  queryAreaList,
  queryAreaByParentCode,
  batchUpdae
} from "../services/manage"; //eslint-disable-line
import { routerRedux } from "dva/router";
import { message } from "antd";

export default {
  namespace: "devices",

  state: {
    //设备列表
    dataSource: [],
    deviceInfos: [],

    dataUpTime:'',//数据上传时间
    firmwareVersion:'',//固件版本号

    deviceDynamicDTOS: [],
    modalVisible: false,
    sn: {},
    selectedRowKeys: [], // 选中的
    deviceSnList: [],

    deviceTypes: [],
    deviceState: [],
    regionList: [],

    queryParamsCache: null, // 查询参数缓存

    pagination: {
      current: 1,
      pageSize: 10,
      total: 0,
      showTotal: total => `共${total}条数据`,
      showQuickJumper: true,
      showSizeChanger: true
    }
  },

  effects: {
    *queryDeviceInfos({ payload }, { call, put, select }) {
      const resData = yield call(queryDeviceInfo, { deviceSn: payload });
      console.log('deInfo',resData);
      if (resData.success) {
        if(resData.data.rows[0].datDevice.hasOwnProperty("dataUpTime") &&
          resData.data.rows[0].datDevice.hasOwnProperty("firmwareVersion")) {

          yield put({
            type: "showAddModal",
            payload: {
              dataUpTime:resData.data.rows[0].datDevice.dataUpTime,
              firmwareVersion:resData.data.rows[0].datDevice.firmwareVersion,
              deviceInfos: resData.data.rows[0].datDevice,
              deviceDynamicDTOS: resData.data.rows[0].deviceDynamicDTOS
            }
          });
        } else {
          yield put({
            type: "showAddModal",
            payload: {
              dataUpTime:'无',
              firmwareVersion:'无',
              deviceInfos: resData.data.rows[0].datDevice,
              deviceDynamicDTOS: resData.data.rows[0].deviceDynamicDTOS
            }
          });
        }

      } else {
        throw message.error(resData.msg);
      }
    },

    // 查询设备列表
    *queryDeviceList({ payload }, { call, put, select }) {
      const resData = yield call(queryDeviceList, payload);

      if (resData.success) {
        const devicesList = resData.data.rows.map(item => {
          if (item.state == "-1") {
            item.state = "故障";
          } else if (item.state == "0") {
            item.state = "离线";
          } else {
            item.state = "正常";
          }

          item.key = item.id;

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
    *deleteDevice({ payload }, { call, put, select }) {
      const result = yield call(deleteDevice, payload);
      if (result.success) {
        //删除成功，更新dataSource
        yield put({
          type: "updateDeleteState",
          payload: payload
        });
      } else {
        throw result.msg;
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
        message.error(resData.msg);
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
        message.error(resData.msg);
      }
    },

    // 批量升级
    *batchUpdae({ payload }, { call, put }) {
      const resData = yield call(batchUpdae, payload);
      if (resData.success) {
        yield put({
          type: "updateState"
        });
        message.error(resData.msg);
      } else {
        message.error(resData.msg);
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

    showAddModal(state, { payload }) {
      return {
        ...state,
        ...payload,
        modalVisible: true
      };
    },

    hideAddModal(state, { payload }) {
      return {
        ...state,
        ...payload,
        modalVisible: false
      };
    },

    updateSelect(state, { payload }) {
      return {
        ...state,
        ...payload,
        selectedRowKeys: payload.selectedRowKeys,
        deviceSnList: payload.deviceSnList
      };
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
      return history.listen(({ pathname, query }) => {
        if (pathname === "/devicemanage") {
          dispatch({
            type: "queryDeviceList",
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
  }
};
