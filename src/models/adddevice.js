import { getRegionList,addDevice } from 'services/manage/'
import { routerRedux } from 'dva/router'
import { message } from 'antd'

export default {

  namespace: 'adddevice',

  state: {
    regionList:[],
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
        for(var v of resData.data) {

          console.log(v)
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

    updataRegin(state, { payload }) {
      console.log(payload)
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
              name:'重庆',
              roleLev:'-1'
            }})
        }
      });
    },
  },

};
