import React, { Component } from 'react'
import styles from './style.less'
import { Table, message } from 'antd'
import { queryOfflineDevices } from 'services/dashboard'

const columns = [{
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
}, {
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
}];

class OfflineList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      pagination: {
        current: 1,
        pageSize: 10,
        total: 0,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total) => `共${total}条数据`
      },
      offlineList: [],
    }

    this.paginationChange(this.state.pagination)
  }

  paginationChange(pagination) {
    queryOfflineDevices({
      page: pagination.current,
      rows: pagination.pageSize
    }).then(res => {
      if (res.success) {
        const offlineList = res.data.rows.map(item => {
          item.key = item.id
          return item
        })

        this.setState({
          pagination: {
            ...pagination,
            total: res.data.total,
          },
          offlineList
        })
      } else {
        message.error(res.message)
      }
    })
  }

  render() {
    const renderTitle = () => {
      return <span className={styles.tableTitle}>在线设备列表</span>
    }
  
    return (<div className={styles.tableWrapper}>
      <Table 
        bordered
        columns={columns} 
        dataSource={this.state.offlineList}
        pagination={this.state.pagination}
        title={renderTitle}
        onChange={this.paginationChange.bind(this)}
      />
    </div>)
  }
}

export default OfflineList