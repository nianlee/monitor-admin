import { getRegionList,addUser } from "../services/manage";
import { message } from 'antd'
import { queryRoleList } from 'services/role'

export default {

  namespace: 'adduser',

  state: {
    modifyMsg:'',
    regionList:[],
    roleList: [], // 权限列表
    type: null, // 修改or新增
    modalVisible:false,
    modalMsg:'',
  },

  effects: {

    /*const pay = {
      userName:'wdy',
      userPw:'111111',
      roleId:'2',
      accType:'0',
      areaId:'1',
      realName:'deyong',
      phone:'18983364826',
      jobNum:'1001',
      email:'491814289@qq.com'
    };*/

    *add({ payload }, { call, put }) {
      const resData = yield call(addUser,payload);
      console.log('add user',resData);
      console.log('url',addUser)
      if(resData.success) {
        yield put({type:'updateShowModal',payload:{modalMsg:'添加成功'}})
      } else {
        yield put({type:'updateShowModal',payload:{modalMsg:resData.message}})
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

    updateShowModal(state,{ payload }) {
      return {
        ...state,
        ...payload,
        modalVisible:true,
      }
    },

    updateHideModal(state,{ payload }) {
      return {
        ...state,
        ...payload,
        modalVisible:false,
      }
    },

    updateState (state, { payload }) {
      return {
        ...state,
        ...payload,
        modalVisible:false,
      }
    },
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
      return history.listen(({pathname,query}) => {
        if(pathname === '/adduser') {
          dispatch({
            type:'getRegion',
            payload:{
              parentId:'500100',
              roleLev:'-1'
            }}),

            dispatch({ type: 'queryRoleList' })
        }
      });
    },
  },
};
