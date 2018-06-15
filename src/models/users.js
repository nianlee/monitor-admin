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
              rows: 10
            }
          })
        }
      });
    },
  },

  effects: {
    // 查询用户列表
    *queryUserList({payload}, {call, put, select}) {
      const resData = yield call(queryUserList, payload)

      if (resData.success) {
        const userList = resData.data.rows.map((item, index) => {
          item.index = index + 1;
          item.key = item.id;
          return item;
        });

        yield put({ type: 'updateState', payload: { userList }});
        yield put({ type: 'updatePagination', payload: {
          total: resData.data.total,
          pageIndex: resData.data.curPage,
          pageSize: resData.data.pageSize,
        }})
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

      updatePagination(state, { payload }) {
        return {
          ...state,
          pagination: {
            ...state.pagination,
            ...payload,
          }
        }
      },
    },
};
