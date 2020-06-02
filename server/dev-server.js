const express = require('express')
const webpack = require('webpack')
const webpackConfig = require('../build/webpack.dev')
const compiler = webpack(webpackConfig)
const app = express()
const { interface, config } = require('./base-server')
const { initArticleConfig } = require('./utils/article')

app.use(require('webpack-hot-middleware')(compiler))
app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    stats: {
        colors: true
    }
}))

initArticleConfig() // 初始化数据库相关配置
config(app) // 基本配置
interface(app) // 处理接口