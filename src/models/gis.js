import {
  queryDeviceSelective,
  queryAreaList,
  queryAreaByParentCode,
  queryDevices
} from "services/gis";
import { message } from "antd";
import pathToRegexp from "path-to-regexp";

const maxCount = 5000; // 显示设备的最大条数

export default {
  namespace: "gis",

  state: {
    AMAP_KEY: "a09811fd80142cc7b385d2830fbbb384", // 高德地图key

    equitmentInfo: [], // 设备信息
    sn: null, // sn 的值
    longitude: null, // 经度
    latitude: null, // 纬度

    regionList: [], // 区域列表
    dataList: [], // 设备列表数据
    allDataList: [] // 所有数据
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        const match = pathToRegexp("/gis/:sn").exec(pathname);

        if (match && match[1]) {
          // 根据sn 初始化页面
          dispatch({ type: "initDataBySn", payload: { sn: match[1] } });
          dispatch({ type: "updateState", payload: { sn: match[1] } });
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
      yield put({ type: "queryDevices", payload: { sourceType: "init" } });
    },

    // 根据sn 初始化数据
    *initDataBySn({ payload }, { call, put, select }) {
      yield put({
        type: "queryDeviceSelective",
        payload: { deviceSn: payload.sn, sourceType: "init" }
      });
      yield put({ type: "queryDevices" });
    },

    // 查询设备信息
    *queryDeviceSelective({ payload }, { call, put, select }) {
      const resData = yield call(queryDeviceSelective, payload);

      if (resData.success) {
        const info = resData.data.rows[0].datDevice; // 固定属性
        const equitmentInfo = [];

        // 带sn 的页面跳转，初始化dataList 为sn 对应的详细数据，设置marker，以及地图中心
        if (payload.sourceType === "init") {
          yield put({
            type: "updateState",
            payload: {
              dataList: [info],
              longitude: info.longitude,
              latitude: info.latitude
            }
          });
        }

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

    // 根据条件查询设备
    *queryDevices({ payload }, { call, put }) {
      const data = {
        ...payload,
        page: 1,
        rows: maxCount
      };

      delete data.sourceType;

      const resData = yield call(queryDevices, data);

      if (resData.success) {
        // 格式化为marker 所需格式
        const formatedData = resData.data.rows.map(item => {
          let formatedItem = item;
          formatedItem.position = {
            longitude: item.longitude,
            latitude: item.latitude
          };
          return formatedItem;
        });

        console.log(formatedData);

        const updateData = { allDataList: formatedData };

        if (
          (payload && payload.sourceType === "init") ||
          (payload && payload.sourceType === "areaChange")
        ) {
          updateData.dataList = formatedData;
        }

        // 设置中心点
        const oneInfo = formatedData[0];
        updateData.longitude = oneInfo.longitude;
        updateData.latitude = oneInfo.latitude;

        yield put({
          type: "updateState",
          payload: updateData
        });
      } else {
        message.error(resData.msg);
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
            isLeaf: addressLength > 1,
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
