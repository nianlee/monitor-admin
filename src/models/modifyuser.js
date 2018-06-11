import { modifyUserInfo, getRegionList } from "../services/manage";
import { queryRoleList } from 'services/role'
import pathToRegexp from 'path-to-regexp';
import { message } from 'antd';

export default {

  namespace: 'modifyuser',

  state: {
    modifyMsg:'',
    userModel:[],
    regionList:[],
    roleList: [],
  },

  effects: {
    *modify({ payload }, { call, put, select }) {
      const resData = yield call(modifyUserInfo,payload)

      console.log('resData',resData)

      if(resData.success) {
        console.log(resData.msg);
        yield put({
          type:'updateState',
          payload:{
            modifyMsg:resData.msg,
          }
        })
      } else {
        throw resData.msg
      }
    },

    *deleteUserInfo({ payload },{ call, put, select }) {
      const resDate = yield call(modifyUserInfo,payload)
      if(resDate.success) {
        console.log(resDate);
        yield put({
          type:'updateDeleteState',
          payload:{
            id:payload
          },
        })
      } else {
        throw resDate.msg
      }
    },

    *queryRoleList({ payload }, { call, put, select }) {
      const { data } = yield call(queryRoleList, {
        ...payload,
        rows: '100',
        page: '1',
      })
      const roleList = data.rows.map(item => ({ ...item, key: item.id }))
      yield put({ type: 'updateState', payload: { roleList }})
    },

    // 获取区域
    *getRegion({ payload }, { call, put }) {
      const resData = yield call(getRegionList, payload);
      const relist = []

      if(resData.success) {
        for(let v of resData.data) {
          relist.push({
            name:v.name,
            id:v.id
          })
        }

        yield  put({
          type:'updateState',
          payload:{
            regionList:relist,
          }
        })

      } else {
        message.error(resData.msg)
      }
    },
  },

  reducers: {
    updateState (state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      history.listen(({ pathname }) => {
        const match = pathToRegexp('/modifyuser/:id/:userName/:userPw/:roleId/:realName/:phone/:email/:jobNum/:state/:areaId').exec(pathname)
        console.log('match',match)
        const models = []
        if (match) {
          models.id = match[1]
          models.userName = match[2]
          models.userPw = match[3]
          models.roleId = match[4]
          models.realName = match[5]
          models.phone = match[6]
          models.email = match[7]
          models.jobNum = match[8]
          models.state = match[9]
          models.areaId = match[10]

          dispatch({ type: 'updateState', payload: { userModel:models } })

          dispatch({
            type:'getRegion',
            payload:{
              parentId:'500100',
              roleLev:'-1'
            }}),

            dispatch({ type: 'queryRoleList' })

        }
      })
    },
  },

};
