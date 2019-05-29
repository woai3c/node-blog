const http = require('http')
const express = require('express')
const webpack = require('webpack')
const webpackConfig = require('./build/webpack.dev')
const handler = require('./server/handler')
const compiler = webpack(webpackConfig)
const app = express()
const server = new http.Server(app)
const hostname = 'localhost'
const port = 8080

app.use(express.static('dist')) // 将dist设为根目录
app.use(require('webpack-hot-middleware')(compiler))
app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    stats: {
        colors: true
    }
}))

server.listen(port, hostname, () => {
    console.log(`正在监听${hostname}:${port}\n\n`)
})

server.on('request', (req, res) => {
    switch (req.url.substr(1)) {
        case 'test':
            handler.test(req, res)
            break
    }
})