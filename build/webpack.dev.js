const merge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base.js')

module.exports = merge(webpackBaseConfig, {
    mode: 'development',
    entry: {
        app: ['webpack-hot-middleware/client?reload=true' , './src/main.js'] // 开启热模块更新
    },
})