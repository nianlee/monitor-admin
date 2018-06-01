import { queryDeviceList,deleteDevice,queryDeviceInfo } from "../services/manage";
import { routerRedux } from 'dva/router'
import { message } from 'antd'

export default {

  namespace: 'devices',

  state: {
    //设备列表
    dataSource:[],
    deviceInfos:[],
    modalVisible:false

  },

  effects: {
    *queryDeviceInfos({ payload }, { call, put, select }) {
      const resData = yield call(queryDeviceInfo,{deviceSn:payload});
      console.log('sn',payload)
      console.log('resData',resData)
      //let deviceinfo = {};
      if(resData.success) {

        /*
        deviceinfo.push({
          sn:resData.data[0].datDevice.sn, // sn
          name:resData.data[0].datDevice.name, //设备名称
          installTime:resData.data[0].datDevice.installTime, // 安装时间
          type:resData.data[0].datDevice.type, // 设备类型
          detailAddr:resData.data[0].datDevice.detailAddr, // 安装详细地址
          hardwareVersion:resData.data[0].datDevice.hardwareVersion, // 硬件版本
        })*/

        yield put({
          type:'showAddModal',
          payload:{
            deviceInfos:resData.data[0].datDevice,
          }
        })
      }else {
        throw  message.error(resData.msg)
      }
    },

    *queryDeviceList({ payload }, { call, put, select }) {
      const resData = yield call(queryDeviceList,payload);

      const devicesList = [];

      console.log("v",resData);

      if(resData.success) {
        for (var v of resData.data) {
          console.log("v",v.datDevice);
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
      const result = yield call(deleteDevice,{id:payload})
      if(result.result === "true") { //删除成功，更新dataSource
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
    },


    //跳转到控制页面
    *controlDevice({ payload },{ call,put,select }) {
      yield put(routerRedux.push(
        '/controldevice', {sn:'11-22-33'}
      ))
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
