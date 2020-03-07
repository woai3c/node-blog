# 性能优化--开启 gzip 压缩
下载插件
```
npm install compression-webpack-plugin --save-dev
npm install compression
```

webpack 配置
```
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  plugins: [new CompressionPlugin()],
}
```

node 配置
```
const compression = require('compression')
// 在其他中间件前使用
app.use(compression())
```
