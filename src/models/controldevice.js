import { controlDevice } from "../services/manage";

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
        modalVisible:true,
      }
    },

    update(state, { payload }) {
      return {
        ...state,
        ...payload,
        sn:payload,
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
        if(pathname === '/controldevice') {
          console.log('query',query)
          dispatch({
            type:'update',
            payload:query.sn,
          })
        }
      });
    },
  },

};
