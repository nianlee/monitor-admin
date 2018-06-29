import { addFirmwares } from "../services/manage";
import { message } from "antd";
import { routerRedux } from "dva/router";

export default {
  namespace: "addFirmware",

  state: {
    firmwareInfo: {} // 添加的固件信息
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {});
    }
  },

  effects: {
    // 添加固件
    *add({ payload }, { call, put }) {
      const resData = yield call(addFirmwares, payload);
      if (resData.success) {
        message.success("添加成功");
        yield put(routerRedux.push("/firmware"));
      } else {
        message.error(resData.message);
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

    updateFirmwareInfo(state, { payload }) {
      return {
        ...state,
        firmwareInfo: { ...payload }
      };
    }
  }
};
