const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const CompressionPlugin = require('compression-webpack-plugin')
const WebpackBar = require('webpackbar')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const path = require('path')
const isProd = process.env.NODE_ENV === 'production'

const plugins = [
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(
            process.env.NODE_ENV || 'development'
        ),
        'process.env.VUE_ENV': '"client"'
    }),
    new VueSSRClientPlugin(),
]

if (isProd) {
    plugins.push(
        // 开启 gzip 压缩 https://github.com/woai3c/node-blog/blob/master/doc/optimize.md
        new CompressionPlugin(),
        // 该插件会根据模块的相对路径生成一个四位数的hash作为模块id, 用于生产环境。
        new webpack.HashedModuleIdsPlugin(),
        new WebpackBar(),
    )
}

module.exports = merge(base, {
    entry: path.join(__dirname, '../client/entry-client.js'),
    plugins,
    optimization: {
        runtimeChunk: {
            name: 'manifest'
        },
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: 'chunk-vendors',
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    chunks: 'initial',
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
})