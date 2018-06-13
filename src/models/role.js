import modelExtend from 'dva-model-extend'
import { queryRoleList } from 'services/role'
import { pageModel } from './common';


export default modelExtend(pageModel, {
  namespace: 'role',

  state: {
    roleList: [], // 权限列表
    type: null, // 修改or新增
  },

  subscriptions: {
    setup({ dispatch, history }) {
      dispatch({ type: 'queryRoleList' })
    },
  },

  effects: {
    *queryRoleList({ payload }, { call, put, select }) {
      const { pagination } = yield select(_ => _.role)
      const { data } = yield call(queryRoleList, {
        ...payload,
        rows: pagination.pageSize,
        page: pagination.current,
      })

      console.log('role',data)
      const roleList = data.rows.map(item => ({ ...item, key: item.id }))
      yield put({ type: 'updateState', payload: { roleList }})
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
})
