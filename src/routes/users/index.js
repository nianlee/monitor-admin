import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Table,Popconfirm,Button } from 'antd'
import ShowUserModal from './components/ShowUserModal'
import { routerRedux } from 'dva/router'


const UserManage = ({ users,dispatch }) => {

  console.log('userListInfo',users.userListInfo.length)

  // 分页器
  const pagination = {}
  pagination.defaultCurrent = users.currentPage
  pagination.total = users.total
  pagination.pageSize = users.pageSize

  const UserList = [];
  let i = 0;
  for(let u of users.userListInfo) {
    i++
    UserList.push({
      id:u.id,
      index:i.toString(),
      userName:u.userName,
      userPw:u.userPw,
      roleId:u.roleId,
      realName:u.realName,
      roleName:u.roleName,
      phone:u.phone,
      email:u.email,
      jobNum:u.jobNum,
      state:u.state,
      areaId:u.areaId,
      areaName:u.areaName[0]
    })
  }

  const columns = [
    {
      title:'序号',
      dataIndex:'index',
      width:'5%',
    },
    {
      title:'用户名',
      dataIndex:'userName',
      width:'10%',
    },
    {
      title:'电话',
      dataIndex:'phone',
      width:'10%',
    },
    {
      title:'角色',
      dataIndex:'roleName',
      width:'15%',
    },
    {
      title:'区域',
      dataIndex:'areaName',
      width:'15%',
    },
    {
      title:'操作',
      dataIndex:'operation',
      width:'15%',
      render: (text,record) => renderOperation(text,record),
    },
  ];

  // operation
  function renderOperation(text,record) {

    return (
      UserList.length > 1 ?
        (
          <div>

            <a href="javascript:;"
               onClick={()=>edit(record)}>修改</a>

            <ShowUserModal selectUser={record}/>

            <Popconfirm title="确定删除吗?" onConfirm={() => deleteUserAction(record.id)}>
              <a href="javascript:;" style={{ marginLeft: 8 }}>删除</a>
            </Popconfirm>
          </div>
        ) : null
    )
  }

  function edit(key) {
    console.log(key)
    dispatch(routerRedux.push(`/modifyuser/${key.id}/${key.userName}/${key.userPw}/${key.roleId}/${key.realName}/${key.phone}/${key.email}/${key.jobNum}/${key.state}/${key.areaId}`));
  }

  function deleteUserAction(id) {
    console.log('deleteUserAction',id)
    dispatch({
      type:'users/deleteUserInfo',
      payload:{id:id},
    })
  }

  function handleAdd(key) {
    dispatch(routerRedux.push(`/adduser`));
  }

  function handleTableChange(pagination) {
    console.log('pagination',pagination)

    dispatch({
      type:'users/queryUserList',
      payload:{
        searchCom: '',
        page: pagination.current,
        row:  pagination.total,
      }
    })
  }

  return (
    <div>
      <Button type="primary" onClick={handleAdd}>添加</Button>
      <Table bordered dataSource={UserList} columns={columns} pagination={pagination} onChange={handleTableChange}/>
    </div>
  )
}

UserManage.propTypes = {
  users: PropTypes.object,
  dispatch:PropTypes.func,
  selectUser:PropTypes.object
}

export default connect(({ users }) => ({ users }))(UserManage)
