import {
  queryDeviceSelective,
  queryAreaList,
  queryAreaByParentCode
} from "services/gis";
import { message } from "antd";
import pathToRegexp from "path-to-regexp";

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

    regionList: [], // 区域列表
    dataList: [], // 设备列表数据
    allDataList: randomMarker(100) // 所有数据
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathToRegexp("/gis/:sn").exec(pathname);

        if (match && match[1]) {
          // 根据sn 初始化页面
          dispatch({ type: "initDataBySn", payload: { sn: match[1] } });
        } else {
          dispatch({ type: "initData" });
        }

        dispatch({
          type: "queryAreaList",
          payload: { level: 1 }
        });
      });
    }
  },

  effects: {
    // 初始化数据
    *initData({ payload }, { call, put, select }) {
      const { allDataList } = yield select(_ => _.gis);
      yield put({ type: "updateState", payload: { dataList: allDataList } });
    },

    // 根据sn 初始化数据
    *initDataBySn({ payload }, { call, put, select }) {
      // const { allDataList } = yield select(_ => _.gis);
      yield put({
        type: "queryDeviceSelective",
        payload: { deviceSn: payload.sn }
      });

      // yield put({ type: "updateState", payload: { dataList: allDataList } });
    },

    // 查询设备信息
    *queryDeviceSelective({ payload }, { call, put, select }) {
      const resData = yield call(queryDeviceSelective, payload);

      if (resData.success) {
        const info = resData.data.rows[0].datDevice; // 固定属性
        const equitmentInfo = [];

        equitmentInfo.push({
          key: "设备名称",
          title: "设备名称",
          description: info.name
        });

        equitmentInfo.push({
          key: "mac",
          title: "mac",
          description: info.mac
        });

        equitmentInfo.push({
          key: "设备类型",
          title: "设备类型",
          description: info.type
        });

        equitmentInfo.push({
          key: "设备状态",
          title: "设备状态",
          description: info.state
        });

        equitmentInfo.push({
          key: "硬件版本",
          title: "硬件版本",
          description: info.hardwareVersion
        });

        equitmentInfo.push({
          key: "设备地址",
          title: "设备地址",
          description: info.detailAddr
        });

        // 动态属性
        const deviceDynamicDTOS = resData.data.rows[0].deviceDynamicDTOS;
        if (deviceDynamicDTOS) {
          deviceDynamicDTOS.forEach(item => {
            equitmentInfo.push({
              key: item.attributeDesc,
              title: item.attributeName,
              description: item.attributeValue
            });
          });
        }

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
    },

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
