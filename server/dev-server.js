const express = require('express')
const webpack = require('webpack')
const webpackConfig = require('../build/webpack.dev')
const { interface, config } = require('./base-server')
const compiler = webpack(webpackConfig)
const app = express()

app.use(require('webpack-hot-middleware')(compiler))
app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    stats: {
        colors: true
    }
}))

// 基本配置
config(app)
// 处理接口
interface(app)