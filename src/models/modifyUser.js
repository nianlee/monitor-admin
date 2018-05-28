import { queryUserList,deleteUserInfo } from "../services/manage";

export default {

  namespace: 'modifyUser',

  state: {

    // 用户列表的info
    userListInfo:[],
    // 某一个用户的info
    userInfo:[],
    modalVisible:false,


  },

  effects: {
    *queryUserList({ payload }, { call, put, select }) {
      const resData = yield call(queryUserList,payload)

      if(resData.success) {
        console.log(resData.data.rows);
        yield put({
          type:'updateState',
          payload:{
            userListInfo:resData.data.rows,
          }
        })
      } else {
        throw resData.msg
      }
    },

    *deleteUserInfo({ payload },{ call, put, select }) {
      const resDate = yield call(deleteUserInfo,payload)
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
