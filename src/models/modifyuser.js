import { modifyUserInfo } from "../services/manage";

export default {

  namespace: 'modifyuser',

  state: {
    modifyMsg:'',


  },

  effects: {
    *modify({ payload }, { call, put, select }) {
      const resData = yield call(modifyUserInfo,payload)

      if(resData.success) {
        console.log(resData.msg);
        yield put({
          type:'updateState',
          payload:{
            modifyMsg:resData.msg,
          }
        })
      } else {
        throw resData.msg
      }
    },

    *deleteUserInfo({ payload },{ call, put, select }) {
      const resDate = yield call(modifyUserInfo,payload)
      if(resDate.success) {
        console.log(resDate);
        yield put({
          type:'updateDeleteState',
          payload:{
            id:payload
          },
        })
      } else {
        throw resDate.msg
      }
    },
  },

  reducers: {
    updateState (state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

};
