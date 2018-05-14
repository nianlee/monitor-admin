import { queryDeviceList } from "../services/manage";

export default {

  namespace: 'devices',

  state: {
    //设备列表
    dataSource:[],

  },

  effects: {
    *queryDeviceList({ payload }, { call, put, select }) {
      const resData = yield call(queryDeviceList,payload)

      const devicesList = []

      for (var v of resData.data) {
        //console.log(v.datDevice);
        devicesList.push({
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
          dataSource:devicesList,
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

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      return history.listen(({pathname,query}) => {
        if(pathname === '/devicemanage') {
          dispatch({type:'queryDeviceList',
            payload:{
              installAddr:1
            }})
        }
      });
    },
  },

};
