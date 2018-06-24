import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Table, Popconfirm, Button} from 'antd'
import { routerRedux } from 'dva/router'
import ShowDeviceModal from './components/ShowDeviceModal'
import styles from './style.less'


const firmwareManage = ({ firmware,dispatch }) => {

  const columns = [
    {
      title:'序号',
      dataIndex:'index',
      className: styles.center,
      width:'5%',
    },
    {
      title:'固件名称',
      dataIndex:'firmwareName',
      className: styles.center,
      width:'10%',
    },
    {
      title:'固件描述',
      dataIndex:'firmwareDesc',
      className: styles.center,
      width:'10%',
    },
    {
      title:'固件版本',
      dataIndex:'firmwareVersion',
      className: styles.center,
      width:'15%',
    },
    {
      title:'硬件版本',
      dataIndex:'hardwareVersion',
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
            <a href="javascript:;"
               onClick={()=>checkFirmwareInfo(record.id)}
               style={{ marginLeft: 8 }}>查看</a>

            <Popconfirm title="确定删除吗?" onConfirm={() => deleteFirmwareAction(record.id)}>
              <a style={{ marginLeft: 8 }}>删除</a>
            </Popconfirm>
          </div>
        )
      },
    },
  ];

  //modal 属性
  const modalProps ={ //eslint-disable-line
    item:firmware.firmwareInfos,
    visible:firmware.modalVisible,
    maskClosable:false,
    title:'固件详情',
    wrapperClassName:"vertical-center-modal",
    width:1024,
    onOk(data) {
      dispatch({
        type:'firmware/hideAddModal'
      })
    },
    onCancel() {
      dispatch({
        type:'firmware/hideAddModal'
      })
    },
  }

  // 固件查看
  function checkFirmwareInfo(id) {
    console.log('id',id)
    dispatch({
      type:'firmware/queryFirmwaresInfo',
      payload:{id},
    })
  }

  function deleteFirmwareAction(id) {
    dispatch({
      type:'firmware/deleteFirmware',
      payload: { id },
    })
  }

  function handleAdd() {
    dispatch(routerRedux.push('/AddFirmware'));
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
    <div className="users">
      <Button type="primary" onClick={handleAdd} className={styles.addBtn}>添加</Button>
      <ShowDeviceModal {...modalProps}/>
      <Table
        bordered
        dataSource={firmware.firmwareList}
        columns={columns}
        pagination={firmware.pagination}
        onChange={handleTableChange}
      />
    </div>
  )
}

firmwareManage.propTypes = {
  firmware: PropTypes.object,
  dispatch:PropTypes.func,
  selectUser:PropTypes.object
}

export default connect(({ firmware }) => ({ firmware }))(firmwareManage)
