import { queryDeviceSelective } from 'services/gis'

export default {

  namespace: 'gis',

  state: {
    AMAP_KEY: 'a09811fd80142cc7b385d2830fbbb384', // 高德地图key

    equitmentInfo: [], // 设备信息
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *queryDeviceSelective({ payload }, { call, put, select }) {
      const resData = yield call(queryDeviceSelective, payload)
      const info = resData.data
      const equitmentInfo = []

      equitmentInfo.push({
        key: 1,
        title: '设备名称',
        description: info.name,
      }) 

      equitmentInfo.push({
        key: 2,
        title: '设备类型',
        description: info.type
      }) 

      equitmentInfo.push({
        key: 3,
        title: '厂商',
        description: info.manufacturer
      })

      equitmentInfo.push({
        key: 4,
        title: '运营商',
        description: info.carrierOperator
      })

      equitmentInfo.push({
        key: 5,
        title: '设备地址',
        description: info.detailAddr
      })


      equitmentInfo.push({
        key: 6,
        title: '设备状态',
        description: info.state
      })


      yield put({
        type: 'updateState',
        payload: {
          equitmentInfo: equitmentInfo,
        }
      })
    },
  },

  reducers: {
    updateState (state, { payload }) {
      return {
        ...state,
        payload,
      }
    }
  },

};
