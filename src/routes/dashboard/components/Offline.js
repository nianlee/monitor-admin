import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import { routerRedux } from 'dva/router'
import styles from '../style.less'

const columns = [{
  title: '设备sn',
  dataIndex: 'sn',
  className: styles.center,
  key: 'sn',
},{
  title: '设备名称',
  dataIndex: 'name',
  className: styles.center,
  key: 'name',
},{
  title: '设备位置',
  dataIndex: 'detailAddr',
  className: styles.center,
  key: 'detailAddr',
}, {
  title: '设备类型',
  dataIndex: 'type',
  className: styles.center,
  key: 'type',
},
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
  }
}*/
];

const Offline = ({ dashboard, dispatch }) => {
  const goMore = () => {
    dispatch(routerRedux.push('/offlinelist'))
  }

  const renderFooter = () => {
    return <a className={styles.more} onClick={goMore}>查看更多</a>
  }

  const renderTitle = () => {
    return <span className={styles.tableTitle}>离线设备列表</span>
  }

  return (<div className={styles.tableWrapper}>
    <Table
      bordered
      columns={columns}
      dataSource={dashboard.offlineList}
      pagination={false}
      title={renderTitle}
      footer={renderFooter}
    />
  </div>)
}


Offline.propTypes = {
  dashboard: PropTypes.object,
  dispatch: PropTypes.func,
}

export default Offline
