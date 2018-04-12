/* eslint no-restricted-globals: ["error", "event"] */
import qs from 'qs'
import { routerRedux } from 'dva/router'
// import { openPages } from 'config'
// import { message } from 'antd'
import { 
  getMenu,
} from 'services/app'

export default {
  namespace: 'app',
  state: {
    locationPathname: '',
    locationQuery: {},
    menu: [], // 菜单
    user: {}, // 用户信息
  },
  subscriptions: {
    setupHistory ({ dispatch, history }) {
      history.listen((location) => {
        location.search = location.search || ''
        const ls = location.search.replace('?', '')
        dispatch({
          type: 'updateState',
          payload: {
            locationPathname: location.pathname,
            locationQuery: qs.parse(ls),
          },
        })
      })
    },

    setup({ dispatch }) {
      dispatch({
        type: 'getMenu'
      })
    }
  },

  effects: {
    *getMenu ({ payload }, { call, put, select }) {
      const resData = yield call(getMenu, null)
      yield put({
        type: 'updateState',
        payload: {
          menu: resData.data,
        }
      })
    },

    *loginout ({ payload }, { call, put }) {
      // yield call(loginout)
      // todo 清空登录信息
      yield put(routerRedux.push({
        pathname: '/login',
      }))
    },
  },

  reducers: {
    updateState: function(state, { payload }) {
      return { 
        ...state, 
        ...payload,
      }
    }
  }
}