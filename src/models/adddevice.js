import { getRegionList, addDevice } from 'services/manage/'
import { routerRedux } from 'dva/router'
import { message } from 'antd'

export default {

  namespace: 'adddevice',

  state: {
    regionList:[],

    mapAddressVisible: false, // 地图弹窗
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
      const resData = yield call(getRegionList,payload)
      const relist = []

      if(resData.success) {
        console.log('region',resData);
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
            }})
        }
      });
    },
  },

};
