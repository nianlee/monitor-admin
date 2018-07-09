import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import { routerRedux } from 'dva/router'
import styles from '../style.less'

const columns = [
  {
    title: '设备sn',
    dataIndex: 'sn',
    className: styles.center,
    key: 'sn',
  },{
    title: '设备故障信息',
    dataIndex: 'alarm_info',
    className: styles.center,
    key: 'alarm_info',
},{
  title: '设备位置',
  dataIndex: 'detail_addr',
  className: styles.center,
  key: 'detail_addr',
}, {
  title: '设备类型',
  dataIndex: 'type',
  className: styles.center,
  key: 'type',
}];
  /*{
  title: '设备状态',
  dataIndex: 'state',
  className: styles.center,
  key: 'state',
  render: (text, record) => {
    if (record.state == 1) {
      return '在线'
    } else if (record.state == 0) {
      return '离线'
    } else {
      return '故障'
    }
  }*/


const Alarm = ({ dashboard, dispatch }) => {
  const goMore = () => {
    dispatch(routerRedux.push('/alarmlist'))
  }

  const renderFooter = () => {
    return <a className={styles.more} onClick={goMore}>查看更多</a>
  }

  const renderTitle = () => {
    return <span className={styles.tableTitle}>故障设备列表</span>
  }

  return (<div className={styles.tableWrapper}>
    <Table
      bordered
      columns={columns}
      dataSource={dashboard.alarmList}
      pagination={false}
      title={renderTitle}
      footer={renderFooter}
    />
  </div>)
}


Alarm.propTypes = {
  dashboard: PropTypes.object,
  dispatch: PropTypes.func,
}

export default Alarm
