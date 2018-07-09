import React, { Component } from 'react'
import styles from './style.less'
import { Table, message } from 'antd'
import { queryAlarmDevices } from 'services/dashboard'

const columns = [
  {
    title: '设备sn',
    dataIndex: 'sn',
    className: styles.center,
    key: 'sn',
  },
  {
  title: '设备预警信息',
  dataIndex: 'alarm_info',
  className: styles.center,
  key: 'alarm_info',
},{
  title: '预警开始时间',
  dataIndex: 'alarm_start_time',
  className: styles.center,
  key: 'alarm_start_time',
},{
    title: '预警结束时间',
    dataIndex: 'alarm_end_time',
    className: styles.center,
    key: 'alarm_end_time',
    width:'20%',
  },{
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

class AlarmList extends Component {
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
      alarmList: [],
    }

    this.paginationChange(this.state.pagination)
  }

  paginationChange(pagination) {
    queryAlarmDevices({
      page: pagination.current,
      rows: pagination.pageSize
    }).then(res => {
      if (res.success) {
        const alarmList = res.data.rows.map(item => {
          item.key = item.id
          return item
        })

        this.setState({
          pagination: {
            ...pagination,
            total: res.data.total,
          },
          alarmList,
        })
      } else {
        message.error(res.message)
      }
    })
  }

  render() {
    const renderTitle = () => {
      return <span className={styles.tableTitle}>警告列表</span>
    }

    return (<div className="alarm">
      <Table
        bordered
        columns={columns}
        dataSource={this.state.alarmList}
        pagination={this.state.pagination}
        title={renderTitle}
        onChange={this.paginationChange.bind(this)}
      />
    </div>)
  }
}


export default AlarmList
