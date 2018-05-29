import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Table,Button,Popconfirm} from 'antd'
import { routerRedux } from 'dva/router'

const DeviceManage = ({ devices,dispatch }) => {

  const { modalVisible } =  devices
  //modal 属性
  const modalProps ={ //eslint-disable-line
    visible:modalVisible,
    maskClosable:false,
    title:'添加设备',
    wrapperClassName:"vertical-center-modal",
    width:720,
    onOk(data) {

    },
    onCancel() {
      dispatch({
        type:'devices/hideAddModal'
      })
    },
  }
  //定义列
  const columns =[
    {
      title:'设备名称',
      dataIndex:'name',
      key:'name',
      width:'10%',
    },
    {
      title:'设备sn编码',
      dataIndex:'sn',
      key:'sn',
      width:'10%',

    },
    {
      title:'地址',
      dataIndex:'detailAddr',
      key:'detailAddr',
      width:'10%',
    },
    {
      title:'设备厂商',
      dataIndex:'manufacturer',
      key:'manufacturer',
      width:'10%',
    },
    {
      title:'设备类型',
      dataIndex:'type',
      key:'type',
      width:'10%',
    },
    {
      title:'设备状态',
      dataIndex:'state',
      key:'state',
      width:'10%',
    },

    {
      title:'操作',
      dataIndex:'操作',
      width:'10%',
      render: (text,record) => renderOperation(text,record),
    }
  ];

  function renderOperation(text,record) {

    return (
      <div>
        <Popconfirm title="确定删除吗?" onConfirm={() => handleDelete(record.id)}>
          <a href="javascript:;">删除</a>
        </Popconfirm>

        <a href="javascript:;" style={{marginLeft:'5px'}} onClick={() => handleControl(record.id)}>控制</a>

        <a href="javascript:;" style={{marginLeft:'5px'}} onClick={() => handleControl(record.id)}>升级</a>
      </div>
        /*
        devices.dataSource.length > 1 ?
        (
        <Popconfirm title="确定删除吗?" onConfirm={() => onDelete(record.id)}>
          <a href="javascript:;">删除</a>
        </Popconfirm>
        ) : null
        */


    );
  }

  //添加设备函数
  function handleAdd(){
    dispatch(routerRedux.push('/adddevice'))
  }

  // 跳转到控制页面
  function handleControl(id) {
    dispatch({
      type:'devices/controlDevice',
      payload:id,
    })
  }

  //删除设备函数
  function handleDelete(id) {


    dispatch({
      type:'devices/deleteDevice',
      payload:id,
    });
    //this.setState({dataSource:dataSource.filter(item => item.key != key)}); //筛选出不是这个元素的其他所有元素
  }

  return (
    <div>
      <Button className="primary" onClick={handleAdd}>添加</Button>
      <Table bordered dataSource={devices.dataSource} columns={columns} />
    </div>

  );
}

DeviceManage.propTypes = {
  devices: PropTypes.object,
  dispatch:PropTypes.func,

}

export default connect(({ devices }) => ({ devices }))(DeviceManage)

