import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import App from 'routes/App'

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <App>
        <Switch>
          <Route path="/" exact component={IndexPage} />
        </Switch>
      </App>
      
    </Router>
  );
}

export default RouterConfig;
