import {
  queryAreaList,
  addArea,
  editAreaById,
  delAreaById,
} from 'services/region'

import { message } from 'antd'

export default {

  namespace: 'region',

  state: {
    regionTreeData: [], // 区域树
    operateType: 'add', // 操作类型 add - edit
    modalVisible: false, // 弹窗展示
    selectedData: null, // 被选中的区域
  },

  subscriptions: {
    setup({ dispatch, history }) {
      dispatch({ type: 'queryAreaList', payload: { roleLev: -1 }})
    },
  },

  effects: {
    // 查询区域列表
    *queryAreaList({ payload }, { call, put }) {
      const resData = yield call(queryAreaList, payload)
      if (resData.success) {
        let treeData = resData.data.filter(item => item.pId === 0)

        const findChild = pId => {
          return resData.data.filter(item => item.pId === pId)
        }

        const genTreeData = treeArray => {
          treeArray.forEach(item => {
            const children = findChild(item.id)
            item.children = children
            if (children.length > 1) {
              genTreeData(item.children)
            }
          })
        }

        genTreeData(treeData)

        let rootData = [{
          id: 0,
          pId: -1,
          name: '区域管理',
          children: treeData,
        }]

        yield put({ type: 'updateState', payload: { regionTreeData: rootData }})
        
      } else {
        message.error(resData.message)
      }
    },

    // 添加区域
    *addArea({ payload }, { call, put }) {
      const resData = yield call(addArea, payload)
      if (resData.success) {
        yield put({ type: 'queryAreaList', payload: { roleLev: -1 }})
        yield put({ type: 'updateState', payload: { modalVisible: false }})
        message.success('添加成功')
      } else {
        message.error(resData.message)
      }
    },

    // 修改区域
    *editAreaById({ payload }, { call, put }) {
      const resData = yield call(editAreaById, payload)
      if (resData.success) {
        yield put({ type: 'queryAreaList', payload: { roleLev: -1 }})
        yield put({ type: 'updateState', payload: { modalVisible: false }})
        message.success('修改成功')
      } else {
        message.error(resData.message)
      }
    },

    // 删除区域
    *delAreaById({ payload }, { call, put }) { 
      const resData = yield call(delAreaById, payload)
      if (resData.success) {
        yield put({ type: 'queryAreaList', payload: { roleLev: -1 }})
        message.success('删除成功')
      } else {
        message.error(resData.message)
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
  },

};
