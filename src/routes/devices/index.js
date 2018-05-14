import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Table,Button,Popconfirm} from 'antd'


const DeviceManage = ({ devices,dispatch }) => {

  console.log("---------------");
  console.log(devices.dataSource);
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
      title:'删除',
      dataIndex:'删除',
      width:'10%',
      render: (text,record) => renderOperation(text,record),
    }
  ];

  function renderOperation(text,record) {

    console.log(record)
    return (
      devices.dataSource.length > 1 ?
        (
          <Popconfirm title="确定删除吗?" onConfirm={() => onDelete(record.key)}>
            <a href="javascript:;">删除</a>
          </Popconfirm>
        ) : null
    );
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


  //删除设备函数
  function onDelete(key) {

    dispatch({
      type:'manage/deleteDevice',
      payload:key,
    });
    //this.setState({dataSource:dataSource.filter(item => item.key != key)}); //筛选出不是这个元素的其他所有元素
  }


  //添加设备函数
  function handleAdd(){
    /*
    // 定义数据来源
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      设备名称:'add_name',
      sn:'55-66-77',
      地址:'关电园',
      设备厂商:'XXX公司',
      设备类型:'挂机设备',
      设备状态:'宕机'
    };

    this.setState({
      dataSource:[...dataSource,newData],
      count:count+1,
    });
    */
    console.log(devices.dataSource);
  }



  return (
    <div>
      <Button className="" onClick={handleAdd}>添加</Button>
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

