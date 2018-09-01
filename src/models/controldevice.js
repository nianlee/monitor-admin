import { controlDevice,batchControlDevice } from "../services/manage";
import pathToRegexp from 'path-to-regexp'

export default {

  namespace: 'controldevice',

  state: {
    sn:null,
    deviceSnArr:null,
    type:'',
    modalVisible:false,
    messages:{},
  },

  effects: {
    *control({ payload }, { call, put }) {  // eslint-disable-line
      const  resData = yield call(controlDevice,payload);
      console.log('resData',resData)
      yield put({
        type:'updateState',
        payload:{
          messages:resData.message,
        }
      })
    },

    *batchControlDevice({ payload }, { call, put }) {
      const resData = yield call(batchControlDevice,payload);
      yield put({
        type:'updateState',
        payload:{
          messages:resData.message,
        }
      })
    },

    *query({ payload }, { call, put }) {
      yield console.log(payload)
    }
  },

  reducers: {

    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
        modalVisible:true
      }
    },

    update(state, { payload }) {
      return {
        ...state,
        ...payload,
        sn:payload,
        deviceSnArr:payload,
        modalVisible:false
      }
    },

    hideModal(state,{ payload }) {
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

        const match = pathToRegexp('/controldevice/:s/:sn').exec(pathname);
        if(match && match[1]) {
          if (match[1] === "one") { // 控制单个设备
            dispatch({ type: 'update', payload: { sn: match[2],type:'one' } })
          } else { // 批量控制设备
            dispatch({ type: 'update', payload: { deviceSnArr: match[2],type:'batch' } })
          }
        }
      });
    },
  },

};
