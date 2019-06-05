const express = require('express')
const webpack = require('webpack')
const webpackConfig = require('./build/webpack.dev')
const handler = require('./server/handler')
const bodyParser = require('body-parser')
const compiler = webpack(webpackConfig)
const app = express()
const hostname = 'localhost'
const port = 8080

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('dist')) // 将dist设为根目录
app.use(require('webpack-hot-middleware')(compiler))
app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    stats: {
        colors: true
    }
}))

app.listen(port, hostname, () => {
    console.log(`正在监听${hostname}:${port}\n\n`)
})

app.use('/pushArticle', (req, res) => {
    handler.pushArticle(req, res)
})

app.use('/fetchAllArticles', (req, res) => {
    handler.fetchAllArticles(req, res)
})

app.use('/deleteArticle', (req, res) => {
    handler.deleteArticle(req, res)
})

app.use('/fetchArticleContent', (req, res) => {
    handler.fetchArticleContent(req, res)
})

app.use('/fetchAppointArticles', (req, res) => {
    handler.fetchAppointArticles(req, res)
})

app.use('/fetchTagsData', (req, res) => {
    handler.fetchTagsData(req, res)
})

app.use('/fetchTagsArtilesData', (req, res) => {
    handler.fetchTagsArtilesData(req, res)
})