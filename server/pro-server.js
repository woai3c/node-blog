const fs = require('fs')
const path = require('path')
const express = require('express')
const LRU = require('lru-cache')
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

const microCache = LRU({
    max: 100,
    maxAge: 60 * 60 * 24 * 1000 // 重要提示：条目在 1 天后过期。
})

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
    const hit = microCache.get(req.url)
    if (hit) {
        console.log('Response from cache')
        return res.end(hit)
    }

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
        title: 'SSR 测试', // default title
        url: req.url
    }

    renderer.renderToString(context, (err, html) => {
        if (err) {
            return handleError(err)
        }

        microCache.set(req.url, html)
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

const port = 8888

app.listen(port, () => {
    console.log(`server started at localhost:${ port }`)
})

app.get('*', render)

