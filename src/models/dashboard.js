import {
  queryDeviceCountByState,
  queryOfflineDevices,
  queryOnlineDevices,
  queryAlarmDevices,
  // queryDeviceCountByArea,
} from '../services/dashboard'
//import { message } from 'antd'


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
    alarmList: [], // 警告设备列表
    offlineList: [], // 离线设备列表
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname })=> {
        if (pathname == '/dashboard') {
          dispatch({ type: 'queryDeviceCountByState' })
          dispatch({ type: 'queryOnlineDevices', payload: { page: 1, rows: 2 }})
          dispatch({ type: 'queryAlarmDevices', payload: { page: 1, rows: 4 }})
          dispatch({ type: 'queryOfflineDevices', payload: { page: 1, rows: 2 }})

          window.GLOBAL_INTERVAL = setInterval(function(){
            dispatch({ type: 'queryDeviceCountByState' })
            dispatch({ type: 'queryOnlineDevices', payload: { page: 1, rows: 2 }})
            dispatch({ type: 'queryAlarmDevices', payload: { page: 1, rows: 4 }})
            dispatch({ type: 'queryOfflineDevices', payload: { page: 1, rows: 2 }})
          }, 10*1000)
        } else {
          clearInterval(window.GLOBAL_INTERVAL)
        }
      })
    },
  },

  effects: {
    // 统计设备状态对应设备数
    *queryDeviceCountByState({ payload }, { call, put }) {
      const resData = yield call(queryDeviceCountByState)
      if (resData.success) {
        yield put({ type: 'save', payload: { ...resData.data }})
      } else {
        console.log(resData.message)
      }
    },

    // 统计设备在线列表
    *queryOnlineDevices({ payload }, { call, put }) {
      const resData = yield call(queryOnlineDevices, payload)
      if (resData.success) {

        // 添加key
        const onlineList = resData.data.rows.map(item => {
          item.key = item.id
          return item
        })

        yield put({ type: 'save', payload: { onlineList }})
      } else {
        console.log(resData.message)
      }
    },

    // 统计故障设备列表
    *queryAlarmDevices({ payload }, { call, put }) {
      const resData = yield call(queryAlarmDevices, payload)
      if (resData.success) {
        console.log('alarm',resData)
        // 添加key
        const alarmList = resData.data.rows.map(item => {
          item.key = item.id
          return item
        })

        yield put({ type: 'save', payload: { alarmList }})
      } else {
        console.log(resData.message)
      }
    },

    // 离线设备列表
    *queryOfflineDevices({ payload }, { call, put }) {
      const resData = yield call(queryOfflineDevices, payload)
      if (resData.success) {

        // 添加key
        const offlineList = resData.data.rows.map(item => {
          item.key = item.id
          return item
        })

        yield put({ type: 'save', payload: { offlineList }})
      } else {
        console.log(resData.message)
      }
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
