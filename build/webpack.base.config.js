const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
    context: path.resolve(__dirname, '../'),
    devtool: isProd ? 'source-map' : '#cheap-module-source-map',
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/dist/',
        // chunkhash 同属一个 chunk 中的文件修改了，文件名会发生变化 
        // contenthash 只有文件自己的内容变化了，文件名才会变化
        filename: '[name].[contenthash].js',
        // 此选项给打包后的非入口js文件命名，与 SplitChunksPlugin 配合使用
        chunkFilename: '[name].[contenthash].js',
    },
    resolve: {
        extensions: ['.js', '.vue', '.json', '.css'],
        alias: {
            '@': path.resolve(__dirname, '../client'),
        }
    },
    module: {
        // https://juejin.im/post/6844903689103081485
        // 在服务端渲染打包的配置中使用了 mini-css-extract-plugin 是的 server bundle 中会使用到document
        // node 环境中不存在 window 对象 所以报错。
        // 解决方案：将样式相关的 loader 不要放在 webpack.base.config.js 文件
        // 分拆到 client 和 server 文件。其中 mini-css-extract-plugin 要放在 client 配置。
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    compilerOptions: {
                        preserveWhitespace: false
                    }
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|svg|jpg|gif|ico)$/,
                use: ['file-loader']
            },
            {
                test: /\.(woff|eot|ttf)\??.*$/,
                loader: 'url-loader?name=fonts/[name].[md5:hash:hex:7].[ext]'
            },
        ]
    },
    plugins: [new VueLoaderPlugin()],
}