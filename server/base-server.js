const handler = require('./handler')
const express = require('express')
const bodyParser = require('body-parser')
const hostname = 'localhost'
const port = 8080

module.exports = {
    config(app) {
        app.use(bodyParser.urlencoded({ extended: false }))
        app.use(bodyParser.json())
        app.use(express.static('dist')) // 将dist设为根目录
        app.listen(port, hostname, () => {
            console.log(`正在监听${hostname}:${port}\n\n`)
        })
    },
    interface(app) {
        app.post('/pushArticle', (req, res) => {
            handler.pushArticle(req, res)
        })

        app.get('/fetchAllArticles', (req, res) => {
            handler.fetchAllArticles(req, res)
        })

        app.post('/deleteArticle', (req, res) => {
            handler.deleteArticle(req, res)
        })

        app.get('/fetchArticleContent', (req, res) => {
            handler.fetchArticleContent(req, res)
        })

        app.get('/fetchAppointArticles', (req, res) => {
            handler.fetchAppointArticles(req, res)
        })

        app.get('/fetchTagsData', (req, res) => {
            handler.fetchTagsData(req, res)
        })

        app.get('/fetchTagsArtilesData', (req, res) => {
            handler.fetchTagsArtilesData(req, res)
        })

        app.post('/login', (req, res) => {
            handler.login(req, res)
        })
    }
}