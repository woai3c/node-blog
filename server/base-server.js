const articleInterface = require('./interface/article')
const userInterface = require('./interface/user')
const bodyParser = require('body-parser')
const compression = require('compression')
const { log } = require('./utils/log')
const { formatLog } = require('./utils/format')

module.exports = {
    config(app) {
        app.use(compression())
        app.use(bodyParser.urlencoded({ extended: false }))
        app.use(bodyParser.json())
        app.use((req, res, next) => {
            const startTime = new Date()

            res.once('close', () => { // 监听请求结束事件
                const endTime = new Date()
                log.info(formatLog(req, startTime, endTime - startTime))
            })

            if (req.url == '/') { // 将 index.html 设为 no-cache
                res.setHeader('Cache-control', 'no-cache')
            }

            next()
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

        app.get('/fetchYears', (req, res) => {
            articleInterface.fetchYears(req, res)
        })
    }
}