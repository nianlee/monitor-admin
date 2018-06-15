import { getRegionList,addUser } from "../services/manage";
import { message } from 'antd'
import { queryUserInfo } from 'services/user'
import { queryRoleList } from 'services/role'
import pathToRegexp from 'path-to-regexp'

export default {

  namespace: 'addOrUpdateUser',

  state: {
    regionList:[],
    roleList: [], // 权限列表
    type: 'add', // 修改or新增

    userInfo: {}, // 用户信息
  },

  subscriptions: {
    setup({ dispatch, history }) { 
      history.listen(({ pathname }) => {
        const addMatch = pathToRegexp('/addorupdateuser').exec(pathname)
        const match = pathToRegexp('/addorupdateuser/:id').exec(pathname)
        if (addMatch || match) {
          dispatch({
            type:'getRegion',
            payload: {
              parentId: '500100',
              roleLev: -1
          }}),

          dispatch({ type: 'queryRoleList' })
        }

        if (addMatch) {
          dispatch({ type: 'updateState', payload: { type: 'add', userInfo: {} }})
        }

        if (match && match[1]) {
          const id = match[1]
          dispatch({ type: 'updateState', payload: { type: 'edit' }})
          dispatch({ type: 'queryUserInfo', payload: { id }})
        }
      })
    },
  },

  effects: {
    // 添加用户
    *add({ payload }, { call, put }) {
      const resData = yield call(addUser,payload);
      if(resData.success) {
        message.success('添加成功')
      } else {
        message.error(resData.message)
      }
    },

    // 获取用户信息
    *queryUserInfo({ payload }, { call, put }) {
      const resData = yield call(queryUserInfo, payload);
      if(resData.success) {
        yield put({ type: 'updateState', payload: { userInfo: resData.data }})
      } else {
        message.error(resData.message)
      }
    },

    // 获取权限列表
    *queryRoleList({ payload }, { call, put, select }) {
      const { data } = yield call(queryRoleList, {
        rows: 100,
        page: 1,
      })
      const roleList = data.rows.map(item => ({ ...item, key: item.id }))
      yield put({ type: 'updateState', payload: { roleList }})
    },

    // 获取区域
    *getRegion({ payload }, { call, put }) {
      const resData = yield call(getRegionList, payload);
      const relist = []

      if(resData.success) {
        for(let v of resData.data) {
          relist.push({
            name:v.name,
            id:v.id
          })
        }

        yield  put({
          type:'updateState',
          payload:{
            regionList:relist,
          }
        })

      } else {
        message.error(resData.msg)
      }
    },
  },

  reducers: {
    updateState (state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
};
