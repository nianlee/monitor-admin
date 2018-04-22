export default {

  namespace: 'manage',

  state: {
   
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *queryDeviceSelective({ payload }, { call, put, select }) {
    }
  },

  reducers: {
    updateState (state, { payload }) {
      return {
        ...state,
        payload,
      }
    }
  },

};
