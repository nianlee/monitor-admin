import dva from 'dva'
import './index.less'
import createLoading from 'dva-loading'
import { routerRedux } from 'dva/router'
import { message } from 'antd'

// 1. Initialize
const app = dva({
  ...createLoading({
    effects: true
  }),
  onError(e, dispatch) {
    if (e.statusCode === 700) { // 登录授权失效
      dispatch(routerRedux.push('/login'))
      return
    }
    message.error(e.message, 3)
  },
});

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/app').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
