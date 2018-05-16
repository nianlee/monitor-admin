import qs from 'qs'
import { routerRedux } from 'dva/router'
import config from 'config'
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
    menu: [
      {
        id: '1',
        icon: 'dashboard',
        name: '首页',
        route: '/dashboard',
      },
      {
        id: '2',
        name: '统计报表',
        icon: 'user',
        route: '/report',
        // children: [
        //   {
        //     id: '21',
        //     bpid: '2',
        //     name: '报表子菜单1',
        //     icon: 'shopping-cart',
        //     route: '/report/1',
        //   },
        //   {
        //     id: '22',
        //     bpid: '2',
        //     name: '报表子菜单2',
        //     route: '/report/2',
        //   },
        // ]
      },
      /*
      {
        id: '3',
        name: '实时监控',
        icon: 'api',
        route: '/monitor',
      },*/
      {
        id: '4',
        name: 'GIS信息',
        icon: 'camera-o',
        route: '/gis',
      },
      {
        id: '5',
        name: '管理策略',
        icon: 'heart-o',
        children: [
          {
            id: '51',
            bpid: '5',
            name: '用户管理',
            icon: 'search',
            route: '/usermanage',
          },
          {
            id: '52',
            bpid: '5',
            name: '设备管理',
            icon: 'search',
            route: '/devicemanage',
          },
          {
            id: '53',
            bpid: '5',
            name: '角色管理',
            icon: 'search',
            route: '/manage/role',
          },
          {
            id: '54',
            bpid: '5',
            name: '区域管理',
            icon: 'search',
            route: '/region',
          }
        ]
      },
      {
        id: '6',
        name: '系统设置',
        icon: 'bars',
        route: '/admin',
      },
    ], // 菜单
    user: {
      name: 'deadpool'
    }, // 用户信息
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

    setup({ dispatch, history }) {
      // dispatch({
      //   type: 'getMenu',
      // })
      if (config.loginLimit) {
        dispatch({ type: 'query' })
      }
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
      const { locationPathname } = select(_=>_.app)
      const resData = yield call(query)
      if (resData.success) {
        // 用户已登录
        if (locationPathname === '/login') {
          yield put(routerRedux.push('/dashboard'))
        }
      } else if (config.openPages.indexOf(locationPathname) < 0) {
        yield put(routerRedux.push({
          pathname: '/login',
          search: qs.stringify({ from: locationPathname }),
        }))
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
