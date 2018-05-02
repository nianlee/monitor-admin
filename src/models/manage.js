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
      const info = resData.data[0].datDevice
      const devicesListInfo = []
      console.log(info)
      devicesListInfo.push({
        key:1,
        title:'设备名称',
        description:info.name,
      })

      devicesListInfo.push({
        key:2,
        title:'sn',
        description:info.sn,
      })

      devicesListInfo.push({
        key:3,
        title:'地址',
        description:info.detailAddr,
      })

      devicesListInfo.push({
        key:4,
        title:'设备厂商',
        description:info.manufacturer,
      })

      devicesListInfo.push({
        key:5,
        title:'设备类型',
        description:info.type,
      })

      devicesListInfo.push({
        key:6,
        title:'设备状态',
        description:info.state,
      })

      yield put({
        type:'updateState',
        payload:{
          devicesListInfo:devicesListInfo,
        }
      })
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
