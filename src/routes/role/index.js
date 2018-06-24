import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { Table } from 'antd'
import { connect } from 'dva'

import styles from './style.less'

const Role = ({ role, dispatch }) => {


  console.log('role',role.roleList)
  const columns = [{
    title: '角色名称',
    dataIndex: 'roleName',
    className: [styles.center],
    key: 'roleName',
  },{
    title: '角色描述',
    dataIndex: 'roleDesc',
    className: [styles.center],
    key: 'roleDesc',
  },{
    title: '状态',
    className: [styles.center],
    dataIndex: 'roleState',
    key: 'roleState',
  },{
    title: '创建时间',
    dataIndex: 'createTime',
    className: [styles.center],
    key: 'createDate',
  },{
    title: '操作',
    dataIndex: 'opertor',
    className: [styles.center],
    key: 'opertor',
    render: (text, record) => { // eslint-disable-line
      return (
        <div>
          <a onClick={add} className={styles.title}>新增</a>
          <a onClick={() => update(record)} className={styles.title}>修改</a>
        </div>
      )
    }
  }];

  const add = () => {
    dispatch(routerRedux.push(`/manage/role/1`))
  }

  const update = record => {
    dispatch(routerRedux.push(`/manage/role/2/${record.id}`))
  }

  function handleTableChange(pagination) {
    dispatch({ type: 'users/updatePagination', payload: pagination})
    dispatch({
      type:'users/queryUserList',
      payload:{
        page: pagination.current,
        rows: pagination.pageSize,
      }
    })
  }

  return (
    <div className="role" >
      <Table
        bordered
        columns={columns}
        dataSource={role.roleList}
        pagination={role.pagination}
        onChange={handleTableChange}
      />
    </div>
  )
}

Role.propTypes = {
  role: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ role }) => ({ role }))(Role)
