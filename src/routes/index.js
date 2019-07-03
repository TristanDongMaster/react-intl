import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import * as AppConst from 'CONSTANTS/AppConst';
import routeConfig from './config';

// 页面路由访问路径
const base = AppConst.ROUTE_PATH;

export default () => (
  <Switch>
    {routeConfig.map ((item, index) => (
      <Route
        key={index}
        path={item.path}
        component={item.component}
        exact={item.exact}
      />
    ))}
    <Redirect from="*" to={`${base}/404`} />
  </Switch>
);
