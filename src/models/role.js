import modelExtend from 'dva-model-extend'
import { queryRoleList,deleteRole } from 'services/role'
import { pageModel } from './common';
import { message } from "antd";


export default modelExtend(pageModel, {
  namespace: 'role',

  state: {
    roleList: [], // 权限列表
    type: null, // 修改or新增

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
    setup({ dispatch, history }) {

      return history.listen(({pathname, query}) => {
        if (pathname === '/manage/role') {
          dispatch({ type: 'queryRoleList',payload: {
            page: 1,
            rows: 10
          }})
        }
      })
    },
  },

  effects: {
    *queryRoleList({ payload }, { call, put, select }) {
      //const { pagination } = yield select(_ => _.role)
      const resData = yield call(queryRoleList, {
        ...payload,
        //rows: pagination.pageSize,
        //page: pagination.current,
      })

      const roleList = resData.data.rows.map(item => ({ ...item, key: item.id }))
      yield put({ type: 'updateState', payload: { roleList }})
      yield put({ type: 'updatePagination', payload: {
        total: resData.data.total,
        pageIndex: resData.data.curPage,
        pageSize: resData.data.pageSize,
      }})
    },

    *deleteRole({ payload }, { call, put, select }) {
      const resData = yield call(deleteRole,{ ...payload });

      console.log('delete',resData);
      if(resData.success){
        message.info(resData.message);
        yield put({ type: 'queryRoleList',payload: {
          page: 1,
          rows: 10
        }})
      } else {
        message.error(resData.message);
        yield put({ type: 'queryRoleList',payload: {
          page: 1,
          rows: 10
        }})
      }
    }
  },

  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload
      };
    },
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
})
