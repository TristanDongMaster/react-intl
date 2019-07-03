process.env.NODE_ENV = 'production';
process.env.HOT = false;
const webpack = require ('webpack');
const PATHS = require ('./PATHS');
const theme = require ('./antd-theme.js');
const HtmlWebpackPlugin = require ('html-webpack-plugin');
const CopyWebpackPlugin = require ('copy-webpack-plugin');
const CleanWebpackPlugin = require ('clean-webpack-plugin');
const UglifyJSPlugin = require ('uglifyjs-webpack-plugin');
const {BundleAnalyzerPlugin} = require ('webpack-bundle-analyzer');
const PreloadWebpackPlugin = require ('preload-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require ('script-ext-html-webpack-plugin');
const merge = require ('webpack-merge');
const baseWebpackConfig = require ('./webpack.base.conf');
const pkg = require ('../package.json');
const filePath = pkg.filePath;
// 预发和显示地址不一样，需要区分
let publicPath = pkg.betacdnPath;
let extra = [];

if (process.argv.includes ('--analyzer')) {
  extra.push (
    new BundleAnalyzerPlugin ({
      analyzerPort: 8919,
    })
  );
}
if (process.argv.includes ('--publish')) {
  publicPath = pkg.cdnPath; 
}

module.exports = merge (baseWebpackConfig, {
  mode: 'production',
  //devtool: '#source-map',
  entry: {
    index: PATHS.SRC.join ('index'),
  },
  output: {
    path: PATHS.BUILD.join (filePath),
    filename: `[name].[chunkhash:8].bundle.js`,
    chunkFilename: `[name].[chunkhash:8].chunk.js`,
    publicPath,
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        andt: {
          name: 'antd', // 单独将 andt 拆包
          priority: 200, // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
          test: /(antd)/,
        },
        commons: {
          name: 'commons',
          //chunks: 'async',// async,initial
          minChunks: 2,
          priority: -1,
        },
        vendor: {
          test: /node_modules/,
          //chunks: 'initial',
          name: 'vendor',
          priority: 10,
          enforce: true,
        },
        iconfont: {
          name: 'iconfont',
          test: /icons/,
          chunks: 'all',
          minChunks: 1,
          priority: 2000,
          reuseExistingChunk: true,
          enforce: true,
        },
      },
    },
    minimizer: [
      new UglifyJSPlugin ({
        parallel: true,
        cache: true,
        uglifyOptions: {
          beautify: false,
          compress: false,
          comments: false,
          drop_debugger: true,
          drop_console: true,
        },
        //sourceMap:true
      }),
    ],
  },
  plugins: [
    ...extra,
    new CleanWebpackPlugin (
      ['dist'], // 匹配删除的文件
      {
        root: PATHS.ROOT, // 根目录
      }
    ),
    new webpack.optimize.ModuleConcatenationPlugin (),
    new webpack.ContextReplacementPlugin (
      /moment[\/\\]locale$/,
      /zh-cn|en-us|th_th/
    ),
    new CopyWebpackPlugin ([
      {
        from: PATHS.ASSETS,
        to: '../',
        force: true,
      },
    ]),
    new HtmlWebpackPlugin ({
      template: PATHS.SRC.join ('index.html'),
      filename: '../../index.html',
      minify: {
        collapseWhitespace: false,
      },
      ts: new Date (),
      asset:'/assets',
    }),
    new ScriptExtHtmlWebpackPlugin ({
      defaultAttribute: 'defer',
    }),
    new PreloadWebpackPlugin ({
      rel: 'preload',
      include: ['iconfont', 'index', 'antd', 'vendor', 'commons'],
    }),
  ],
});
