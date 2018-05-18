import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import { connect } from 'dva'

import AddOrUpdate from './components/AddOrUpdate'

import styles from './style.less'

const Role = ({ role, dispatch }) => {

  const columns = [{
    title: '角色名称',
    dataIndex: 'roleName',
    className: [styles.center],
    key: 'roleName',
  }, {
    title: '角色描述',
    dataIndex: 'roleDes',
    className: [styles.center],
    key: 'roleDes',
  }, {
    title: '上级角色名称',
    dataIndex: 'parentId',
    className: [styles.center],
    key: 'parentId',
  }, {
    title: '状态',
    className: [styles.center],
    dataIndex: 'roleState',
    key: 'roleState',
  }, {
    title: '创建人',
    dataIndex: 'createId',
    className: [styles.center],
    key: 'createId',
  }, {
    title: '创建时间',
    dataIndex: 'createDate',
    className: [styles.center],
    key: 'createDate',
  }, {
    title: '操作',
    dataIndex: 'opertor',
    className: [styles.center],
    key: 'opertor',
    render: (text, record) => { // eslint-disable-line
      return (
        <div>
          <a onClick={update}>修改</a>
          <a onClick={add} style={{ marginLeft: 5 }}>新增</a>
        </div>
      )
    }
  }];

  const update = () => {
    dispatch({ type: 'role/updateState', payload: { modalVisible: true, type: 'update' }})
  }

  const add = () => {
    dispatch({ type: 'role/updateState', payload: { modalVisible: true, type: 'add' }})    
  }

  return (
    <div style={{ backgroundColor: '#fff' }}>
      <Table 
        columns={columns}
        dataSource={role.roleList}
      />
      <AddOrUpdate role={role} dispatch={dispatch}/>
    </div>
  )
}

Role.propTypes = {
  role: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ role }) => ({ role }))(Role)
