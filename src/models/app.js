import qs from 'qs'
import { routerRedux } from 'dva/router'
// import { openPages } from 'config'
// import { message } from 'antd'
import { 
  getMenu,
  query,
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
        type: 'getMenu',
      })
      
      dispatch({
        type: 'query',
      })
    }
  },

  effects: {
    *getMenu ({ payload }, { call, put, select }) {
      const resData = yield call(getMenu)
      yield put({
        type: 'updateState',
        payload: {
          menu: resData.data,
        }
      })
    },

    *query ({ payload }, { call, put, select }) {
      const resData = yield call(query)
      if (resData.success) {
        // 用户已登录
      } else {
        yield put(routerRedux.push('/login'))
      }
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