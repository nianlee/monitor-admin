import { 
  queryUserList,
  deleteUserInfos, 
  queryUserInfo
} from "../services/manage";

import { routerRedux } from 'dva/router';
import { message } from 'antd';

export default {

  namespace: 'users',

  state: {
    // 用户列表的info
    userList: [],
    // 某一个用户的info
    userInfo: {},
    modalVisible: false,
    total:'200',
    currentPage:'',
    pageSize:'',
    pagination: {
      current: 1,
      pageSize: 10,
      total: 0,
      showTotal: total => `共${total}条数据`,
      showQuickJumper: true,
      showSizeChanger: true,
    }
  },

  subscriptions: {
    setup({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        if (pathname === '/usermanage') {
          dispatch({
            type: 'queryUserList',
            payload: {
              page: 1,
              row: 10
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
        yield put({
          type: 'updateState',
          payload: {
            userList: resData.data.rows,
            pagination: {
              current: resData.data.curPage,
              total: resData.data.total,
            }
          }
        })
      } else {
        message.error(resData.message);
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
      updateState(state, { payload }) {
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
        state.userList = state.userList.filter(u => u.id != payload.id);
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
