import React from 'react'
import PropTypes from 'prop-types'
import { Tabs } from 'antd'
import { connect } from 'dva'
import UsersTable from './components/UsersTable'
import DevicesTable from './components/DevicesTable'

const TabPane = Tabs.TabPane;

const Manage = ({ manage,dispatch }) => {

  const loadDeviceList = activeKey => {

    if(activeKey == 2) {
      console.log(activeKey)
      dispatch({
        type:'manage/queryDeviceList',
        payload:{
          installAddr:1
        }
      })
    }
  }

  return (
    <div>
      <Tabs type="card" onChange={loadDeviceList}>
        <TabPane tab="用户管理" key="1">
          <UsersTable/>
        </TabPane>

        <TabPane tab="设备管理" key="2">
          <DevicesTable/>
        </TabPane>

        <TabPane tab="维护策略" key="3">

        </TabPane>
      </Tabs>
    </div>
  )
}

Manage.propTypes = {
  manage: PropTypes.object,
  dispatch:PropTypes.func,
}

export default connect(({ manage }) => ({ manage }))(Manage)
