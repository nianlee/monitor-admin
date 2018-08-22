import {
  queryAreaList,
  addDevice,
  queryDeviceType,
  queryAreaByParentCode,
  queryDeviceBySn
} from "services/manage/";
import { routerRedux } from "dva/router";
import { message } from "antd";
import pathToRegexp from "path-to-regexp";

export default {
  namespace: "addOrUpdateDevice",

  state: {
    type: "add", // 页面类型，新增- add  修改- edit
    regionList: [],
    deviceTypeList: [],

    formParams: {
      sn: {
        value: ""
      },
      type: {
        value: ""
      },
      longitude: {
        value: ""
      },
      latitude: {
        value: ""
      },
      code: {
        value: ""
      },
      detail_addr: {
        value: ""
      },
      addressCasc: {
        value: []
      }
    } // 表单参数
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const addMatch = pathToRegexp("/adddevice").exec(pathname);
        const updateMatch = pathToRegexp("/device/:id").exec(pathname);

        let isMatched = false;

        if (addMatch) {
          isMatched = true;
          dispatch({ type: "updateState", payload: { type: "add" } });
          dispatch({ type: "clearFormParams" });
        }

        if (updateMatch) {
          isMatched = true;
          dispatch({ type: "updateState", payload: { type: "edit" } });
          dispatch({
            type: "queryDeviceBySn",
            payload: { deviceSn: updateMatch[1] }
          });
        }

        if (isMatched) {
          dispatch({
            type: "queryAreaList",
            payload: { level: 1 }
          });

          dispatch({
            type: "queryDeviceType",
            payload: {
              page: "1",
              rows: "100",
              paramType: "sys-device-type"
            }
          });
        }
      });
    }
  },

  effects: {
    // 添加设备
    *add({ payload }, { call, put }) {
      const resData = yield call(addDevice, payload);
      if (resData.success) {
        yield put(routerRedux.push("/devicemanage"));
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
            deviceTypeList: types
          }
        });
      } else {
        message.error(resData.message);
      }
    },

    //获取设备名称
    *queryDeviceName({ payload }, { call, put }) {
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
            deviceNameList: types
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
        message.error(resData.msg);
      }
    },

    // 根据sn 查询设备详细信息
    *queryDeviceBySn({ payload }, { call, put }) {
      const resData = yield call(queryDeviceBySn, payload);

      if (resData.success && resData.data) {
        const infos = resData.data.rows[0].datDeviceDetailDTO;
        if (infos) {
          yield put({
            type: "updateFormParams",
            payload: {
              sn: {
                value: infos.sn
              },
              type: {
                value: infos.type
              },
              longitude: {
                value: infos.longitude
              },
              latitude: {
                value: infos.latitude
              },
              code: {
                value: infos.code
              },
              detail_addr: {
                value: infos.detailAddr
              },
              addressCasc: {
                value: []
              }
            }
          });
        }
      } else {
        message.error(resData.message);
      }
    },

    // 清空formParams 缓存
    *clearFormParams(params, { call, put }) {
      yield put({
        type: "updateFormParams",
        payload: {
          sn: {
            value: ""
          },
          type: {
            value: ""
          },
          longitude: {
            value: ""
          },
          latitude: {
            value: ""
          },
          code: {
            value: ""
          },
          detail_addr: {
            value: ""
          },
          addressCasc: {
            value: []
          }
        }
      });
    }
  },

  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload
      };
    },

    updateFormParams(state, { payload }) {
      return {
        ...state,
        formParams: {
          ...state.formParams,
          ...payload
        }
      };
    }
  }
};
