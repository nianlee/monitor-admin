import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { Table } from 'antd'
import { connect } from 'dva'

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
          <a onClick={add}>新增</a>
          <a style={{ marginLeft: 5 }} onClick={() => update(record)}>修改</a>
        </div>
      )
    }
  }];

  const add = () => {
    dispatch(routerRedux.push('/manage/role/1'))
  }

  const update = record => {
    dispatch(routerRedux.push(`/manage/role/2/${record.id}`))
  }

  return (
    <div style={{ backgroundColor: '#fff' }}>
      <Table 
        columns={columns}
        dataSource={role.roleList}
      />
    </div>
  )
}

Role.propTypes = {
  role: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ role }) => ({ role }))(Role)
