import { controlDevice } from "../services/manage";
import pathToRegexp from 'path-to-regexp'

export default {

  namespace: 'controldevice',

  state: {
    sn:null,
    modalVisible:false,
    messages:{},
  },

  effects: {
    *control({ payload }, { call, put }) {  // eslint-disable-line
      const  resData = yield call(controlDevice,payload)
      console.log('resData',resData)
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

        const match = pathToRegexp('/controldevice/:sn').exec(pathname)
        console.log('match',match)
        if (match) {
          dispatch({ type: 'update', payload: { sn: match[1] } })
        }
      });
    },
  },

};
