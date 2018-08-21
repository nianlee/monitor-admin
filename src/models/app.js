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
    menu: [], // 菜单
    user: {
      id: "",
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
      dispatch({ type: "query" });
    }
  },

  effects: {
    *getMenu({ payload }, { call, put, select }) {
      const resData = yield call(getMenu);
      console.log('meun',resData);
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
        try {
          const appInitDatas = JSON.parse(localStorage.getItem("mMenu"));
          // 用户已登录
          yield put({ type: "updateState", payload: appInitDatas });

          if (locationPathname === "/login") {
            yield put(routerRedux.push("/dashboard"));
          }
        } catch (error) {
          console.log(error);
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
