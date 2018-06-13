import {
  queryDeviceCountByState,
  // queryOfflineDevices,
  queryOnlineDevices,
  // queryAlarmDevices,
  // queryDeviceCountByArea,
} from '../services/dashboard'
import { message } from 'antd'

export default {
  namespace: 'dashboard',

  state: {
    OfflineRate: 0, // 离线率
    TotalCount: 0, // 设备总数
    OffLineCount: 0, // 离线设备
    OnlineRate: 0, // 在线率
    OnlineCount: 0, // 在线设备数
    AlarmRate: 0, // 警告率
    AlarmCount: 0, // 警告设备数

    onlineList: [], // 在线设备列表
  },

  subscriptions: {
    setup({ dispatch, history }) {
      dispatch({ type: 'queryDeviceCountByState' })
    },
  },

  effects: {
    // 统计设备状态对应设备数
    *queryDeviceCountByState({ payload }, { call, put }) {
      const resData = yield call(queryDeviceCountByState)
      if (resData.success) {
        yield put({ type: 'save', payload: { ...resData.data }})
      } else {
        message.error(resData.message)
      }
    },

    // 统计设备在线列表
    *queryOnlineDevices({ payload }, { call, put }) {
      const resData = yield call(queryOnlineDevices)
      if (resData.success) {
        yield put({ type: 'save', payload: { ...resData.data }})
      } else {
        message.error(resData.message)
      }
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
