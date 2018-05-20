import { queryDeviceList,deleteDevice } from "../services/manage";
import { routerRedux } from 'dva/router'

export default {

  namespace: 'devices',

  state: {
    //设备列表
    dataSource:[],
    modalVisible:false

  },

  effects: {
    *queryDeviceList({ payload }, { call, put, select }) {
      const resData = yield call(queryDeviceList,payload)

      const devicesList = []

      for (var v of resData.data) {
        //console.log(v.datDevice);
        devicesList.push({
          id:v.datDevice.id,
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
      const result = yield call(deleteDevice,{id:payload})
      if(result.result === "success") { //删除成功，更新dataSource
        yield put({
          type:'updateDeleteState',
          payload:{
            id:payload
          }
        })
      } else {
        throw result.msg
      }
    },

    //添加设备
    *addDevice({ payload }, { call, put, select }) {
      yield put(routerRedux.push('/adddevice'))
    }

  },

  reducers: {
    updateState (state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },

    updateDeleteState (state, { payload }) {
      state.dataSource = state.dataSource.filter(item => item.id != payload.id) //eslint-disable-line
      return {
        ...state,
        ...payload,
      }
    },

    showAddModal(state,{ payload }) {
      return {
        ...state,
        ...payload,
        modalVisible:true
      }
    },

    hideAddModal(state,{ payload }) {
      return {
        ...state,
        ...payload,
        modalVisible:false
      }
    },
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
