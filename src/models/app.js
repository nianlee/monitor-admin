import qs from "qs";
import { routerRedux } from "dva/router";
import config from "config";
import { message } from "antd";
import Cookies from "js-cookie";
import { getMenu, loginout, queryUserInfo, modifyUserInfo } from "services/app";

export default {
  namespace: "app",
  state: {
    locationPathname: "",
    locationQuery: {},
    menu: [
      {
        id: "1",
        icon: "dashboard",
        name: "首页",
        route: "/dashboard"
      },
      {
        id: '2',
        name: '统计报表',
        icon: 'user',
        route: '/report',
      },

      {
        id: "4",
        name: "GIS信息",
        icon: "camera-o",
        route: "/gis"
      },
      {
        id: "5",
        name: "管理策略",
        icon: "heart-o",
        children: [
          {
            id: "51",
            bpid: "5",
            name: "设备管理",
            icon: "search",
            route: "/devicemanage"
          },
          {
            id: "52",
            name: "固件管理",
            icon: "bars",
            route: "/firmware"
          },
          {
            id: "53",
            name: "区域管理",
            icon: "bars",
            route: "/region"
          }

        ]
      },

      {
        id: "6",
        name: "系统管理",
        icon: "heart-o",
        children: [
          {
            id: "53",
            bpid: "6",
            name: "用户管理",
            icon: "search",
            route: "/usermanage"
          },
          {
            id: "54",
            bpid: "6",
            name: "角色管理",
            icon: "search",
            route: "/manage/role"
          },
          {
            id: "55",
            bpid: "6",
            name: "登录信息",
            icon: "search",
            route: "/loginlog"
          }
        ]
      }
    ], // 菜单
    user: {
      userName: ""
    }, // 用户信息
    userInfoModalVisibal: false
  },
  subscriptions: {
    setupHistory({ dispatch, history }) {
      history.listen(location => {
        location.search = location.search || "";
        const ls = location.search.replace("?", "");
        dispatch({
          type: "updateState",
          payload: {
            locationPathname: location.pathname,
            locationQuery: qs.parse(ls)
          }
        });
      });
    },

    setup({ dispatch }) {
      if (config.loginLimit) {
        dispatch({ type: "query" });
      }
    }
  },

  effects: {
    *getMenu({ payload }, { call, put, select }) {
      const resData = yield call(getMenu);
      yield put({
        type: "updateState",
        payload: {
          menu: resData.data
        }
      });
    },

    *query({ payload }, { call, put, select }) {
      const { locationPathname } = select(_ => _.app);
      const userId = Cookies.get("userId");
      if (!userId) {
        return yield put(
          routerRedux.push({
            pathname: "/login",
            search: qs.stringify({ from: locationPathname })
          })
        );
      }
      const resData = yield call(queryUserInfo, { id: userId });

      if (resData.success) {
        // 用户已登录
        yield put({ type: "updateState", payload: { user: resData.data } });
        if (locationPathname === "/login") {
          yield put(routerRedux.push("/dashboard"));
        }
      } else if (config.openPages.indexOf(locationPathname) < 0) {
        yield put(
          routerRedux.push({
            pathname: "/login",
            search: qs.stringify({ from: locationPathname })
          })
        );
      }
    },

    // 查询用户信息
    *queryUserInfo(payload, { call, put, select }) {
      const { user } = yield select(_ => _.app);
      const resData = yield call(queryUserInfo, { id: user.id });
      if (resData.success) {
        yield put({ type: "updateState", payload: { user: resData.data } });
      } else {
        message.error(resData.message);
      }
    },

    // 修改用户信息
    *modifyUserInfo({ payload }, { call, select }) {
      const { user } = yield select(_ => _.app);
      const resData = yield call(modifyUserInfo, {
        ...payload,
        ...user
      });

      if (resData.success) {
        message.success("修改成功");
      } else {
        message.error(resData.message);
      }
    },

    *loginout({ payload }, { call, put }) {
      yield call(loginout);
      Cookies.remove("userId");
      yield put(
        routerRedux.push({
          pathname: "/login"
        })
      );
    }
  },

  reducers: {
    updateState: function(state, { payload }) {
      return {
        ...state,
        ...payload
      };
    }
  }
};
