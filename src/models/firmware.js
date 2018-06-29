import {
  queryFirmwaresList,
  queryFirmwaresInfo,
  deleteFirmwares
} from "../services/manage";

import { message } from "antd";

export default {
  namespace: "firmware",

  state: {
    // 用户列表的info
    firmwareList: [],
    firmwareInfos: [],
    modalVisible: false,

    pagination: {
      current: 1,
      pageSize: 10,
      total: 0,
      showTotal: total => `共${total}条数据`,
      showQuickJumper: true,
      showSizeChanger: true
    }
  },

  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === "/firmware") {
          dispatch({
            type: "queryFirmwareList",
            payload: {
              page: 1,
              rows: 10
            }
          });
        }
      });
    }
  },

  effects: {
    // 查询固件列表
    *queryFirmwareList({ payload }, { call, put }) {
      const resData = yield call(queryFirmwaresList, payload);

      if (resData.success) {
        const firmwareList = resData.data.rows.map((item, index) => {
          item.index = index + 1;
          item.key = item.id;
          return item;
        });

        yield put({ type: "updateState", payload: { firmwareList } });
        yield put({
          type: "updatePagination",
          payload: {
            total: resData.data.total,
            pageIndex: resData.data.curPage,
            pageSize: resData.data.pageSize
          }
        });
      } else {
        message.error(resData.message);
      }
    },

    // 查询单个固件信息
    *queryFirmwaresInfo({ payload }, { call, put }) {
      const resData = yield call(queryFirmwaresInfo, payload);
      console.log("queryFirmwaresInfo", resData);
      if (resData.success) {
        const firmware = resData.data;
        yield put({
          type: "showAddModal",
          payload: { firmwareInfos: firmware }
        });
      } else {
        message.error(resData.message);
      }
    },

    // 删除固件
    *deleteFirmware({ payload }, { call, put, select }) {
      const resData = yield call(deleteFirmwares, payload);
      if (resData.success) {
        message.success("删除成功");
        yield put({ type: "queryFirmwareList" });
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

    updatePagination(state, { payload }) {
      return {
        ...state,
        pagination: {
          ...state.pagination,
          ...payload
        }
      };
    },

    showAddModal(state, { payload }) {
      return {
        ...state,
        ...payload,
        modalVisible: true
      };
    },

    hideAddModal(state, { payload }) {
      return {
        ...state,
        ...payload,
        modalVisible: false
      };
    }
  }
};
