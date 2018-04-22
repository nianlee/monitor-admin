import React from 'react'
import PropTypes from 'prop-types'
import { Tabs } from 'antd'
import { connect } from 'dva'
import UsersTable from './components/UsersTable'

const TabPane = Tabs.TabPane;

const Manage = ({
  app,
}) => {

  return (
    <div>
      <Tabs type="card">
        <TabPane tab="用户管理" key="1">
          <UsersTable/>
        </TabPane>

        <TabPane tab="设备管理" key="2">
        </TabPane>

        <TabPane tab="维护策略" key="3">
        </TabPane>
      </Tabs>
    </div>
  )
}

Manage.propTypes = {
  app: PropTypes.object,
}

export default connect(({ app }) => ({ app }))(Manage)
