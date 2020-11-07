const fs = require('fs')
const path = require('path')
const express = require('express')
const { createBundleRenderer } = require('vue-server-renderer')
const resolve = file => path.resolve(__dirname, file)
const { interface, config } = require('./base-server')
const { initArticleConfig } = require('./utils/article')
const favicon = require('serve-favicon')
const compression = require('compression')
const app = express()

// 开启 gzip 压缩
app.use(compression())
app.use(favicon(resolve('../public/favicon.ico')))

const serve = (path) => {
    return express.static(resolve(path), {
        maxAge: 1000 * 60 * 60 * 24 * 30
    })
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
        if (err) {
            return handleError(err)
        }

        res.send(html)
    })
}

const templatePath = resolve('../public/index.template.html')
const template = fs.readFileSync(templatePath, 'utf-8')
const bundle = require('../dist/vue-ssr-server-bundle.json')
const clientManifest = require('../dist/vue-ssr-client-manifest.json') // 将js文件注入到页面中
const renderer = createRenderer(bundle, {
    template,
    clientManifest
})

app.use(express.static('dist', {
    etag: false,
    maxAge: 1000 * 60 * 60 * 24 * 365, // 缓存一年
})) // 将dist设为根目录

initArticleConfig() // 初始化数据库相关配置
config(app) // 基本配置
interface(app) // 处理接口

const { host, port } = require('../net') 

app.listen(port, host, () => {
    console.log(`server started at ${host}:${ port }`)
})

app.get('*', render)

