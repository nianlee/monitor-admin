import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Table,Popconfirm,Button } from 'antd'
import ShowModal from './components/ShowModal'
import { routerRedux } from 'dva/router'


const UserManage = ({ users,dispatch }) => {

  const { modalVisible } =  users
  //modal 属性
  const modalProps ={ //eslint-disable-line
    visible:modalVisible,
    maskClosable:false,
    title:'查看用户',
    wrapperClassName:"vertical-center-modal",
    width:720,
    onOk(data) {

    },
    onCancel() {
      dispatch({
        type:'users/hideAddModal'
      })
    },
  }

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

            <a href="javascript:;"
               onClick={()=>showUser(record)}
               style={{ marginLeft: 8 }}>查看</a>

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

  function showUser(record) {
    console.log(record)
    dispatch({
      type:'users/showAddModal',
    })
  }



  function deleteUserAction(id) {
    dispatch({
      type:'users/deleteUserInfo',
      payload:id
    })
  }
  /*

  function handleChange(value,key,column) {
    const newData = [ ...data];
    const target = newData.filter(item=>key === item.key)[0];
    if(target) {
      target[column] = value;
      this.setState({data:newData});
    }
  }

  function cancel(key) {
    const newData = [ ...data];
    const target = newData.filter(item=>key === item.key)[0];
    if(target) {
      Object.assign(target,this.cacheData.filter(item => key === item.key))[0];
      delete  target.editable;
      this.setState({data:newData});
    }
  }*/

  function handleAdd(key) {

  }

  return (
    <div>
      <Button type="primary" onClick={handleAdd}>添加</Button>
      <ShowModal {...modalProps}/>
      <Table bordered dataSource={UserList} columns={columns}/>
    </div>
  )
}

UserManage.propTypes = {
  users: PropTypes.object,
  dispatch:PropTypes.func,
}

export default connect(({ users }) => ({ users }))(UserManage)
