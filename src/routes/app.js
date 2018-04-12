/* eslint-disable-next-line */
import React from 'react'
import PropTypes from 'prop-types'
// import NProgress from 'nprogress'

import { connect } from 'dva'
import { withRouter } from 'dva/router'
import { Layout, /*Breadcrumb*/ } from 'antd'
import MHeader from 'components/layout/Header'

const { Content } = Layout

const App = ({
  children, dispatch, app, loading, location,
}) => {

  const mHeaderProps = {
    app,
  }

  return (
    <div>
     <Layout className="layout">
        <MHeader {...mHeaderProps} />
        <Content style={{ padding: '0 50px' }}>
          {/* <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb> */}
          {children}
        </Content>
      </Layout>
    </div>
  )
}

App.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  app: PropTypes.object,
  loading: PropTypes.object,
}

export default withRouter(connect(({ app, loading }) => ({ app, loading }))(App))
