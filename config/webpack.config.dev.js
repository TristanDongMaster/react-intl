process.env.NODE_ENV = 'development'
process.env.HOT = true
const webpack = require('webpack');
const PATHS = require('./PATHS');
const theme = require('./antd-theme.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const publicPath = '/static/';
const antdVendor = require('../src/assets/dll/antd-manifest.json')

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  entry: {
    index: ['webpack-hot-middleware/client?reload=true&overlayWarnings=true', PATHS.SRC.join('index')]
  },
  output: {
    path: PATHS.DIST,
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js',
    publicPath
  },
  plugins: [
    new webpack.DllReferencePlugin({
      manifest: antdVendor
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: PATHS.SRC.join(`index.html`),
      filename: 'index.html',
      minify: {
        collapseWhitespace: false
      },
      alwaysWriteToDisk: true,
      asset:'/src/assets',
      antd:`<script src='/src/assets/dll/antd.94eb8f7d.js' rel="preload"></script>`,
    }),
    new HtmlWebpackHarddiskPlugin({
      outputPath: PATHS.ROOT.join('temp')
    })
  ]
});
