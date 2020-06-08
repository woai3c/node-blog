# 用 node 搭建个人博客（六）：路由模式 history
根据官方文档 [HTML5 History 模式](https://router.vuejs.org/zh/guide/essentials/history-mode.html#%E5%90%8E%E7%AB%AF%E9%85%8D%E7%BD%AE%E4%BE%8B%E5%AD%90)要求，
在后端配置一个默认路由，只要 URL 匹配不到任何资源，就返回一个 index.html 页面。

这个 index.html 页面必须是打包后 dist 目录下的 index.html 页面，因为它注入了渲染页面所需的各种资源。具体代码如下：
```js
function getIndexHTML(req, res) {
    fs.readFile(path.join(__dirname, '../../dist', 'index.html'), { encoding: 'utf-8' }, (err, data) => {
        if (err) throw err
        
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8',
        })

        res.end(data)
    })
}
```
不过这有个缺点，就是只能在生产环境运行。
在开发环境下，dist 目录是空的。因为开发环境下，dist 目录的内容运行在内存中。为了解决这个 BUG，需要在开发服务器下加一行代码：
```js
app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    stats: {
        colors: true
    },
    writeToDisk: true // 开发环境下也要将文件写到 dist 目录下，否则读取不了默认的 index.html
}))
```
