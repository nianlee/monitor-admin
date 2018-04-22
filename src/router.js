import React from 'react'
import PropTypes from 'prop-types'
import { Router, Route, Switch, Redirect } from 'dva/router'
// import IndexPage from './routes/IndexPage'
import App from 'routes/app'
import dynamic from 'dva/dynamic'
import { LocaleProvider } from 'antd'
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import 'moment/locale/zh-cn'
import '@babel/polyfill'


const routes = [
  {
    path: '/dashboard',
    models: () => [import('./models/dashboard')],
    component: () => import('./routes/dashboard'),
  },
  {
    path: '/report',
    models: () => [import('./models/report')],
    component: () => import('./routes/report'),
  },
  {
    path: '/monitor',
    models: () => [import('./models/monitor')],
    component: () => import('./routes/monitor'),
  },
  {
    path: '/gis',
    models: () => [import('./models/gis')],
    component: () => import('./routes/gis'),
  },
  {
    // path: '/manage',
    // models: () => [import('./models/manage')],
    // component: () => import('./routes/manage'),
  }

]

function RouterConfig({ history, app }) {
  return (
    <Router history={history}>
      <LocaleProvider locale={zh_CN}>
        <App>
          <Switch>
            <Route path="/" exact render={() => (<Redirect to="/dashboard" />)} />
            {
              routes.map(({path, ...dynamics}, key) => (
                <Route key={key}
                  exact
                  path={path}
                  component={dynamic({
                    app,
                    ...dynamics
                  })}
                />
              ))
            }
          </Switch>
        </App>
      </LocaleProvider>
    </Router>
  )
}

RouterConfig.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default RouterConfig
