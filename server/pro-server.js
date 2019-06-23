const express = require('express')
const app = express()
const { interface, config } = require('./base-server')

// 基本配置
config(app)
// 处理接口
interface(app)