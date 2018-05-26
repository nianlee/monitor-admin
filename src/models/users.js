import { queryDeviceList } from "../services/manage";

export default {

  namespace: 'users',

  state: {

    // 用户列表的info
    userListInfo:[],
    // 某一个用户的info
    userInfo:[],
    modalVisible:false,


  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *queryUserList({ payload }, { call, put, select }) {
      const resData = yield call(queryDeviceList,payload)

      const devicesListInfo = []

      for (var v of resData.data) {
        //console.log(v.datDevice);
        devicesListInfo.push({
          name: v.datDevice.name,
          sn: v.datDevice.sn,
          detailAddr: v.datDevice.detailAddr,
          manufacturer: v.datDevice.manufacturer,
          type: v.datDevice.type,
          state: v.datDevice.state,
        })
      }

      yield put({
        type:'updateState',
        payload:{
          devicesListInfo:devicesListInfo,
        }
      })
    },

  },

  reducers: {
    updateState (state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },

    showAddModal(state,{ payload }) {
      return {
        ...state,
        ...payload,
        modalVisible:true
      }
    },

    hideAddModal(state,{ payload }) {
      return {
        ...state,
        ...payload,
        modalVisible:false
      }
    },
  },

};
