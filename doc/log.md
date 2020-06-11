# 日志功能
博客使用的打日志工具是 [bunyan](https://github.com/trentm/node-bunyan)，由于对日志系统不太熟，查询资料也没有找到好的打日志方法。
目前只在响应结束时打一次 log，记录这次请求的 URL、请求头部、主机名、时间、整个响应的持续时间。还有在可能出错的时候打了 log。
```js
app.use((req, res, next) => { 
    const startTime = new Date()

    res.once('close', () => { // 监听请求结束事件
        const endTime = new Date()
        log.info(formatLog(req, startTime, endTime - startTime))
    })

    if(req.url == '/') { // 将 index.html 设为 no-cache
        res.setHeader('Cache-control', 'no-cache')
    }

    next()
})
```
具体的代码请查看源码。
