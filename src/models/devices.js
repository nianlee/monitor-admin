import { queryDeviceList,deleteDevice,queryDeviceInfo } from "../services/manage";
import { routerRedux } from 'dva/router'
import { message } from 'antd'

export default {

  namespace: 'devices',

  state: {
    //设备列表
    dataSource:[],
    deviceInfos:[],
    deviceDynamicDTOS:[],
    modalVisible:false,
    sn:{},

  },

  effects: {
    *queryDeviceInfos({ payload }, { call, put, select }) {
      const resData = yield call(queryDeviceInfo,{deviceSn:payload});
      if(resData.success) {

        yield put({
          type:'showAddModal',
          payload:{
            deviceInfos:resData.data[0].datDevice,
            deviceDynamicDTOS:resData.data[0].deviceDynamicDTOS,
          }
        })
      }else {
        throw  message.error(resData.msg)
      }
    },

    *queryDeviceList({ payload }, { call, put, select }) {
      const resData = yield call(queryDeviceList,payload);

      const devicesList = [];

      if(resData.success) {
        for (var v of resData.data) {
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
      } else {
        throw  message.error(resData.msg)
      }
    },

    // 删除设备
    *deleteDevice({ payload }, { call, put, select }) {
      console.log('payload',payload);
      const result = yield call(deleteDevice,payload)
      console.log('result',result);
      if(result.result === "true") { //删除成功，更新dataSource
        yield put({
          type:'updateDeleteState',
          payload:payload
        })
      } else {
        throw result.msg
      }
    },


    //添加设备
    *addDevice({ payload }, { call, put, select }) {
      yield put(routerRedux.push('/adddevice'))
    },


    //跳转到控制页面
    *controlDevice({ payload },{ call,put,select }) {
      /*
      yield put(routerRedux.push({
          pathname:'/controldevice',
          query:{
            sn:payload,
          }
        },
      )
      */

      yield put(routerRedux.push({
          pathname:'/controldevice',
          query:{
            sn:payload,
          }
        },
      )
    )
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
              installAddr:''
            }})
        }
      });
    },
  },

};
