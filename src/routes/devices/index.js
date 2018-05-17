import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Table,Button,Popconfirm,Modal} from 'antd'


const DeviceManage = ({ devices,dispatch }) => {

  const state = {visiable : false}
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
    console.log(record.id)
    return (
      devices.dataSource.length > 1 ?
        (
          <Popconfirm title="确定删除吗?" onConfirm={() => onDelete(record.id)}>
            <a href="javascript:;">删除</a>
          </Popconfirm>
        ) : null
    );
  }

  //添加设备函数
  function handleAdd(){
    console.log("handle add")
    state.visiable = true;

  }


  //删除设备函数
  function onDelete(id) {

    dispatch({
      type:'devices/deleteDevice',
      payload:id,
    });
    //this.setState({dataSource:dataSource.filter(item => item.key != key)}); //筛选出不是这个元素的其他所有元素
  }

  /*
  //一行数据变化函数
  function onCellChange (key,dataIndex){
    return (value)=>{
      const dataSource = [...this.state.dataSource]; //赋值数据
      const target = dataSource.find(item => item.key === key); // 根据index找到改变的item
      if(target) { //如果找到了
        target[dataIndex] = value;
        this.setState({ dataSource }); // 更新数据源
      }
    }
  }
  */






  return (
    <div>
      <Button className="primary" onClick={handleAdd}>添加</Button>
      <span>
          <Modal
            visible={state.visiable}
            title="title"
          >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>

        </Modal>
      </span>
      <Table bordered dataSource={devices.dataSource} columns={columns} />
    </div>

  );
}

  /*
  const loadDeviceList = activeKey => {

    if(activeKey == 2) {
      console.log(activeKey)
      dispatch({
        type:'manage/queryDeviceList',
        payload:{
          installAddr:1
        }
      })
    }
  }*/

DeviceManage.propTypes = {
  devices: PropTypes.object,
  dispatch:PropTypes.func,

}

export default connect(({ devices }) => ({ devices }))(DeviceManage)

