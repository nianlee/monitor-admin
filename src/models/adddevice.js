import { getRegionList, addDevice,queryDeviceType } from 'services/manage/'
import { routerRedux } from 'dva/router'
import { message } from 'antd'

export default {

  namespace: 'adddevice',

  state: {
    regionList: [],
    mapAddressVisible: false, // 地图弹窗
    deviceTypeList:[],
    deviceNameList:[],
    // detailAddress:
  },

  effects: {
    // 添加设备
    *add({ payload }, { call, put }) {
      const resData = yield call(addDevice, payload)
      if(resData.success) {
        yield put(routerRedux.push('/devicemanage'))
      } else {
        message.error(resData.message)
      }
    },

    // 获取区域
    *getRegion({ payload }, { call, put }) {
      const resData = yield call(getRegionList, payload)
      const relist = []

      if(resData.success) {
        for(let v of resData.data) {
          relist.push({
            name:v.name,
            id:v.id
          })
        }

        yield  put({
          type:'updataRegin',
          payload:{
            regionList:relist,
          }
        })

      } else {
        message.error(resData.msg)
      }
    },

    //获取设备类型
    *queryDeviceType({ payload }, { call, put }) {
      const resData = yield call(queryDeviceType, payload)
      const types = []
      if(resData.success) {
        for (let i = 0;i<resData.data.length;i++) {
          types.push({
            id:i,
            name:resData.data[i].name,
            value:resData.data[i].value,
          })
        }
        yield put({
          type:'updateState',
          payload:{
            deviceTypeList:types,
          }
        })
      } else {
        message.error(resData.message)
      }
    },

    //获取设备名称
    *queryDeviceName({ payload }, { call, put }) {
      const resData = yield call(queryDeviceType, payload)
      const types = []
      if(resData.success) {
        for (let i = 0;i<resData.data.length;i++) {
          types.push({
            id:i,
            name:resData.data[i].name,
            value:resData.data[i].value,
          })
        }
        yield put({
          type:'updateState',
          payload:{
            deviceNameList:types,
          }
        })
      } else {
        message.error(resData.message)
      }
    },

  },

  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload
      }
    },

    updataRegin(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      return history.listen(({pathname,query}) => {
        if(pathname === '/adddevice') {
          dispatch({
            type:'getRegion',
            payload:{
              parentId:'500100',
              roleLev:'-1'
            }});

          dispatch({
            type:'queryDeviceType',
            payload:{
              page:'1',
              rows:'100',
              paramType:'sys-device-type'
            }});

          dispatch({
            type:'queryDeviceName',
            payload:{
              page:'1',
              rows:'100',
              paramType:'sys-device-name'
            }});

        }
      });
    },
  },

};
