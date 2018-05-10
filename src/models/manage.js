import { queryDeviceList } from "../services/manage";

export default {

  namespace: 'manage',

  state: {
    // 用户列表
    usetListInfo:[],
    //设备列表
    devicesListInfo:[],

  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *queryDeviceList({ payload }, { call, put, select }) {
      const resData = yield call(queryDeviceList,payload)

      const devicesListInfo = []

      for (var v of resData.data) {
        //console.log(v.datDevice);
        devicesListInfo.push({
          name: v.datDevice.name,
          sn: v.datDevice.sn,
          detailAddr: v.datDevice.detailAddr,
          manufacturer: v.datDevice.manufacturer,
          type: v.datDevice.type,
          state: v.datDevice.state,
        })
      }

      yield put({
        type:'updateState',
        payload:{
          devicesListInfo:devicesListInfo,
        }
      })
    },

    // 删除设备
    *deleteDevice({ payload }, { call, put, select }) {
      //state.devicesListInfo:state.devicesListInfo.filter(item => item.key != payload.key)
      yield console.log(payload);
      //console.log(payload.key);
    },

    //添加设备
    *addDevice({ payload }, { call, put, select }) {

    }

  },

  reducers: {
    updateState (state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    }
  },

};
