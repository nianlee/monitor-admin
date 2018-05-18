import modelExtend from 'dva-model-extend'
import { queryRoleList } from 'services/role'
import { pageModel } from './common';


export default modelExtend(pageModel, {
  namespace: 'role',

  state: {
    roleList: [], // 权限列表
    type: null, // 修改or新增
    modalVisible: false, // 弹框是否显示
  },

  subscriptions: {
    setup({ dispatch, history }) {
      dispatch({ type: 'queryRoleList' })
    },
  },

  effects: {
    *queryRoleList({ payload }, { call, put, select }) { 
      const { pagination } = yield select(_ => _.role)
      const resData = yield call(queryRoleList, {
        ...payload,
        rows: pagination.pageSize,
        page: pagination.current,
      })
      console.log(resData)
      const roleList = resData.data.pageInfo.rows.map(item => ({ ...item, key: item.id }))
      yield put({ type: 'updateState', payload: { roleList }})
    },
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
