import React from 'react';
import * as AppConst from 'CONSTANTS/AppConst';
import Content from 'COMPONENTS/Layout/Content';
import Loadable from 'react-loadable';

// 页面加载Loading
function Loading () {
  return <Content spinning />;
}

const load = loaderFn =>
  Loadable ({
    loader: loaderFn,
    loading: () => <Loading />,
  });

// 页面路由访问路径
const base = AppConst.ROUTE_PATH;

const routeConfig = [
  {
    path: `${base}/index`,
    component: load (() =>
      import (/* webpackChunkName: "entrance" */ '../views/home/index')
    ),
  },
  {
    path: `${base}/404`,
    component: load (() =>
      import (/* webpackChunkName: "com404" */ '../views/common/Com404')
    ),
  },
  {
    path: `${base}/permissionDenied`,
    component: load (() =>
      import (
        /* webpackChunkName: "permissionDenied" */ '../views/common/PermissionDenied'
      )
    ),
  },
];

export default routeConfig;
