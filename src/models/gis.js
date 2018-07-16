import { queryDeviceSelective } from "services/gis";
import { message } from "antd";

const randomMarker = len =>
  Array(len)
    .fill(true)
    .map((e, idx) => ({
      position: {
        longitude: 100 + Math.random() * 30,
        latitude: 30 + Math.random() * 20
      },
      myIndex: idx + 1,
      type: Math.ceil((Math.random() * 10) % 3)
    }));

export default {
  namespace: "gis",

  state: {
    AMAP_KEY: "a09811fd80142cc7b385d2830fbbb384", // 高德地图key

    equitmentInfo: [], // 设备信息
    longitude: 106.631015, // 默认渝北区
    latitude: 29.717099,

    dataList: [], // 设备列表数据
    allDataList: randomMarker(100) // 所有数据
  },

  subscriptions: {
    setup({ dispatch, history }) {
      // eslint-disable-line
      dispatch({ type: "initData" });
    }
  },

  effects: {
    // 初始化数据
    *initData({ payload }, { call, put, select }) {
      const { allDataList } = yield select(_ => _.gis);
      yield put({ type: "updateState", payload: { dataList: allDataList } });
    },

    // 查询设备信息
    *queryDeviceSelective({ payload }, { call, put, select }) {
      const resData = yield call(queryDeviceSelective, payload);

      if (resData.success) {
        const info = resData.data.rows[0].datDevice;
        const equitmentInfo = [];

        equitmentInfo.push({
          key: 1,
          title: "设备名称",
          description: info.name
        });

        equitmentInfo.push({
          key: 2,
          title: "设备类型",
          description: info.type
        });

        equitmentInfo.push({
          key: 3,
          title: "厂商",
          description: info.manufacturer
        });

        equitmentInfo.push({
          key: 4,
          title: "运营商",
          description: info.carrierOperator
        });

        equitmentInfo.push({
          key: 5,
          title: "设备地址",
          description: info.detailAddr
        });

        equitmentInfo.push({
          key: 6,
          title: "设备状态",
          description: info.state
        });

        yield put({
          type: "updateState",
          payload: {
            equitmentInfo: equitmentInfo,
            longitude: info.longitude,
            latitude: info.latitude
          }
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
    }
  }
};
