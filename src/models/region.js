import {
  queryAreaList,
  addArea,
  editAreaById,
  delAreaByCode,
  queryAreaByParentCode
} from "services/region";

import { message } from "antd";

const findNodeByCode = (tree, code) => {
  let node = null;

  const travelTree = arr => {
    if (!Array.isArray(arr)) return;

    arr.forEach(treeNode => {
      if (treeNode.code == code) {
        node = treeNode;
        return;
      }

      treeNode.children && travelTree(treeNode.children);
    });
  };

  travelTree(tree);

  return node;
};

export default {
  namespace: "region",

  state: {
    regionTreeData: [], // 区域树
    operateType: "add", // 操作类型 add - edit
    modalVisible: false, // 弹窗展示
    selectedData: null // 被选中的区域
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === "/region") {
          dispatch({ type: "queryAreaList", payload: { roleLev: 1 } });
        }
      });
    }
  },

  effects: {
    // 查询区域列表
    *queryAreaList({ payload }, { call, put }) {
      const resData = yield call(queryAreaList, payload);
      if (resData.success) {
        let rootData = [
          {
            pCode: "0",
            code: "0",
            name: "区域管理",
            children: resData.data
          }
        ];

        yield put({
          type: "updateState",
          payload: { regionTreeData: rootData }
        });
      } else {
        message.error(resData.message);
      }
    },

    // 添加区域
    *addArea({ payload }, { call, put, select }) {
      const resData = yield call(addArea, payload);
      if (resData.success) {
        const { regionTreeData } = yield select(_ => _.region);
        const node = findNodeByCode(regionTreeData, payload.parentCode);

        const datas = yield call(queryAreaByParentCode, {
          parentCode: payload.parentCode
        });

        if (node && datas.success) {
          node.children = datas.data;
        }

        yield put({
          type: "updateState",
          payload: { regionTreeData, modalVisible: false }
        });

        message.success("添加成功");
      } else {
        message.error(resData.message);
      }
    },

    // 修改区域
    *editAreaById({ payload }, { call, put, select }) {
      const resData = yield call(editAreaById, payload);

      if (resData.success) {
        const { regionTreeData, selectedData } = yield select(_ => _.region);
        const node = findNodeByCode(regionTreeData, selectedData.pCode);

        const datas = yield call(queryAreaByParentCode, {
          parentCode: selectedData.pCode
        });

        if (node && datas.success) {
          node.children = datas.data;
        }

        yield put({
          type: "updateState",
          payload: { regionTreeData, modalVisible: false }
        });

        message.success("修改成功");
      } else {
        message.error(resData.message);
      }
    },

    // 删除区域
    *delAreaByCode({ payload }, { call, put, select }) {
      const resData = yield call(delAreaByCode, payload);
      if (resData.success) {
        const { regionTreeData, selectedData } = yield select(_ => _.region);
        const node = findNodeByCode(regionTreeData, selectedData.pCode);

        const datas = yield call(queryAreaByParentCode, {
          parentCode: selectedData.pCode
        });

        if (node && datas.success) {
          node.children = datas.data;
        }

        yield put({
          type: "updateState",
          payload: { regionTreeData }
        });

        message.success("删除成功");
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
    }
  }
};
