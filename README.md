## 介绍

    技术栈：webpack v4 + react v16.3.2 + mc-intl + react-route v4 + antd v3 + redux 
    功能模块：
      1. 单页面&支持开发热更新
      2. 提供本地mock服务
      3. 提供proxy代理服务
      4. 自动部署代码
      6. 上线版本控制，可以增量发布
      7. 引入antd，按需加载，支持本地化字体和主题定制
      8. 引入eslint，自动校验开发代码，错误代码无法提交commit

## 开发启动

 ``` 
    安装模块：cnpm i
``` 
``` 
    开发启动：npm run dev
``` 

## 其他命令
    
    代码检查：npm run precommit (需要先git add .)
    生成build代码：npm run build（本地打包使用，无使用场景）
    build代码包分析：npm run analyzer（代码分析）
    更新dll：npm run dll(更新完成后，需要手动更新index.html相关dll文件地址)

## 测试环境部署

    build代码会自动部署到（test分支）代码仓库
    npm run deploy 

## 生产上线部署 

    build代码会自动部署到（master分支）代码仓库，并且cdn地址替换成线上地址
    npm run publish

## 功能使用

### 目录介绍

    COMPONENTS：通用UI组件
    SERVICES：api服务集合
    CONSTANTS：常量配置等
    MODULES：通用方法
    ASSETS:通用资源
    mockService：本地开发模拟服务器
    config:webpack打包&node服务配置
    dist:打包目录


### 页面导航&菜单栏&部署

    import Layout from 'COMPONENTS/Layout'

    export default class App extends React.Component
      render() {
        const { children} = this.props
        var data ={
          userName:'',
          menuList:[],
          currentUrlId:'',
          hideNavList:['/pages/login','/pages/register']
        }
        return (
          <Layout data={data}>
            {children}
          </Layout>
        )
      }
    }

### 通用模块引入

    // webpack已兼容处理，无需引入完整路径
    import Layout from 'COMPONENTS/Layout'
    import * as IndexService from 'SERVICES/index'
    import * as AppConst from 'CONSTANTS/AppConst'
    import * as Modules from 'MODULES/fetch'

### UI组件异步加载

    import Loadable from 'react-loadable';
    import Loading from './my-loading-component';

    const LoadableComponent = Loadable({
      loader: () => import('./my-component/index.js'),
      loading: Loading,
    });

    export default class App extends React.Component {
      render() {
        return <LoadableComponent/>;
      }
    }

### 页面跳转

    // 兼容单页面和多页面跳转
    import {locationHref} from 'MODULES/utils'

    // 单页面
    locationHref('/page/home',{test:'002'},['otherParameterInCurrentPage'])

    // 多页面
    locationHref('http://host/page/home',{test:'002'})
