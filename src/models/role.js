import { loginLoad } from 'services/login'

export default {
  namespace: 'role',

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
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
