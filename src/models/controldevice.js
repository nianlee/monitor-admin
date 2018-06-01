import { controlDevice } from "../services/manage";
import { message } from "antd"

export default {

  namespace: 'controldevice',

  state: {
  },

  effects: {
    *control({ payload }, { call, put }) {  // eslint-disable-line
      const  resData = yield call(controlDevice,payload)
      if(resData.success) {
        yield put({
          type:'updateState',
          payload:{
          }
        })
      } else {
        throw message.error(resData.msg)
      }
    },

    *query({ payload }, { call, put }) {
      yield console.log(payload)
    }
  }
  ,

  reducers: {

    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      return history.listen((location) => {
        console.log('sn:',location)

        dispatch({
          type:'query',
          payload:location.state,
        })

        /*
        if(location.pathname === '/controldevice') {

        }*/
      });
    },
  },

};
