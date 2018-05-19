import { 
  queryRoleList,
  queryRoleInfoById,
  queryRoleMenuList,
} from 'services/role'
import pathToRegexp from 'path-to-regexp'
import { message } from 'antd'

export default {
  namespace: 'addOrUpdateRole',

  state: {
    type: null, // 修改or新增
    roleInfo: null, // 角色信息
    allMenus: null, // 菜单信息
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // dispatch({ type: 'queryRoleList' })
      history.listen(({ pathname }) => {
        const match = pathToRegexp('/manage/role/:type').exec(pathname)
        const updateMatch =  pathToRegexp('/manage/role/:type/:id').exec(pathname)

        let type

        if (match && match[1] == '1') {
          type = 'add'
        }

        if (updateMatch && updateMatch[1] == '2' && updateMatch[2]) {
          type = 'edit'
          dispatch({ type: 'queryRoleInfoById', payload: { Id: updateMatch[2] }})
        }

        dispatch({ type: 'updateState', payload: { type }})
      })
    },
  },

  effects: {
    // 查询权限列表
    *queryRoleList({ payload }, { call, put, select }) { 
      const { pagination } = yield select(_ => _.role)
      const { data } = yield call(queryRoleList, {
        ...payload,
        rows: pagination.pageSize,
        page: pagination.current,
      })
      const roleList = data.rows.map(item => ({ ...item, key: item.id }))
      yield put({ type: 'updateState', payload: { roleList }})
    },

    // 查询权限详情
    *queryRoleInfoById ({ payload }, { call, put, select }) { 
      const resData = yield call(queryRoleInfoById, payload)
      console.log(resData)
      if (resData.success) {
        yield put({ type: 'updateState', payload: { roleInfo: resData.data }})
      } else {
        message.error(resData.message)
      }
    },

    // 角色菜单查询
    *queryRoleMenuList ({ payload }, { call, put, select }) { 
      const resData = yield call(queryRoleMenuList, payload)
      if (resData.success) {
        yield put({ type: 'updateState', payload: { allMenus: resData.data.data }})
      } else {
        message.error(resData.message)
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
}
