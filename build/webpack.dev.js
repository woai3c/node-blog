const merge = require('webpack-merge')
const webpack = require('webpack')
const webpackBaseConfig = require('./webpack.base.js')
const path = require('path')

module.exports = merge(webpackBaseConfig, {
    mode: 'development',
    entry: {
        app: ['webpack-hot-middleware/client?reload=true' , './client/main.js'] // 开启热模块更新
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
    ],
    output: {
        filename: '[name].[hash].js',
        chunkFilename: '[name].[hash].js',
        path: path.resolve(__dirname, '../dist'),
    },
})