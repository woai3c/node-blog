# webpack + express 网络缓存优化

由于个人博客在使用过程中，发现网络加载有点慢，所以打算对它进行一次优化。本次优化的目标如下：
1. 前端代码需要根据文件内容进行打包，即内容不变，打包的文件名称不变；内容改变，打包的文件名称也会改变。
2. 将前端引入的第三方库单独打包。
3. 按需加载文件。
4. 在网络方面，除了 index.html 文件，其他所有的文件都设置超长缓存时间，例如一年。这样只要网页引入的文件没变化，就不会进行请求。
5. 根据第 1 点和第 4 点，就能实现文件内容不改变，浏览器就会一直使用缓存的文件。当文件内容改变，浏览器就会根据 index.html 上变化的资源 URL 引入新的文件。

### 根据内容生成文件名
通过配置 output 的 filename 属性可以实现这个需求。filename 属性的值选项中有一个 [contenthash]，它将根据资源内容创建出唯一 hash。当资源内容发生变化时，[contenthash] 也会发生变化。
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

通过以上配置，还能自动实现按需加载。
## 参考资料
* [webpack 缓存](https://webpack.docschina.org/guides/caching/)
* [webpack 4 Code Splitting 的 splitChunks 配置探索](https://imweb.io/topic/5b66dd601402769b60847149)
* [一步一步的了解webpack4的splitChunk插件](https://juejin.im/post/5af1677c6fb9a07ab508dabb)
