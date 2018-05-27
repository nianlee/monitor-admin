import React from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import styles from '../style.less'

const dataSource = [{
  key: '1',
  pos: '渝北区',
  type: '类型一',
  time: '2018-02-02 12：53'
}, {
  key: '2',
  pos: '渝中区',
  type: '类型二',
  time: '2018-02-02 12：53'
}];

const columns = [{
  title: '设备位置',
  dataIndex: 'pos',
  className: styles.center,
  key: 'name',
}, {
  title: '故障类型',
  dataIndex: 'type',
  className: styles.center,
  key: 'type',
}, {
  title: '发生时间',
  dataIndex: 'time',
  className: styles.center,
  key: 'time',
}];

const Fault = ({ dashboard, dispatch }) => {
  const renderFooter = data => {
    return <a className={styles.more}>查看更多</a>
  }

  const renderTitle = data => {
    return <span className={styles.tableTitle}>故障设备列表</span>
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
  

Fault.propTypes = {
  dashboard: PropTypes.object,
  dispatch: PropTypes.func,
}

export default Fault