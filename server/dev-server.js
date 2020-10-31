const path = require('path')
const express = require('express')
const { config, interface } = require('./base-server')
const { createBundleRenderer } = require('vue-server-renderer')
const devServer = require('../build/setup-dev-server')
const resolve = (file) => path.resolve(__dirname, file)
const { initArticleConfig } = require('./utils/article')

const app = express()

const serve = (path) => {
    return express.static(resolve(path))
}

app.use('/dist', serve('../dist'))

function createRenderer(bundle, options) {
    return createBundleRenderer(
        bundle,
        Object.assign(options, {
            basedir: resolve('../dist'),
            runInNewContext: false
        })
    )
}

function render(req, res) {
    const startTime = Date.now()
    res.setHeader('Content-Type', 'text/html')

    const handleError = err => {
        if (err.url) {
            res.redirect(err.url)
        } else if (err.code === 404) {
            res.status(404).send('404 | Page Not Found')
        } else {
            res.status(500).send('500 | Internal Server Error~')
        }
    }

    const context = {
        url: req.url
    }

    renderer.renderToString(context, (err, html) => {
        if (err) return handleError(err)
        res.send(html)
        console.log(`whole request: ${ Date.now() - startTime }ms`)
    })
}

let renderer
let readyPromise
const templatePath = resolve('../client/index.template.html')

readyPromise = devServer(
    app,
    templatePath,
    (bundle, options) => {
        renderer = createRenderer(bundle, options)
    }
)

initArticleConfig() // 初始化数据库相关配置
config(app) // 基本配置
interface(app) // 处理接口

const port = 8888
app.listen(port, () => {
    console.log(`server started at localhost:${ port }`)
})

app.get('*', (req, res) => {
    readyPromise.then(() => render(req, res))
})