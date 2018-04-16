import React from 'react'
import PropTypes from 'prop-types'
import { Tabs } from 'antd'
import { connect }from 'dva'

const TabPane = Tabs.TabPane

const TimeReport = ({ report, dispatch}) => {
  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="时间查询" key="1">Content of Tab Pane 1</TabPane>
      <TabPane tab="异常查询" key="2">Content of Tab Pane 2</TabPane>
      <TabPane tab="位置查询" key="3">Content of Tab Pane 3</TabPane>
      <TabPane tab="设备查询" key="3">Content of Tab Pane 3</TabPane>
    </Tabs>
  )
}

TimeReport.propTypes = {
  report: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ report }) => ({ report }))(TimeReport)
