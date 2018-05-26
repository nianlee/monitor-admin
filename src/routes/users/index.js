import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Table,Popconfirm,Button } from 'antd'
import ShowModal from './components/ShowModal'


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

  const data = [];
  for (let i = 0;i<100;i++) {
    data.push({
      序号:i.toString(),
      用户名:'wdy ${i}',
      部门:'运维 ${i}部',
      权限:'权限 ${i}'});
  }

  const columns = [
    {
      title:'序号',
      dataIndex:'序号',
      width:'25%',
      //render:(text,record)=> renderColumns(text,record,'序号'),
    },
    {
      title:'用户名',
      dataIndex:'用户名',
      width:'15%',
      //render:(text,record) => renderColumns(text,record,'用户名'),
    },
    {
      title:'部门',
      dataIndex:'部门',
      width:'15%',
      //render:(text,record) => renderColumns(text,record,'部门'),
    },
    {
      title:'权限',
      dataIndex:'权限',
      width:'15%',
      //render:(text,record) => renderColumns(text,record,'权限'),
    },
    {
      title:'操作',
      dataIndex:'操作',
      render: (text,record) => renderOperation(text,record),
    },
  ];

  // operation
  function renderOperation(text,record) {
    return (
      data.length > 1 ?
        (
          <div>

            <a href="javascript:;"
               onClick={()=>edit(record.id)}>修改</a>

            <a href="javascript:;"
               onClick={()=>showUser(record)}
               style={{ marginLeft: 8 }}>查看</a>

            <Popconfirm title="确定删除吗?">
              <a href="javascript:;" style={{ marginLeft: 8 }}>删除</a>
            </Popconfirm>
          </div>
        ) : null
    )
  }

  function edit(key) {
    const newData = [ ...data];
    const target = newData.filter(item=>key === item.key)[0];
    if(target) {
      target.editable = true;
      this.setState({data:newData});
    }
  }

  function showUser(record) {
    console.log(record)
    dispatch({
      type:'users/showAddModal',
    })
  }


  /*
  function renderColumns(text,record,column) {
    return (
      <EditableCell
        editable={record.editable}
        value={text}
        onChange={value=>handleChange(value,record.key,column)}
      />
    );
  }

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
      <Table bordered dataSource={data} columns={columns}/>
    </div>
  )
}

UserManage.propTypes = {
  users: PropTypes.object,
  dispatch:PropTypes.func,
}

export default connect(({ users }) => ({ users }))(UserManage)
