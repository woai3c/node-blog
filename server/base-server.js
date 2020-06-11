const articleInterface = require('./interface/article')
const userInterface = require('./interface/user')
const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')
const hostname = 'localhost'
const port = 8888

module.exports = {
    config(app) {
        app.use(compression())
        app.use(bodyParser.urlencoded({ extended: false }))
        app.use(bodyParser.json())
        app.use((req, res, next) => { // 将 index.html 设为 no-cache
            if(req.url == '/') {
                res.setHeader('Cache-control', 'no-cache')
            }

            next()
        })

        app.use(express.static('dist', {
            etag: false,
            maxAge: 1000 * 60 * 60 * 24 * 365, // 缓存一年
        })) // 将dist设为根目录

        app.listen(port, hostname, () => {
            console.log(`正在监听${hostname}:${port}\n\n`)
        })
    },
    interface(app) {
        app.post('/addArticle', (req, res) => {
            articleInterface.addArticle(req, res)
        })
        
        app.put('/updateArticle', (req, res) => {
            articleInterface.updateArticle(req, res)
        })
        app.get('/fetchArticleDetail', (req, res) => {
            articleInterface.fetchArticleDetail(req, res)
        })

        app.get('/fetchArticles', (req, res) => {
            articleInterface.fetchArticles(req, res)
        })

        app.delete('/deleteArticle', (req, res) => {
            articleInterface.deleteArticle(req, res)
        })

        app.get('/fetchTagsData', (req, res) => {
            articleInterface.fetchTagsData(req, res)
        })

        app.get('/fetchTagsArtilesData', (req, res) => {
            articleInterface.fetchTagsArtilesData(req, res)
        })

        app.post('/addComment', (req, res) => {
            articleInterface.addComment(req, res)
        })

        app.post('/login', (req, res) => {
            userInterface.login(req, res)
        })

        app.get('/fetchVisits', (req, res) => {
            userInterface.fetchVisits(req, res)
        })
        
        // 默认返回 index.html
        app.get('*', (req, res) => {
            userInterface.getIndexHTML(req, res)
        })
    }
}