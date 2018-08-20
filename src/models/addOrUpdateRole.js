import {
  queryRoleInfoById,
  queryRoleMenuList,
  addRole,
  editRoleById,
  queryRoleListForDropdown,
  queryMenuList
} from "services/role";
import pathToRegexp from "path-to-regexp";
import { message } from "antd";
import { routerRedux } from "dva/router";

export default {
  namespace: "addOrUpdateRole",

  state: {
    type: null, // 修改or新增
    id: null, // 角色信息Id
    RoleListForDropdown: [], //角色列表查询-下拉框

    formParams: {
      parentId: {
        value: ""
      },
      roleName: {
        value: ""
      },
      roleDesc: {
        value: ""
      },
      menuIds: {
        value: []
      }
    }, // 表单参数

    allMenus: [] // 所有菜单信息
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathToRegexp("/manage/role/:type").exec(pathname);
        const updateMatch = pathToRegexp("/manage/role/:type/:id").exec(
          pathname
        );

        let type;
        let isMatched = false;
        if (match && match[1] == "1") {
          type = "add";
          isMatched = true;
          dispatch({ type: "clearState" });
        }

        if (updateMatch && updateMatch[1] == "2" && updateMatch[2]) {
          isMatched = true;
          type = "edit";
          dispatch({ type: "clearState" });
          dispatch({
            type: "queryRoleInfoById",
            payload: { Id: updateMatch[2] }
          });
          dispatch({
            type: "queryRoleMenuList",
            payload: { id: updateMatch[2] }
          });
        }

        if (isMatched) {
          dispatch({ type: "queryRoleListForDropdown" });
          dispatch({ type: "queryMenuList" });
          dispatch({ type: "updateState", payload: { type } });
        }
      });
    }
  },

  effects: {
    // 查询权限详情
    *queryRoleInfoById({ payload }, { call, put, select }) {
      const resData = yield call(queryRoleInfoById, payload);

      if (resData.success) {
        yield put({ type: "updateState", payload: { id: resData.data.id } });
        yield put({
          type: "updateFormParams",
          payload: {
            parentId: {
              value: resData.data.parentId && resData.data.parentId.toString()
            },
            roleName: {
              value: resData.data.roleName
            },
            roleDesc: {
              value: resData.data.roleDesc
            }
          }
        });
      } else {
        message.error(resData.message);
      }
    },

    // 角色菜单查询
    *queryRoleMenuList({ payload }, { call, put, select }) {
      const resData = yield call(queryRoleMenuList, payload);
      const menuIds = resData.data.map(item => item.id);
      if (resData.success) {
        yield put({
          type: "updateFormParams",
          payload: {
            menuIds: {
              value: menuIds
            }
          }
        });
      } else {
        message.error(resData.message);
      }
    },

    // 角色添加
    *addRole({ payload }, { call, put, select }) {
      const resData = yield call(addRole, payload);

      if (resData.success) {
        message.success("添加成功");
        yield put(routerRedux.push("/manage/role"));
      } else {
        message.error(resData.message);
      }
    },

    // 获取角色列表查询-下拉框
    *queryRoleListForDropdown({ payload }, { call, put }) {
      const resData = yield call(queryRoleListForDropdown, {
        rows: 100,
        page: 1
      });
      if (resData.success) {
        const RoleListForDropdown = resData.data.map(item => ({
          ...item,
          key: item.value
        }));
        yield put({ type: "updateState", payload: { RoleListForDropdown } });
      } else {
        message.error(resData.message);
      }
    },

    // 角色信息更新
    *editRoleById({ payload }, { call, put, select }) {
      const resData = yield call(editRoleById, payload);
      if (resData.success) {
        message.success("更新成功");
        yield put(routerRedux.push("/manage/role"));
      } else {
        message.error(resData.message);
      }
    },

    // 查询菜单列表
    *queryMenuList({ payload }, { call, put, select }) {
      const resData = yield call(queryMenuList, payload);

      if (resData.success) {
        yield put({
          type: "updateState",
          payload: { allMenus: resData.data.sort((a, b) => a.id - b.id) }
        });
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

    updateFormParams(state, { payload }) {
      return {
        ...state,
        formParams: {
          ...state.formParams,
          ...payload
        }
      };
    },

    clearState(state) {
      return {
        ...state,
        id: null, // 角色信息Id
        RoleListForDropdown: [],
        formParams: {
          parentId: {
            value: null
          },
          roleName: {
            value: ""
          },
          roleDesc: {
            value: ""
          },
          menuIds: {
            value: []
          }
        } // 表单参数
      };
    }
  }
};
