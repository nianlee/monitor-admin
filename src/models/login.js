import { loginLoad } from 'services/login'
import api from 'utils/api'
import { routerRedux } from 'dva/router'
import { message } from 'antd'

export default {
  namespace: 'login',

  state: {
    randomKey: 1,
    getVerifyCode: api.getVerifyCode, 
  },

  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
    *loginLoad({ payload }, { call, put, select }) { 
      const resData = yield call(loginLoad, payload)
      if (resData.success) {
        yield put({ type: 'app/updateState', payload: { user: resData.data }})
        yield put(routerRedux.push('/dashboard'))
      } else {
        message.error(resData.message)
      }
    },
  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
