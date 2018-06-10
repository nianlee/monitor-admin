/* eslint-disable-next-line */
import React from 'react'
import PropTypes from 'prop-types'
import NProgress from 'nprogress'

import { connect } from 'dva'
import { withRouter } from 'dva/router'
import { Layout, /*Breadcrumb*/ } from 'antd'
import MHeader from 'components/layout/Header'
import Loader from 'components/loader/Loader'

const { Content } = Layout

const App = ({
  children, dispatch, app, loading, location
}) => {

  const { href } = window.location
  let lastHref

  const { pathname } = location

  // 加载nprogress
  if (lastHref !== href) {
    NProgress.start()
    if (!loading.global) {
      NProgress.done()
      lastHref = href
    }
  }

  // 用loginLayout 接受router 子组件
  const LoginLayout = ({children}) => (children)

  if (pathname === '/login') {
    return <LoginLayout>{children}</LoginLayout>
  }

  const mHeaderProps = {
    app,
    location,
    dispatch,
  }

  return (
    <div>
      <Loader fullscreen spinning={loading.effects['app/query']} />
      <Layout className="layout">
          <MHeader {...mHeaderProps} />
          <Content style={{ padding: '20px 50px' }}>
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

export default withRouter(connect(({ app, loading, login }) => ({ app, loading }))(App))
