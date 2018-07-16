import { getRegionList,modifyDevice,queryDeviceType } from 'services/manage/'
import { routerRedux } from 'dva/router'
import { message } from 'antd'
import pathToRegexp from 'path-to-regexp'

export default {

  namespace: 'modifydevice',

  state: {
    regionList: [],
    mapAddressVisible: false, // 地图弹窗
    deviceTypeList: [],
    deviceNameList: [],
    id:'',
    // detailAddress:
  },

  effects: {

    // 修改设备
    * modify({payload}, {call, put}) {
      const resData = yield call(modifyDevice, payload)
      console.log('josn', payload)
      console.log('modify', resData)
      if (resData.success) {
        yield put(routerRedux.push('/devicemanage'))
      } else {
        message.error(resData.message)
      }
    },

    // 获取区域
    * getRegion({payload}, {call, put}) {
      const resData = yield call(getRegionList, payload)
      const relist = []

      if (resData.success) {
        for (let v of resData.data) {
          relist.push({
            name: v.name,
            id: v.id
          })
        }

        yield  put({
          type: 'updataRegin',
          payload: {
            regionList: relist,
          }
        })

      } else {
        message.error(resData.msg)
      }
    },

    //获取设备类型
    * queryDeviceType({payload}, {call, put}) {
      const resData = yield call(queryDeviceType, payload)
      const types = []
      if (resData.success) {
        for (let i = 0; i < resData.data.length; i++) {
          types.push({
            id: i,
            name: resData.data[i].name,
            value: resData.data[i].value,
          })
        }
        yield put({
          type: 'updateState',
          payload: {
            deviceTypeList: types,
            id:payload.id,
          }
        })
      } else {
        message.error(resData.message)
      }
    },

    //获取设备名称
    * queryDeviceName({payload}, {call, put}) {
      const resData = yield call(queryDeviceType, payload)
      const types = []
      if (resData.success) {
        for (let i = 0; i < resData.data.length; i++) {
          types.push({
            id: i,
            name: resData.data[i].name,
            value: resData.data[i].value,
          })
        }
        yield put({
          type: 'updateState',
          payload: {
            deviceNameList: types,
          }
        })
      } else {
        message.error(resData.message)
      }
    },

  },

  reducers: {
    updateState(state, {payload}) {
      return {
        ...state,
        ...payload
      }
    },

    updataRegin(state, {payload}) {
      return {
        ...state,
        ...payload,
      }
    },
  },

  subscriptions: {
    setup({dispatch, history}) {  // eslint-disable-line
      return history.listen(({pathname, query}) => {
        const match = pathToRegexp('/modifydevice/:id').exec(pathname)
        if (match) {
          /*
          dispatch({
            type:'getRegion',
            payload:{
              parentId:'500100',
              roleLev:'-1'
            }});

            dispatch({
            type:'queryDeviceName',
            payload:{
              page:'1',
              rows:'100',
              paramType:'sys-device-name'
            }});
            */

          dispatch({
            type:'queryDeviceType',
            payload:{
              id:match[1],
              page:'1',
              rows:'100',
              paramType:'sys-device-type'
            }});
        }
      });
    },
  },
}
