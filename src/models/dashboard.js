import {
  queryDeviceCountByState,
  queryAlarmDevices,
  queryDeviceCountByLevel1Area,
  queryDeviceCountByStateHis,
  queryDeviceBySn,
  batchInspectionDevices,
  queryBatchInspectionDevicesProgress,
  queryAlarmDeviceCountWithLast
} from "../services/dashboard";
import {
  queryDevices,
  queryAreaList,
  queryAreaByParentCode,
  queryDeviceType, queryDeviceByAlarmInfo
} from "../services/manage";
import { message, notification } from "antd";
import {
  refreshData,
  stopRefreshData,
  formatState,
  formateDynamic
} from "utils";

export default {
  namespace: "dashboard",

  state: {
    OfflineRate: 0, // 离线率
    TotalCount: 0, // 设备总数
    OffLineCount: 0, // 离线设备
    OnlineRate: 0, // 在线率
    OnlineCount: 0, // 在线设备数
    AlarmRate: 0, // 警告率
    AlarmCount: 0, // 警告设备数

    onlineList: [], // 在线设备列表
    alarmList: [], // 警告设备列表
    offlineList: [], // 离线设备列表

    AreaCount: [], // 每个区的设备量
    timeIdList: [], // 日期ID数组
    onlineNumList: [], //在线数数组
    offlineNumList: [], //离线数数组
    alarmNumList: [], //预警数数组
    onlineRateList: [], //在线率数组
    offlineRateList: [], //离线率数组
    alarmRateList: [], //预警率数组
    healthRateList: [], //健康度数组
    inspectionTime: '', // 巡检启动循环时间

    dataSource: [], // 设备列表
    regionList: [], // 区域列表
    deviceTypes: [], // 设备类型列表
    deviceState: [], // 设备状态列表
    pagination: {
      current: 1,
      pageSize: 10,
      total: 0,
      showTotal: total => `共${total}条数据`,
      showQuickJumper: true,
      showSizeChanger: true
    },
    deviceQueryParamsCache: {}, // 设备查询参数缓存

    deviceModalVisible: false, // 设备详情弹窗
    deviceDetailInfo: {}, // 设备详细信息
    checkDeviceSn: "", // 查看详情sn
    inspectionShow: false, // 一键巡检loading 展示
    inspectionProgress: 0, // 巡检进度
    runToken: "", // 巡检token
    inspectionTimer: null, // 巡检 setInterval
    inspectionOpenTimer: null, // 一键巡检启动 setInterval
    deviceDetailAlarmInfo:{},// 设备预警列表信息
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname == "/dashboard") {

          dispatch({ type: "queryDeviceCountByState" });
          dispatch({
            type: "queryAlarmDevices",
            payload: { page: 1, rows: 4 }
          });

          /*
          dispatch({
            type: "queryDeviceCountByStateHis",
            payload: { needCache: "true", timeType: "DAY" }
          });
          */
          dispatch({
            type: "queryDevices",
            payload: { page: "1", rows: "10" }
          });
          dispatch({ type: "queryAreaList", payload: { level: 1 } });
          dispatch({
            type: "queryDeviceType",
            payload: { page: "1", rows: "100", paramType: "sys-device-type" }
          });
          dispatch({
            type: "queryDeviceState",
            payload: { page: "1", rows: "100", paramType: "sys-device-state" }
          });

          refreshData(dispatch);
        } else {
          stopRefreshData();
        }
      });
    }
  },

  effects: {

    // 循环获取数据
    *intervalData({ payload }, { call, put, select }) {
      const { deviceQueryParamsCache } = yield select(_ => _.dashboard);
      //console.log('intervalData',deviceQueryParamsCache);
      // 没有分页数据时，初始化分页数据
      if (!deviceQueryParamsCache.page) {
        deviceQueryParamsCache.page = 1;
      }

      if (!deviceQueryParamsCache.rows) {
        deviceQueryParamsCache.rows = 10;
      }

      yield put({ type: "queryDeviceCountByState" });
      yield put({ type: "queryAlarmDeviceCountWithLast" });
      yield put({ type: "queryAlarmDevices", payload: { page: 1, rows: 4 } });
      yield put({
        type: "queryDeviceCountByStateHis",
        payload: { needCache: "true", timeType: "DAY" }
      });
      yield put({ type: "queryDevices", payload: deviceQueryParamsCache });
    },

    *setRefreshTime({ payload }, { call, put }) {

    },

    *queryDeviceByAlarmInfo({ payload }, { call, put }) {

      const resData = yield call(queryDeviceByAlarmInfo, payload);

      const deviceDetailAlarmInfo = {
        alarmInfo:[]
      };

      const alarmInfo = deviceDetailAlarmInfo.alarmInfo;
      if(resData.data.rows) {
        resData.data.rows.forEach(item => {
          alarmInfo.push({
            key: item.alarmCategoryName,
            label: item.alarmCategoryName,
            value: item.alarmInfo
          })
        });

        deviceDetailAlarmInfo.alarmInfo = alarmInfo;

        yield put({
          type: "save",
          payload: { deviceDetailAlarmInfo }
        });
      }
    },


    // 查询设备列表
    *queryDevices({ payload }, { call, put, select }) {
      const { deviceQueryParamsCache } = yield select(_ => _.dashboard);

      const data = {
        ...deviceQueryParamsCache,
        ...payload
      };



      // 缓存查询参数
      yield put({
        type: "updateState",
        payload: { deviceQueryParamsCache: data }
      });

      const resData = yield call(queryDevices, data);

      if (resData.success) {
        if (!resData.data || !resData.data.rows) {
          yield put({
            type: "updateState",
            payload: {
              dataSource: [],
              total: 0,
              pageSize: 10,
              currentPage: 1
            }
          });
          return;
        }
        const devicesList = resData.data.rows.map(item => {
          item = formatState(item);
          item.key = item.sn;

          /*if(item.networkState == '-1') {
            item = networkformatState(item);
            item.key = item.sn;
          } else {

          }*/
          return item;
        });

        yield put({
          type: "updatePagination",
          payload: {
            total: resData.data.total,
            pageIndex: resData.data.curPage,
            pageSize: resData.data.pageSize,
          }
        });

        yield put({
          type: "updateState",
          payload: {
            dataSource: devicesList,
            total: resData.data.total,
            pageSize: resData.data.pageSize,
            currentPage: resData.data.curPage
          }
        });

      } else {
        message.error(resData.message);
      }

    },

    *clearQueryParamsCache({ payload}, { call, put }) {
      yield put({
        type: "updateState",
        payload:{deviceQueryParamsCache: payload}
      });
    },

    // 根据sn 查询设备详细信息
    *queryDeviceBySn({ payload }, { call, put }) {

      const resData = yield call(queryDeviceBySn, payload);

      if (resData.success) {

        const info = formatState(resData.data.rows[0].datDeviceDetailDTO); // 固定属性
        const checkDeSn = info.sn;

        const deviceDetailInfo = {
          name: info.name,
          baseInfo: [],
          statusInfo: [],
          dynamicInfo: [],
          controlInfo:[],
          testInfo:[]
        };

        const baseInfo = deviceDetailInfo.baseInfo;

        baseInfo.push({
          key: "设备编码",
          label: "设备编码",
          value: info.code
        });

        baseInfo.push({
          key: "mac",
          label: "mac",
          value: info.mac
        });

        baseInfo.push({
          key: "设备类型",
          label: "设备类型",
          value: info.type
        });

        baseInfo.push({
          key: "固件版本",
          label: "固件版本",
          value: info.firmwareVersion
        });

        baseInfo.push({
          key: "硬件版本",
          label: "硬件版本",
          value: info.hardwareVersion
        });

        baseInfo.push({
          key: "设备状态",
          label: "设备状态",
          value: info.state
        });

        baseInfo.push({
          key: "安装地址",
          label: "安装地址",
          value: info.detailAddr
        });
        baseInfo.push({
          key: "更新时间",
          label: "更新时间",
          value: info.dataUpTime
        });

        // 动态属性
        const deviceDynamicDTOS = resData.data.rows[0].deviceDynamicDTOS;
        const dynamicInfo = [];
        const statusInfo = [];
        const controlInfo = [];

        if (deviceDynamicDTOS) {
          deviceDynamicDTOS.forEach(item => {
            item = formateDynamic(item);

            // 状态信息
            if (
              item.attributeCode == "ACInput" || //交流输入状态
              item.attributeCode == "leakageState" || //漏电状态
              item.attributeCode == "DI1" || //门禁状态
              //item.attributeCode == "incline" || //箱体倾斜状态
              item.attributeCode == "DI2" ||   //防雷状态
              item.attributeCode == "fanState" //风扇状态

            ) {
              statusInfo.push({
                key: item.attributeCode,
                label: item.attributeName,
                value: item.attributeValue
              });
            } else if(
              item.attributeCode == "ACCtrl1" || //第1路交流控制
              item.attributeCode == "ACCtrl2" || //第2路交流控制
              item.attributeCode == "DCCtrl1" || //第1路直流控制
              item.attributeCode == "DCCtrl2" || //第2路直流控制
              item.attributeCode == "DCCtrl3" || //第3路直流控制
              item.attributeCode == "DCCtrl4" || //交换机控制
              item.attributeCode == "DCCtrl5" || //风扇控制
              item.attributeCode == "DCCtrl6"    //门锁控制
            ) {
              //控制信息
              controlInfo.push({
                key: item.attributeCode,
                label: item.attributeName,
                value: item.attributeValue
              });
            } else {
              // 动态信息
              dynamicInfo.push({
                key: item.attributeCode,
                label: item.attributeName,
                value: item.attributeValue
              });
            }
          });
        }

        deviceDetailInfo.statusInfo = statusInfo;
        deviceDetailInfo.dynamicInfo = dynamicInfo;
        deviceDetailInfo.controlInfo = controlInfo;

        yield put({
          type: "updateState",
          payload: {
            deviceDetailInfo,
            checkDeviceSn: checkDeSn
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
    },

    //获取设备类型
    *queryDeviceType({ payload }, { call, put }) {
      const resData = yield call(queryDeviceType, payload);
      const types = [];
      if (resData.success) {
        for (let i = 0; i < resData.data.length; i++) {
          types.push({
            id: i,
            name: resData.data[i].name,
            value: resData.data[i].value
          });
        }
        yield put({
          type: "updateState",
          payload: {
            deviceTypes: types
          }
        });
      } else {
        message.error(resData.message);
      }
    },

    //获取设备状态
    *queryDeviceState({ payload }, { call, put }) {
      const resData = yield call(queryDeviceType, payload);
      const types = [];
      if (resData.success) {
        for (let i = 0; i < resData.data.length; i++) {
          types.push({
            id: i,
            name: resData.data[i].name,
            value: resData.data[i].value
          });
        }
        yield put({
          type: "updateState",
          payload: {
            deviceState: types
          }
        });
      } else {
        message.error(resData.message);
      }
    },

    //统计设备状态对应设备数历史列表
    *queryDeviceCountByStateHis({ payload }, { call, put }) {
      const resData = yield call(queryDeviceCountByStateHis, payload);

      if (resData.success) {
        yield put({ type: "save", payload: { ...resData.data } });
      }
    },

    // 统计设备状态对应设备数
    *queryDeviceCountByLevel1Area({ payload }, { call, put }) {
      const resData = yield call(queryDeviceCountByLevel1Area, payload);
      const relist = [];
      if (resData.success) {
        resData.data.forEach(item => {
          relist.push({
            name: item.name,
            value: item.value
          });
        });

        yield put({
          type: "save",
          payload: {
            AreaCount: relist
          }
        });
      } else {
        console.log(resData.message);
      }
    },

    // 统计设备状态对应设备数
    *queryDeviceCountByState({ payload }, { call, put }) {
      const resData = yield call(queryDeviceCountByState);
      if (resData.success) {
        yield put({ type: "save", payload: { ...resData.data } });
      } else {
        console.log(resData.message);
      }
    },

    // 统计故障设备列表
    *queryAlarmDevices({ payload }, { call, put }) {
      const resData = yield call(queryAlarmDevices, payload);
      if (resData.success) {
        // 添加key
        const alarmList = resData.data.rows.map(item => {
          item.key = item.id + Math.random(1) + ""; // 加上random 确保key值唯一
          return item;
        });

        yield put({ type: "save", payload: { alarmList: alarmList.slice() } });
      } else {
        console.log(resData.message);
      }
    },

    // 设备预警数是否变化查询
    *queryAlarmDeviceCountWithLast({ payload }, { call, put }) {
      const resData = yield call(queryAlarmDeviceCountWithLast, payload);
      if (resData.success) {
        if (resData.data.changeFlag) {
          notification.open({
            message: "预警通知",
            description: `预警设备数量:${resData.data.alarmCount}`
          });
        }
      }
    },

    //一键巡检全量设备
    *batchInspectionDevices({ payload }, { call, put }) {
      const resData = yield call(batchInspectionDevices, payload);

      if (resData.success) {
        yield put({
          type: "save",
          payload: { runToken: resData.data, inspectionShow: true }
        });
        return resData.data; // 返回runToken
      } else {
        message.error(resData.message);
        yield put({ type: "save", payload: { inspectionShow: false } });
      }
    },

    //一键巡检全量设备进度查询
    *queryBatchInspectionDevicesProgress({ payload }, { call, put, select }) {
      const resData = yield call(queryBatchInspectionDevicesProgress, payload);
      if (resData.success) {
        yield put({
          type: "save",
          payload: { inspectionProgress: resData.data }
        });
      }

      if (!resData.success || (resData.success && resData.data === 100)) {
        const { inspectionTimer } = yield select(_ => _.dashboard);
        clearInterval(inspectionTimer);

        yield put({ type: "save", payload: { inspectionShow: false, inspectionProgress: 0 } });

        message.success("巡检成功");
        return "finish";
      } else {
        return "inprogress";
      }
    }
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },

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
    }
  }
};
