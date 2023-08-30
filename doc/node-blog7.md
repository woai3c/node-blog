# webpack + express 实现文件精确缓存
由于最近开发的个人博客（Vue + node）在使用过程中，发现网络加载有点慢，所以打算对它进行一次优化。本次优化的目标如下：
1. `index.html` 设置成 `no-cache`，这样每次请求的时候都会比对一下 `index.html` 文件有没变化，如果没变化就使用缓存，有变化就使用新的 `index.html` 文件。
2. 其他所有文件一律使用长缓存，例如设置成缓存一年 `maxAge: 1000 * 60 * 60 * 24 * 365`。
3. 前端代码使用 webpack 打包，根据文件内容生成对应的文件名，每次重新打包时只有内容发生了变化，文件名才会发生变化。

以上三点结合，就能实现文件的精确缓存。

换句话说，在一年内，如果我的个人博客没有进行任何更新，那同一台电脑在这段时间内访问网站不会发起任何请求；如果有某个文件更新了，只会请求新的文件，旧的文件依旧从缓存读取。

**小知识**：
* max-age: 设置缓存存储的最大周期，超过这个时间缓存被认为过期(单位秒)。在这个时间前，浏览器读取文件不会发出新请求，而是直接使用缓存。
* 指定 no-cache 表示客户端可以缓存资源，每次使用缓存资源前都必须重新验证其有效性。
## webpack 打包
### 根据文件内容生成文件名
通过配置 output 的 filename 属性可以实现这个需求。filename 属性的值选项中有一个 [contenthash]，它将根据文件内容创建出唯一 hash。当文件内容发生变化时，[contenthash] 也会发生变化。
```js
output: {
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js',
    path: path.resolve(__dirname, '../dist'),
},
```
### 提取第三方库
由于引入的第三方库一般都比较稳定，不会经常改变。所以将它们单独提取出来，作为长期缓存是一个更好的选择。
这里需要使用 webpack4 的 splitChunk 插件 cacheGroups 选项。
```js
optimization: {
  	runtimeChunk: {
        name: 'manifest' // 将 webpack 的 runtime 代码拆分为一个单独的 chunk。
    },
    splitChunks: {
        cacheGroups: {
            vendor: {
                name: 'chunk-vendors',
                test: /[\\/]node_modules[\\/]/,
                priority: -10,
                chunks: 'initial'
            },
            common: {
                name: 'chunk-common',
                minChunks: 2,
                priority: -20,
                chunks: 'initial',
                reuseExistingChunk: true
            }
        },
    }
},
```
* test: 用于控制哪些模块被这个缓存组匹配到。原封不动传递出去的话，它默认会选择所有的模块。可以传递的值类型：RegExp、String和Function;
* priority：表示抽取权重，数字越大表示优先级越高。因为一个 module 可能会满足多个 cacheGroups 的条件，那么抽取到哪个就由权重最高的说了算；
* reuseExistingChunk：表示是否使用已有的 chunk，如果为 true 则表示如果当前的 chunk 包含的模块已经被抽取出去了，那么将不会重新生成新的。
* minChunks（默认是1）：在分割之前，这个代码块最小应该被引用的次数（译注：保证代码块复用性，默认配置的策略是不需要多次引用也可以被分割）
* chunks (默认是async) ：initial、async和all
* name(打包的chunks的名字)：字符串或者函数(函数可以根据条件自定义名字)

除了提取第三方库外，结合 Vue 使用 import 动态引入组件还能实现按需加载。
## express 设置
```js
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
```
详细的代码可以看一下我的[个人博客项目](https://github.com/woai3c/node-blog)。
## 参考资料
* [webpack 缓存](https://webpack.docschina.org/guides/caching/)
* [一步一步的了解webpack4的splitChunk插件](https://juejin.im/post/5af1677c6fb9a07ab508dabb)
