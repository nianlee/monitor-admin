import { 
  queryRoleList,
  queryRoleInfoById,
  queryRoleMenuList,
  addRole,
  editRoleById,
} from 'services/role'
import pathToRegexp from 'path-to-regexp'
import { message } from 'antd'
import { routerRedux } from 'dva/router'

export default {
  namespace: 'addOrUpdateRole',

  state: {
    type: null, // 修改or新增
    roleInfo: null, // 角色信息

    roleSelectData: [{
      id: '1',
      name: '权限1',
    }, {
      id: '2',
      name: '权限2',
    }], // 权限下拉数据

    allMenus: [
      {
        "id": 1,
        "key": 1,
        "parentId": 0,
        "menuName": "监控设备管理1",
        "menuOrder": 0,
        "permission": "",
        "childrenList": [{
          "id": 11,
          "key": 11,
          "parentId": 1,
          "menuName": "监控设备管理11",
          "menuOrder": 0,
          "permission": "",
        }, {
          "id": 12,
          "key": 12,
          "parentId": 1,
          "menuName": "监控设备管理12",
          "menuOrder": 0,
          "permission": "",
        }]
      },
      {
        "id": 2,
        "key": 2,
        "parentId": 0,
        "menuName": "监控设备管理2",
        "menuOrder": 0,
        "permission": "",
        "childrenList": [{
          "id": 21,
          "key": 21,
          "parentId": 0,
          "menuName": "监控设备管理21",
          "menuOrder": 0,
          "permission": "",
        }, {
          "id": 22,
          "key": 22,
          "parentId": 0,
          "menuName": "监控设备管理22",
          "menuOrder": 0,
          "permission": "",
        }]
      }
    ], // 菜单信息
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
    },

    // 角色添加
    *addRole({ payload }, { call, put, select }) {
      const resData = yield call(addRole, payload)

      if (resData.success) {
        message.success('添加成功')
        yield put(routerRedux.push('/manage/role'))
      } else {
        message.error(resData.message)
      }
    },

    // 角色信息更新
    *editRoleById({ payload }, { call, put, select }) {
      const resData = yield call( editRoleById, payload )

      if (resData.success) {
        message.success('更新成功')
        yield put(routerRedux.push('/manage/role'))
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
