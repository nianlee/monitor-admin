import { queryUserList,deleteUserInfo } from "../services/manage";
import { routerRedux } from 'dva/router'

export default {

  namespace: 'users',

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
        console.log('userList',resData.data.rows);
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

    *modifyUserInfo({ payload },{ call, put, select }) {
      yield put(routerRedux.push('/modifyUser'))
    }
  },

  reducers: {
    updateState (state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },

    updateDeleteState(state,{payload}) {
      state.userListInfo = state.userListInfo.filter(u => u.id != payload.id)
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

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      return history.listen(({pathname,query}) => {
        if(pathname === '/usermanage') {
          dispatch({
            type:'queryUserList',
            payload:{
              searchCom:'test',
              page:'1',
              row:'2'
            }})
        }
      });
    },
  },

};
