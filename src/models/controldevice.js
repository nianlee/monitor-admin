export default {

  namespace: 'controldevice',

  state: {
    regionList:[],
  },

  effects: {
    *add({ payload }, { call, put }) {  // eslint-disable-line
    },
  },

  reducers: {

    updataRegin(state, { payload }) {
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
