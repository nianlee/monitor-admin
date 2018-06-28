import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Table,Button,Popconfirm} from 'antd'
import ShowDeviceModal from './components/ShowDeviceModal'
import { routerRedux } from 'dva/router'
//import styles from './style.less'

const DeviceManage = ({ devices,dispatch }) => {

  const { modalVisible } =  devices
  //modal 属性
  const modalProps ={ //eslint-disable-line
    item:devices.deviceInfos,
    dynamic:devices.deviceDynamicDTOS,
    visible:modalVisible,
    maskClosable:false,
    title:'设备详情',
    wrapperClassName:"vertical-center-modal",
    width:1024,
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

        <Popconfirm title="确定删除吗?" onConfirm={() => onDelete(record.id)}>
          <a href="javascript:;">删除</a>
        </Popconfirm>

        <a href="javascript:;"
           onClick={()=>controlDevice(record.sn)}
           style={{ marginLeft: 8 }}>控制</a>

        <a href="javascript:;"
           onClick={()=>updateDevice(record.sn)}
           style={{ marginLeft: 8 }}>升级</a>

        <a href="javascript:;"
           onClick={()=>checkDevice(record.sn)}
           style={{ marginLeft: 8 }}>查看</a>
      </div>
    );
  }

  function controlDevice(sn) {
    dispatch(routerRedux.push(`/controlDevice/${sn}`));
  }

  function updateDevice(sn) {
    dispatch(routerRedux.push(`/updatedevice/${sn}`));
  }

  // 设备查看
  function checkDevice(sn) {
    //console.log(sn)
    dispatch({
      type:'devices/queryDeviceInfos',
      payload:sn,
    })
  }

  //添加设备函数
  function handleAdd(){
    console.log('handleAdd')
    dispatch(routerRedux.push('/adddevice'));
  }

  //删除设备函数
  function onDelete(id) {

    dispatch({
      type:'devices/deleteDevice',
      payload:{id:id},
    });
  }

  // 分页请求
  function handlePage(pagination) {

    dispatch({ type: 'devices/updatePagination', payload: pagination})
    dispatch({
      type:'devices/queryDeviceList',
      payload:{
        page: pagination.current,
        rows:  pagination.pageSize,
      }
    })
  }

  return (
    <div className="devices">
      <Button type="primary" onClick={handleAdd}>添加</Button>
      <ShowDeviceModal {...modalProps}/>
      <Table bordered dataSource={devices.dataSource} columns={columns} pagination={devices.pagination} onChange={handlePage}/>
    </div>

  );
}

DeviceManage.propTypes = {
  devices: PropTypes.object,
  dispatch:PropTypes.func,

}

export default connect(({ devices }) => ({ devices }))(DeviceManage)

