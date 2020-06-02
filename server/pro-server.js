const express = require('express')
const app = express()
const { interface, config } = require('./base-server')
const { initArticleConfig } = require('./utils/article')

initArticleConfig() // 初始化数据库相关配置
config(app) // 基本配置
interface(app) // 处理接口