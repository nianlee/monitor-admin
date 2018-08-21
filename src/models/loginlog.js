import { message } from "antd";
import { queryLog } from "services/loginlog";

export default {
  namespace: "loginlog",

  state: {
    userLogList: [], // 用户登录历史列表
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
      history.listen(({ pathname }) => {
        if (pathname === "/loginlog") {
          dispatch({
            type: "queryLog",
            payload: { page: 1, rows: 10, logType: 1 }
          });
        }
      });
    }
  },

  effects: {
    // 查询历史
    *queryLog({ payload }, { call, put }) {
      const resData = yield call(queryLog, payload);
      if (resData.success) {
        if (!resData.data || !resData.data.rows) {
          return;
        }

        const userLogList = resData.data.rows.map(item => {
          item.key = item.id;
          return item;
        });

        yield put({ type: "save", payload: { userLogList } });

        yield put({
          type: "updatePagination",
          payload: {
            total: resData.data.total,
            current: resData.data.curPage,
            pageSize: resData.data.pageSize
          }
        });
      } else {
        message.error(resData.message);
      }
    }
  },

  reducers: {
    save(state, { payload }) {
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
    }
  }
};
