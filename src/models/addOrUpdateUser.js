import {
  queryAreaList,
  queryAreaByParentCode,
  addUser,
  modifyUserInfo
} from "../services/manage";
import { message } from "antd";
import { queryUserInfo } from "services/user";
import { queryRoleList } from "services/role";
import pathToRegexp from "path-to-regexp";
import { routerRedux } from "dva/router";

export default {
  namespace: "addOrUpdateUser",

  state: {
    regionList: [],
    roleList: [], // 权限列表
    type: "add", // 修改or新增

    userInfo: {} // 用户信息
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const addMatch = pathToRegexp("/addorupdateuser").exec(pathname);
        const match = pathToRegexp("/addorupdateuser/:id").exec(pathname);
        if (addMatch || match) {
          dispatch({
            type: "queryAreaList",
            payload: { level: 1 }
          });

          dispatch({ type: "queryRoleList" });
        }

        if (addMatch) {
          dispatch({
            type: "updateState",
            payload: { type: "add", userInfo: {} }
          });
        }

        if (match && match[1]) {
          const id = match[1];
          dispatch({ type: "updateState", payload: { type: "edit" } });
          dispatch({ type: "queryUserInfo", payload: { id } });
          dispatch({ type: "initArea" });
        }
      });
    }
  },

  effects: {
    // 添加用户
    *add({ payload }, { call, put }) {
      const resData = yield call(addUser, payload);
      if (resData.success) {
        message.success("添加成功");
        yield put(routerRedux.push("/usermanage"));
      } else {
        message.error(resData.message);
      }
    },

    // 获取用户信息
    *queryUserInfo({ payload }, { call, put }) {
      const resData = yield call(queryUserInfo, payload);
      if (resData.success) {
        const userInfo = {
          ...resData.data,
          areaId: resData.data.areaId.split(",")
        };
        yield put({ type: "updateState", payload: { userInfo } });
      } else {
        message.error(resData.message);
      }
    },

    // 修改用户信息
    *modifyUserInfo({ payload }, { call, put }) {
      const resData = yield call(modifyUserInfo, payload);
      if (resData.success) {
        message.success("修改成功");
        yield put(routerRedux.push("/usermanage"));
      } else {
        message.error(resData.message);
      }
    },

    // 获取权限列表
    *queryRoleList({ payload }, { call, put, select }) {
      const { data } = yield call(queryRoleList, {
        rows: 100,
        page: 1
      });
      const roleList = data.rows.map(item => ({
        ...item,
        key: item.id.toString(),
        id: item.id.toString()
      }));
      yield put({ type: "updateState", payload: { roleList } });
    },

    // 初始化区域
    // *initArea({}, { call, put }) {},

    // 获取区域
    *queryAreaList({ payload }, { call, put }) {
      const resData = yield call(queryAreaList, payload);
      const relist = [];

      if (resData.success) {
        resData.data.forEach(item => {
          relist.push({
            ...item,
            isLeaf: !item.isParent,
            label: item.name,
            value: item.code
          });
        });

        yield put({
          type: "updateState",
          payload: {
            regionList: relist
          }
        });
      } else {
        message.error(resData.msg);
      }
    },

    // 区域查询ByParentCode
    *queryAreaByParentCode({ payload }, { call, put }) {
      const addressLength = payload.length;
      const targetOption = payload[addressLength - 1];
      targetOption.loading = true;

      const resData = yield call(queryAreaByParentCode, {
        parentCode: targetOption.value
      });
      targetOption.loading = false;
      if (resData.success) {
        targetOption.children = resData.data.map(item => {
          return {
            ...item,
            isLeaf: addressLength > 2,
            label: item.name,
            value: item.code
          };
        });
      } else {
        message.error(resData.msg);
      }
    }
  },

  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload
      };
    }
  }
};
