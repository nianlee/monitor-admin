import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import { connect } from 'dva'

import styles from './style.less'

const Role = ({ role, dispatch }) => {

  const columns = [{
    title: '角色名称',
    dataIndex: 'sn',
    className: [styles.center],
    key: 'sn',
  }, {
    title: '角色描述',
    dataIndex: 'name',
    className: [styles.center],
    key: 'name',
  }, {
    title: '上级角色名称',
    dataIndex: 'state',
    className: [styles.center],
    key: 'state',
  }, {
    title: '状态',
    className: [styles.center],
    dataIndex: 'type',
    key: 'type',
  }, {
    title: '创建人',
    dataIndex: 'allAreaId',
    className: [styles.center],
    key: 'allAreaId',
  }, {
    title: '创建时间',
    dataIndex: 'carrierOperator',
    className: [styles.center],
    key: 'carrierOperator',
  }, {
    title: '操作',
    dataIndex: 'opertor',
    className: [styles.center],
    key: 'opertor',
    render: (text, record) => { // eslint-disable-line
      return (
        <div>
          <a>修改</a>
          <a>删除</a> 
        </div>
      )
    }
  }];

  return (
    <div style={{ width: '100%' }}>
      <Table 
        columns={columns}
      />
    </div>
  )
}

Role.propTypes = {
  role: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ role }) => ({ role }))(Role)
