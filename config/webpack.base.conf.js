const webpack = require('webpack')
const PATHS = require('./PATHS');
const theme = require('./antd-theme.js')
const WebpackBar = require('webpackbar');
const reactVendor = require('../src/assets/dll/reactVendor-manifest.json')
const commonVendor = require('../src/assets/dll/commonVendor-manifest.json')

module.exports = {
    plugins: [
        new WebpackBar(),
        new webpack.DllReferencePlugin({
            manifest: commonVendor
        }),
        new webpack.DllReferencePlugin({
            manifest: reactVendor
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: false
                    }
                },
                exclude: /node_modules/,
                include: PATHS.ROOT
            },
            {
                test: /\.css?$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.less/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            modifyVars: theme,
                            sourceMap: true,
                        }
                    }
                ]
            },
            {
                test: /\.(woff|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: ['base64-font-loader']
            },
            {
                test: /\.(png|jpg|gif)$/,
                //use: ['url-loader?limit=1']
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]'
                        }
                    }]
            }
        ]
    },
    resolve: {
        alias: {
            ROOT: PATHS.ROOT,
            DIST: PATHS.DIST,
            // 自定义路径别名
            MOCK: PATHS.MOCK,
            ASSETS: PATHS.SRC.join('assets'),
            COMPONENTS: PATHS.SRC.join('components'),
            MODULES: PATHS.SRC.join('modules'),
            ACTIONS: PATHS.SRC.join('actions'),
            REDUCERS: PATHS.SRC.join('reducers'),
            LIBS: PATHS.SRC.join('libs'),
            SERVICES: PATHS.SRC.join('services'),
            CONSTANTS: PATHS.SRC.join('constants'),
            LOCALES: PATHS.SRC.join('locales'),
            STYLESHEETS: PATHS.SRC.join('stylesheets'),
            VIEWS: PATHS.SRC.join('views'),
            STORE: PATHS.SRC.join('store'),
        },
        extensions: ['.js', '.jsx', '.less']
    }
}
