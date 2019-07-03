var path = require('path');
const rootPath = path.resolve(__dirname, '../');
const isPro = process.env.NODE_ENV === 'production';
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    mode: 'production',
    entry: {
        commonVendor: ['lodash', 'moment', 'whatwg-fetch', 'qs', 'history'],
        reactVendor: ['react', 'react-dom', 'react-redux', 'react-router-redux', 'react-router-dom', 'redux', 'redux-thunk', 'react-loadable']
    },
    output: {
        path: path.join(rootPath, 'src/assets/dll'),
        filename: '[name].[hash:8].js',
        library: "[name]_[hash]"
    },
    optimization: {
        minimizer: [
            new UglifyJSPlugin({
                uglifyOptions: {
                    beautify: false,
                    compress: false,
                    comments: false,
                    drop_debugger: true,
                    drop_console: true
                }
            })
        ]
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(rootPath, "src/assets/dll", "[name]-manifest.json"),
            name: "[name]_[hash]"
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
    ]
}