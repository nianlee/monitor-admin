/*
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
        type:'manage/queryDevices',
        payload:{
          installAddr:1
        }
      })
    }

    if(activeKey == 1) {
      console.log(activeKey)
    }
  }

  return (
    <div>
      <Tabs type="card" onChange={loadDeviceList}>
        <TabPane tab="用户管理" key="1">
          <UsersTable manage={manage} dispatch={dispatch}/>
        </TabPane>

        <TabPane tab="设备管理" key="2">
          <DevicesTable manage={manage} dispatch={dispatch}/>
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
*/
