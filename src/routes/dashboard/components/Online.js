import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import styles from '../style.less'

const dataSource = [{
  key: '1',
  pos: '渝北区',
  type: '类型一',
  state: '状态一'
}, {
  key: '2',
  pos: '渝中区',
  type: '类型二',
  state: '状态二'
}];

const columns = [{
  title: '设备位置',
  dataIndex: 'pos',
  className: styles.center,
  key: 'name',
}, {
  title: '设备类型',
  dataIndex: 'type',
  className: styles.center,
  key: 'type',
}, {
  title: '设备状态',
  dataIndex: 'state',
  className: styles.center,
  key: 'state',
}];

const Online = ({ dashboard, dispatch }) => {
  const renderFooter = data => {
    return <a className={styles.more}>查看更多</a>
  }

  const renderTitle = data => {
    return <span className={styles.tableTitle}>在线设备列表</span>
  }

  return (<div className={styles.tableWrapper}>
    <Table 
      bordered
      columns={columns} 
      dataSource={dataSource}
      pagination={false}
      title={renderTitle}
      footer={renderFooter}
    />
  </div>)
}
  

Online.propTypes = {
  dashboard: PropTypes.object,
  dispatch: PropTypes.func,
}

export default Online