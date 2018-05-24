export default {

  namespace: 'report',

  state: {},

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
  },

  reducers: {
    updateState(state, { payload }) {
      return { 
        ...state,
        ...payload 
      };
    },
  },

};
