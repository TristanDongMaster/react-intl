// import 'babel-polyfill'
import React from 'react';
import {render} from 'react-dom';
import App from './views/App';
import {Provider} from 'react-redux';
import {Route} from 'react-router-dom';
import {ConnectedRouter} from 'react-router-redux';
import history from './routes/history';
import 'STYLESHEETS/style.less';
import 'babel-core/register';
import Intl from 'COMPONENTS/Intl';
// 注意，不要直接这样做，要区分开发环境和生产环境
import DevTools from './store/middleware/DevTools';
import store from 'STORE'

require ('es6-promise').polyfill ();

window.NProgress && window.NProgress.inc ();
// const routerState = applyMiddleware (routerMiddleware (history));
// const store = configureStore (routerState);
const isShowDevTool = false;

render (
  <Provider store={store}>
    <Intl>
      <React.Fragment>
        <ConnectedRouter history={history}>
          <Route path="/" component={App} />
        </ConnectedRouter>
        {process.env.NODE_ENV !== 'production' && isShowDevTool && <DevTools />}
      </React.Fragment>
    </Intl>
  </Provider>,
  document.getElementById ('root')
);
