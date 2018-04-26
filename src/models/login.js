import { loginLoad } from 'services/login'

export default {
  namespace: 'login',

  state: {},

  subscriptions: {
    setup({ dispatch, history }) {
    },
  },

  effects: {
    *loginLoad({ payload }, { call, put }) { 
      const resData = yield call(loginLoad, payload)
      console.log(resData)
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
