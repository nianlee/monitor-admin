import { getRegionList,addDevice } from 'services/manage/'
import { routerRedux } from 'dva/router'
import { message } from 'antd'
// import { regeo } from 'services/device'

export default {

  namespace: 'adddevice',

  state: {
    regionList:[],

    mapAddressVisible: false, // 地图弹窗
    // detailAddress:
  },

  effects: {
    *add({ payload }, { call, put }) {  // eslint-disable-line
      const resData = yield call(addDevice,payload)
      if(resData.success) {
        yield put(routerRedux.push('/devicemanage'))
      } else {
        yield put(routerRedux.push('/dashboard'))
        message.error(resData.msg)
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

    // // 逆地理编码
    // *regeo({ payload }, { call, put }) {
    //   const resData = yield call(regeo, payload)
    //   console.log(resData)
    // }
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
