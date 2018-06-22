import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Table, Popconfirm, Button } from 'antd'
import { routerRedux } from 'dva/router'
import styles from './style.less'

const UserManage = ({ users,dispatch }) => {

  const columns = [
    {
      title:'序号',
      dataIndex:'index',
      className: styles.center,
      width:'5%',
    },
    {
      title:'用户名',
      dataIndex:'userName',
      className: styles.center,
      width:'10%',
    },
    {
      title:'电话',
      dataIndex:'phone',
      className: styles.center,
      width:'10%',
    },
    {
      title:'角色',
      dataIndex:'roleName',
      className: styles.center,
      width:'15%',
    },
    {
      title:'区域',
      dataIndex:'areaName',
      className: styles.center,
      width:'15%',
    },
    {
      title:'操作',
      dataIndex:'operation',
      width:'15%',
      className: styles.center,
      render: (text, record) => { // eslint-disable-line
        return (
          <div>
            <a onClick={() => edit(record)}>修改</a>
            <Popconfirm title="确定删除吗?" onConfirm={() => deleteUserAction(record.id)}>
              <a style={{ marginLeft: 8 }}>删除</a>
            </Popconfirm>
          </div>
        )
      },
    },
  ];

  function edit(record) {
    dispatch(routerRedux.push(`/addorupdateuser/${record.id}`));
  }

  function deleteUserAction(id) {
    dispatch({
      type:'users/deleteUserInfo',
      payload: { id },
    })
  }

  function handleAdd() {
    dispatch(routerRedux.push('/addorupdateuser'));
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
    <div>
      <Button type="primary" onClick={handleAdd} className={styles.addBtn}>添加</Button>
      <Table
        bordered
        dataSource={users.userList}
        columns={columns}
        pagination={users.pagination}
        onChange={handleTableChange}
      />
    </div>
  )
}

UserManage.propTypes = {
  users: PropTypes.object,
  dispatch:PropTypes.func,
  selectUser:PropTypes.object
}

export default connect(({ users }) => ({ users }))(UserManage)
