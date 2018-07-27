import {
  queryDeviceCountByState,
  queryOfflineDevices,
  queryOnlineDevices,
  queryAlarmDevices,
  queryDeviceCountByLevel1Area,
  queryDeviceCountByStateHis,
} from '../services/dashboard'
import { queryDeviceList,
  queryAreaList,
  queryAreaByParentCode,
  queryDeviceType} from '../services/manage'
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
    regionList: [],// 区域列表
    deviceTypes:[],// 设备类型列表
    deviceState:[],// 设备状态列表
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
          dispatch({type: "queryAreaList", payload: {level: 1}});
          dispatch({type: "queryDeviceType", payload: {page: "1", rows: "100", paramType: "sys-device-type"}});
          dispatch({type: "queryDeviceState", payload: {page: "1", rows: "100", paramType: "sys-device-state"}});

          window.GLOBAL_INTERVAL = setInterval(function(){
            dispatch({ type: 'queryDeviceCountByState' });
            dispatch({ type: 'queryOnlineDevices', payload: { page: 1, rows: 2 }});
            dispatch({ type: 'queryAlarmDevices', payload: { page: 1, rows: 4 }});
            dispatch({ type: 'queryOfflineDevices', payload: { page: 1, rows: 2 }});

            dispatch({ type: 'queryDeviceCountByLevel1Area', payload: { name: '重庆市'}});
            dispatch({ type: 'queryDeviceCountByStateHis', payload: { needCache: 'true',timeType:'DAY'}});
            //dispatch({type: "queryDeviceList", payload: {page: "1", row: "10"}});
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

          if(item.powerSupplyState == '1') {
            item.powerSupplyState = '正常'
          } else {
            item.powerSupplyState = '异常'
          }

          if(item.environmentState == '1') {
            item.environmentState = '风扇开'
          } else {
            item.environmentState = '风扇关'
          }

          if(item.networkState == '1') {
            item.networkState = '正常'
          } else {
            item.networkState = '异常'
          }

          if(item.securityState == '1') {
            item.securityState = '正常'
          } else {
            item.securityState = '异常'
          }

          if(item.lightningProtectionState == '1') {
            item.lightningProtectionState = '正常'
          } else {
            item.lightningProtectionState = '异常'
          }

          if(item.leakageState == '1') {
            item.leakageState = '正常'
          } else {
            item.leakageState = '异常'
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

    updatePagination(state, { payload }) {
      return {
        ...state,
        pagination: {
          ...state.pagination,
          ...payload
        }
      };
    },
  },
};
