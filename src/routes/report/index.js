import React from 'react'
import PropTypes from 'prop-types'
import { Tabs } from 'antd'
import { connect } from 'dva'

import TimeReport from './components/TimeReport'

const TabPane = Tabs.TabPane

const Report = ({ report, dispatch }) => {

  return (
    <Tabs defaultActiveKey="1">
      <TabPane tab="时间查询" key="1"><TimeReport dispatch={dispatch} report={report} /></TabPane>
      <TabPane tab="异常查询" key="2">Content of Tab Pane 2</TabPane>
      <TabPane tab="位置查询" key="3">Content of Tab Pane 3</TabPane>
      <TabPane tab="设备查询" key="4">Content of Tab Pane 3</TabPane>
    </Tabs>
  )
}

Report.propTypes = {
  report: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ report }) => ({ report }))(Report)
