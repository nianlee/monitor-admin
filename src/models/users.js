import { 
  queryUserList,
  deleteUserInfos, 
} from "../services/manage";

import { message } from 'antd';

export default {

  namespace: 'users',

  state: {
    // 用户列表的info
    userList: [],

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
    *queryUserList({payload}, {call, put}) {
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

    // 删除用户
    *deleteUserInfo({ payload }, { call, put, select }) {
      const resData = yield call(deleteUserInfos, payload)
      const { pagination } = yield select(_=>_.users)
      if (resData.success) {
        message.success('删除成功')
        yield put({ type: 'queryUserList', payload: {
          page: pagination.current,
          rows: pagination.pageSize,
        }})
      } else {
        message.error(resData.message)
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
