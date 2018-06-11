import { queryUserList,deleteUserInfos, queryUserInfo} from "../services/manage";
import { routerRedux } from 'dva/router'

export default {

  namespace: 'users',

  state: {

    // 用户列表的info
    userListInfo: [],
    // 某一个用户的info
    userInfo: {},
    modalVisible: false,
    total:'200',
    currentPage:'',
    pageSize:''
  },

  subscriptions: {
    setup({dispatch, history}) {  // eslint-disable-line
      return history.listen(({pathname, query}) => {
        if (pathname === '/usermanage') {
          console.log('pathname', pathname);
          dispatch({
            type: 'queryUserList',
            payload: {
              searchCom: '',
              page: '1',
              row: '200'
            }
          })
        }
      });
    },
  },

  effects: {
    *queryUserList({payload}, {call, put, select}) {
      const resData = yield call(queryUserList, payload)

      if (resData.success) {
        console.log('userList', resData.data.rows);
        yield put({
          type: 'updateState',
          payload: {
            userListInfo: resData.data.rows,
            total:payload.row,
            currentPage:payload.page,
            pageSize:'10'
          }
        })
      } else {
        throw resData.msg
      }
    },

    *deleteUserInfo({payload}, {call, put, select}) {

      const resDate = yield call(deleteUserInfos, payload)

      if (resDate.success) {
        yield put({
          type: 'updateDeleteState',
          payload: payload
        })
      } else {
        throw resDate.msg
      }
    },

    *modifyUserInfo({payload}, {call, put, select}) {
      yield put(routerRedux.push('/modifyUser'))
    },

    *queryUserInfo({payload}, {call, put, select}) {
      const resDate = yield call(queryUserInfo,payload)

      if(resDate.success) {
        yield put({
          type:'updateStateUserInfo',
          payload:{
            userInfo:resDate.data
          },
        })
      } else {
        throw resDate.message
      }
    },
    },

    reducers: {
      updateState(state, {payload}) {
        return {
          ...state,
          ...payload,
        }
      },

      updateStateUserInfo(state, {payload}) {
        return {
          ...state,
          ...payload,
          modalVisible: true,
        }
      },

      updateDeleteState(state, {payload}) {
        state.userListInfo = state.userListInfo.filter(u => u.id != payload.id);
        return {
          ...state,
          ...payload,
        }
      },

      showAddModal(state, {payload}) {
        return {
          ...state,
          ...payload,
          modalVisible: true
        }
      },

      hideAddModal(state, {payload}) {
        return {
          ...state,
          ...payload,
          modalVisible: false
        }
      },
    },
};
