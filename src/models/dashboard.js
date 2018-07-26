import {
  queryDeviceCountByState,
  queryOfflineDevices,
  queryOnlineDevices,
  queryAlarmDevices,
  queryDeviceCountByLevel1Area,
  queryDeviceCountByStateHis,
} from '../services/dashboard'
import { queryDeviceList } from '../services/manage'
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
    alarmList: [], // 警告设备列表
    offlineList: [], // 离线设备列表

    AreaCount:[], // 每个区的设备量
    timeIdList:[], // 日期ID数组
    onlineNumList:[],//在线数数组
    offlineNumList:[],//离线数数组
    alarmNumList:[],//预警数数组
    onlineRateList:[],//在线率数组
    offlineRateList:[],//离线率数组
    alarmRateList:[],//预警率数组
    healthRateList:[],//健康度数组

    dataSource: [],// 设备列表
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
      history.listen(({ pathname })=> {
        if (pathname == '/dashboard') {
          dispatch({ type: 'queryDeviceCountByState' });
          dispatch({ type: 'queryOnlineDevices', payload: { page: 1, rows: 2 }});
          dispatch({ type: 'queryAlarmDevices', payload: { page: 1, rows: 4 }});
          dispatch({ type: 'queryOfflineDevices', payload: { page: 1, rows: 2 }});

          dispatch({ type: 'queryDeviceCountByLevel1Area', payload: { name: '重庆市'}});
          dispatch({ type: 'queryDeviceCountByStateHis', payload: { needCache: 'true',timeType:'DAY'}});
          dispatch({type: "queryDeviceList", payload: {page: "1", row: "10"}});

          window.GLOBAL_INTERVAL = setInterval(function(){
            dispatch({ type: 'queryDeviceCountByState' });
            dispatch({ type: 'queryOnlineDevices', payload: { page: 1, rows: 2 }});
            dispatch({ type: 'queryAlarmDevices', payload: { page: 1, rows: 4 }});
            dispatch({ type: 'queryOfflineDevices', payload: { page: 1, rows: 2 }});

            dispatch({ type: 'queryDeviceCountByLevel1Area', payload: { name: '重庆市'}});
            dispatch({ type: 'queryDeviceCountByStateHis', payload: { needCache: 'true',timeType:'DAY'}});
            dispatch({type: "queryDeviceList", payload: {page: "1", row: "10"}});
          }, 10*1000)
        } else {
          clearInterval(window.GLOBAL_INTERVAL)
        }
      })
    },
  },

  effects: {

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

    //统计设备状态对应设备数历史列表
    *queryDeviceCountByStateHis({ payload }, { call, put }) {
      const resData = yield call(queryDeviceCountByStateHis,payload);

      if (resData.success) {
        yield put({ type: 'save', payload: { ...resData.data }})
        } else {
        console.log(resData.message)
      }
    },


    // 统计设备状态对应设备数
    *queryDeviceCountByLevel1Area({ payload }, { call, put }) {
      const resData = yield call(queryDeviceCountByLevel1Area,payload);
      const relist = [];
      if (resData.success) {
        resData.data.forEach(item => {
          relist.push({
            name: item.name,
            value: item.value,
          })
        })

        yield  put({
          type:'save',
          payload:{
            AreaCount:relist,
          }
        })
      } else {
        console.log(resData.message)
      }
    },

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

    updateState (state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
};
