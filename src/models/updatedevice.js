import { queryFirmVersion,updateFirmwareVersion } from "../services/manage";
import pathToRegexp from 'path-to-regexp'
import { message } from 'antd'

export default {

  namespace: 'updatedevice',

  state: {
    sn:'',
    firmwareVersion:'',
    updateMessage:'',
    modalVisible:false,
  },

  effects: {
    *firmVersion({ payload }, { call, put }) {  // eslint-disable-line
      const  resData = yield call(queryFirmVersion,payload)
      console.log('resData',resData)
      if(resData.success) {
        if(resData.data != null){
          yield put({
            type:'updateState',
            payload:{
              sn:payload,
              firmwareVersion:resData.data.firmwareVersion,
              modalVisible:false,
            }
          })
        } else {
          yield put({
            type:'updateState',
            payload:{
              sn:payload,
              firmwareVersion:'没有固件升级信息返回',
              modalVisible:false,
            }
          })
        }

      } else {
        throw message.error(resData.msg)
      }

    },

    *updateFirmwareVersion({ payload }, { call, put }) {
      const resData = yield call(updateFirmwareVersion,payload)
      console.log('resData',resData)
      if(resData.success) {
        yield put({
          type:'updateState',
          payload:{
            updateMessage:resData.message,
            modalVisible:true,
          }
        })
      }
    }
  },

  reducers: {

    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },

    hideModal(state, { payload }) {
      return {
        ...state,
        ...payload,
        modalVisible:false,
      }
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      history.listen(({ pathname }) => {
        const match = pathToRegexp('/updatedevice/:sn').exec(pathname)
        console.log('match',match)
        if (match) {
          dispatch({ type: 'firmVersion', payload: { sn: match[1] } })
        }
      })
    },
  },

};
