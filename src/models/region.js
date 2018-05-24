import {
  queryAreaList,
} from 'services/region'

import { message } from 'antd'

export default {

  namespace: 'region',

  state: {
    regionTreeData: [], // 区域树
  },

  subscriptions: {
    setup({ dispatch, history }) {
      dispatch({ type: 'queryAreaList', payload: { roleLev: -1 }})
    },
  },

  effects: {
    *queryAreaList({ payload }, { call, put }) {
      const resData =  yield call(queryAreaList, payload)
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

        yield put({ type: 'updateState', payload: { regionTreeData: treeData }})
        
      } else {
        message.error(resData.message)
      }
    },
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
