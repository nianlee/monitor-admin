import { loginLoad } from "services/login";
import api from "utils/api";
import { message } from "antd";
import Cookies from "js-cookie";
import { routerRedux } from "dva/router";

// 格式化menu
const formatMenu = permMenus => {
  return permMenus
    .filter(item => item.menuType == "2")
    .map(item => {
      return {
        id: item.id,
        bpid: item.parentId,
        name: item.menuName,
        route: item.menuUrl
      };
    })
    .sort((a, b) => a.id - b.id);
};

export default {
  namespace: "loginnocode",

  state: {
    randomKey: 1,
    getVerifyCode: api.getVerifyCode
  },

  effects: {
    *loginLoad({ payload }, { call, put, select }) {
      const resData = yield call(loginLoad, payload);
      if (resData.success) {
        Cookies.set("userId", resData.data.id);

        const appInitDatas = {
          user: {
            id: resData.data.id,
            userName: resData.data.userName
          },
          menu: formatMenu(resData.data.permMenus)
        };

        yield put({
          type: "app/updateState",
          payload: appInitDatas
        });

        try {
          localStorage.setItem("mMenu", JSON.stringify(appInitDatas));
        } catch (error) {
          console.log(error);
        }

        yield put(routerRedux.push("/dashboard"));
      } else {
        message.error(resData.message);
      }
    },
  },

  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload };
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {

      history.listen(({ pathname }) => {
        console.log('loginnocode');
        if (pathname == "/loginnocode") {
          dispatch({
            type: "login/loginLoad",
            payload: { userName:'superadmin',userPw:'111111',very_code:'',remember:'1',very_code_flag:'false'}
          });

        }
      });
    }
  },
};
