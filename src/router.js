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
    path: '/onlinelist', // 在线设备列表
    component: () => import('./routes/dashboard/OnlineList'),
  },
  {
    path: '/alarmlist', // 警告设备列表
    component: () => import('./routes/dashboard/AlarmList'),
  },
  {
    path: '/offlinelist', // 离线设备列表
    component: () => import('./routes/dashboard/OfflineList'),
  },
  {
    path: '/report',
    models: () => [import('./models/report')],
    component: () => import('./routes/report'),
  },
  {
    path: '/adddevice',
    models: () => [import('./models/adddevice')],
    component: () => import('./routes/adddevice'),
  },
  {
    path: '/controldevice/:sn',
    models: () => [import('./models/controldevice')],
    component: () => import('./routes/controldevice'),
  },
  {
    path: '/gis',
    models: () => [import('./models/gis')],
    component: () => import('./routes/gis'),
  },
  {
    path: '/login',
    models: () => [import('./models/login')],
    component: () => import('./routes/login'),
  },
  {
    path: '/region',
    models: () => [import('./models/region')],
    component: () => import('./routes/region'),
  },
  {
    path: '/usermanage',
    models: () => [import('./models/users')],
    component: () => import('./routes/users'),
  },
  {
    path: '/adduser',
    models: () => [import('./models/adduser')],
    component: () => import('./routes/adduser'),
  },
  {
    path: '/modifyuser/:id/:userName/:userPw/:roleId/:realName/:phone/:email/:jobNum/:state/:areaId',
    models: () => [import('./models/modifyuser')],
    component: () => import('./routes/modifyuser'),
  },
  {
    path: '/devicemanage',
    models: () => [import('./models/devices')],
    component: () => import('./routes/devices'),
  },
  {
    path: '/updatedevice/:sn',
    models: () => [import('./models/updatedevice')],
    component: () => import('./routes/updatedevice'),
  },
  {
    path: '/manage/role',
    models: () => [import('./models/role')],
    component: () => import('./routes/role'),
  },
  {
    path: '/manage/role/:type',
    models: () => [import('./models/addOrUpdateRole')],
    component: () => import('./routes/role/AddOrUpdate'),
  },
  {
    path: '/manage/role/:type/:id',
    models: () => [import('./models/addOrUpdateRole')],
    component: () => import('./routes/role/AddOrUpdate'),
  },

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
