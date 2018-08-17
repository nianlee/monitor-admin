import { loginLoad } from "services/login";
import { queryRoleMenuList } from "services/role";
import api from "utils/api";
import { routerRedux } from "dva/router";
import { message } from "antd";
import Cookies from "js-cookie";

export default {
  namespace: "login",

  state: {
    randomKey: 1,
    getVerifyCode: api.getVerifyCode
  },

  subscriptions: {
    setup({ dispatch, history }) {}
  },

  effects: {
    *loginLoad({ payload }, { call, put, select }) {
      const resData = yield call(loginLoad, payload);
      if (resData.success) {
        Cookies.set("userId", resData.data.id);
        yield put({ type: "app/updateState", payload: { user: resData.data } });
        const menuList = yield call(queryRoleMenuList, {
          id: resData.data.id,
          type: "detail"
        });
        console.log(menuList);
        yield put(routerRedux.push("/dashboard"));
      } else {
        message.error(resData.message);
      }
    }
  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    }
  }
};
